import { createClient } from "redis";
import { Worker } from "bullmq";
import ReactPDF from "@react-pdf/renderer";
import React from "react";

import dotenv from "dotenv";
import colors from "colors";
import axios from "axios";

import S3 from "aws-sdk/clients/s3.js";
import fs from "fs";
import path from "path";

import connectToMongoDB from "../../config/mongo_db.js";

import Report from "../../models/application/report.model.js";
import Notification from "../../models/notification/notifications.model.js";
import ReportNotification from "../../models/notification/reportNotifications.model.js";
import { PDF_GENERATION_RESULT } from "../../constants/eventConstants.js";

import PDFReport from "./PDFReport.js";

import LocalPlanningAuthority from "../../models/admin/local-planning-authorities.model.js";
import PlanningPolicy from "../../models/application/planning-policy.model.js";

dotenv.config();

connectToMongoDB();

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const s3 = new S3(awsConfig);

const fetchImage = async (url) => {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    const base64Image = `data:image/png;base64,${Buffer.from(
      response.data
    ).toString("base64")}`;

    return base64Image;
  } catch (error) {
    console.error(`Error fetching image from URL: ${url}`, error.message);
    return null;
  }
};

const generateReportUsingReactPDF = async (reportId, userName, sort) => {
  console.log(`Generating report ${reportId} for user ${userName}`);

  const report = await Report.findById(reportId).lean();

  let planningPolicyInformation = null;

  if (report?.siteOverview?.local_planning_authorities) {
    const lpa = await LocalPlanningAuthority.findOne({
      "postgresLPA.name": report.siteOverview.local_planning_authorities,
    });

    if (lpa) {
      planningPolicyInformation = await PlanningPolicy.findOne({
        localPlanningAuthority: lpa._id,
      }).select(
        "localPlanPolicyInformation.localPlanURL localPlanPolicyInformation.planName " +
          "housingSupply.adoptedLocalPlanDate housingSupply.yearlyData.year housingSupply.yearlyData.totalHomesRequired housingSupply.yearlyData.totalHomesDelivered housingSupply.yearlyData.measurementPercentage housingSupply.yearlyData.consequence " +
          "fiveYearHousingLandSupplyPosition.isLPARequiredToDemonstrate5YHLS fiveYearHousingLandSupplyPosition.supplyInYears fiveYearHousingLandSupplyPosition.publishedSupply fiveYearHousingLandSupplyPosition.appealDerivedFigure " +
          "affordableHousingPolicies.officialLPAAdoptedLocalPlanLink affordableHousingPolicies.subAreas.name affordableHousingPolicies.subAreas.ahPercentage affordableHousingPolicies.subAreas.threshold affordableHousingPolicies.subAreas.tenureSplit " +
          "cil.officialLPAChargingScheduleLink cil.effectiveDateOfLatestPublishedRate cil.officialLPALastPublishedRatesLink cil.status cil.adoptionDate cil.residentialRateVariations.name cil.residentialRateVariations.originalRate cil.residentialRateVariations.lastPublishedRate "
      );
    }
  }

  const sortOrder = sort || "defaultOrder";

  if (!report) {
    throw new Error("Report not found");
  }

  try {
    console.log("************ Generating report PDF ************ ");

    console.log("************ Create Image Map Start ************ ");

    // Collect all image URLs from the report layers
    const imageUrls = [
      report.optimizedImage, // Site Overview Image
      report.clientCompanyLogoURL, // Client Company Logo
      ...report.layers.map((layer) => layer.optimizedImage || layer.image), // Layer Images
    ].filter((url) => url && typeof url === "string" && url.startsWith("http")); // Filter valid URLs

    // Pre-fetch all images
    const loadedImages = await Promise.all(
      imageUrls.map((url) => fetchImage(url))
    );

    // Map original URLs to blob URLs
    const imageMap = Object.fromEntries(
      imageUrls.map((url, index) => [url, loadedImages[index]])
    );

    console.log("************ Create Image Map End ************ ");

    const pdfBuffer = await ReactPDF.renderToStream(
      <PDFReport
        report={report}
        userName={userName}
        sortOrder={sortOrder}
        planningPolicyInformation={planningPolicyInformation}
        preloadedImages={imageMap}
      />
    );

    // PDF params
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: `${reportId}/${reportId}.pdf`,
      Body: pdfBuffer,
      ACL: "public-read",
      ContentType: `application/pdf`,
    };

    const uploadedPdf = await s3.upload(params).promise();

    if (!uploadedPdf) {
      throw new Error("Failed to upload PDF to AWS S3");
    }

    const s3Location = uploadedPdf.Location;

    console.log(`PDF uploaded to ${s3Location}`);

    return s3Location;
  } catch (err) {
    console.log(err);
    throw new Error("Error generating report");
  }
};

const workerOptions = {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    username: "",
    password: process.env.REDIS_PASSWORD,
  },
  // removeOnComplete: true,
  // removeOnFail: true,
};

const pdfWorker = new Worker(
  "generate_pdf",
  async (job) => {
    const {
      reportId,
      userName,
      userId,
      reportTitle,
      sortOrder,
      loginActivityId,
    } = job.data;

    const redisClient = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    });

    await redisClient.connect();

    try {
      const s3Location = await generateReportUsingReactPDF(
        reportId,
        userName,
        sortOrder
      );

      if (!s3Location) {
        throw new Error("Failed to generate report PDF");
      }

      const reportNotification = new ReportNotification({
        title: `<span class="text-havelock-blue-500">${reportTitle}</span> Site Assessment Report has been generated`,
        message: "Your report PDF has been successfully generated.",
        user: userId,
        createdAt: Date.now(),
        type: "ReportGeneration",
        isRead: false,
        reportId: reportId,
        link: s3Location,
        sent: false,
        success: true,
      });

      const savedReportNotification = await reportNotification.save();

      if (!savedReportNotification) {
        throw new Error("Failed to save report notification");
      }

      const notificationId = savedReportNotification._id;

      console.log(`Report notification created: ${notificationId}`);

      await Report.findByIdAndUpdate(
        reportId,
        {
          isGenerating: false,
          pdfLocation: s3Location,
          isReportModified: false,
        },
        { timestamps: false }
      );

      console.log(
        `Sending the report success acknowledgement to the user ${userId}`
      );

      // Prepare the message
      const message = JSON.stringify({
        userId: userId,
        loginActivityId: loginActivityId,
        event: PDF_GENERATION_RESULT,
        data: {
          reportId: reportId,
          count: 1,
          pdfLocation: s3Location,
          isReportModified: false,
        },
        notificationId: notificationId,
      });

      // Publish the message to a Redis channel
      await redisClient.publish("workerChannel", message);
    } catch (error) {
      console.error(`Error generating PDF for report ${reportId}: ${error}`);

      // Create an error notification
      const errorNotification = new Notification({
        title: `Error occured while generating the <span class="text-red-500">${reportTitle}</span> Site Assessment Report`,
        message: "An error occurred while generating the report PDF.",
        user: userId,
        createdAt: Date.now(),
        type: "ReportGeneration",
        isRead: false,
        sent: false,
        success: false,
      });

      // Save the error notification
      const savedErrorNotification = await errorNotification.save();

      if (!savedErrorNotification) {
        throw new Error("Failed to save error notification");
      }

      const errorNotificationId = savedErrorNotification._id.toString();

      console.log(`Error notification created: ${errorNotificationId}`);

      await Report.findByIdAndUpdate(
        reportId,
        { isGenerating: false },
        { timestamps: false }
      );

      const message = JSON.stringify({
        userId: userId,
        loginActivityId: loginActivityId,
        event: PDF_GENERATION_RESULT,
        data: {
          reportId: reportId,
          count: 1,
          pdfLocation: null,
          isReportModified: false,
        },
        notificationId: errorNotificationId,
      });

      await redisClient.publish("workerChannel", message);
    } finally {
      // Disconnect the Redis client
      await redisClient.disconnect();
    }
  },
  workerOptions
);

pdfWorker.on("completed", async (job) => {
  console.log(`PDF Generation Job completed: ${job.id}`);
  await job.remove();
});

pdfWorker.on("failed", async (job, error) => {
  console.log(`PDF Genration Job failed: ${job.id}, Error: ${error}`);
  await job.remove();
});

pdfWorker.on("error", async (error) => {
  console.log(`PDF Generation Job failed with error: ${error}`);
});

const cleanup = async () => {
  try {
    if (!pdfWorker) return;
    await pdfWorker.close();
  } catch (error) {
    console.error("Error closing PDF worker:", error);
  }
};

// Listen for unhandled promise rejections and handle them
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Promise Rejection:", error);
});

// Listen for uncaught exceptions and handle them
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

// Register the 'exit' event listener
// process.on("exit", async (code) => {
//   console.log(`About to exit with code: ${code}`);
//   await cleanup();
// });

export default pdfWorker;
