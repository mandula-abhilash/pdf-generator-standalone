import { Worker } from "bullmq";

import dotenv from "dotenv";
import colors from "colors";
import connectToMongoDB from "../config/mongo_db.js";

import { REGISTRATION_REQUEST } from "../constants/eventConstants.js";
import User from "../models/user/users.model.js";
import LoginActivity from "../models/user/login-activity.model.js";
import RegistrationRequestNotification from "../models/notification/registrationRequestNotification.model.js";

dotenv.config();

connectToMongoDB();

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

const registrationRequestWorker = new Worker(
  REGISTRATION_REQUEST,
  async (job) => {
    const { name, email } = job.data;

    try {
      const admins = await User.find({ role: "Admin" });

      if (!(admins && admins.length)) {
        throw new Error(
          "There are no admins at this moment to send the registration request notification"
        );
      }

      for (const admin of admins) {
        const adminUserId = admin._id;
        const notification = new RegistrationRequestNotification({
          title: `A prospective user, <span class="text-havelock-blue-500">${name}</span> has raised a registration request. ${name}'s email address is ${email}`,
          message:
            "Please click the below buttons to accept or reject the request.",
          user: adminUserId,
          createdAt: Date.now(),
          type: "RegistrationRequest",
          isRead: false,
          sent: false,
          name: name,
          email: email,
        });

        const savedNotification = await notification.save();

        if (!savedNotification) {
          throw new Error(
            `Failed to save registration request notification for the user ${admin.name}`
          );
        }

        const notificationId = savedNotification._id;

        console.log(
          `Registration request notification created: ${notificationId}`
        );

        const loginActivities = await LoginActivity.find({
          userId: adminUserId,
          isCurrentlyLoggedIn: true,
        });
        for (const loginActivity of loginActivities) {
          // const job = await sendNotificationQueue.add(NOTIFICATION, {
          //   userId: null,
          //   loginActivityId: loginActivity._id,
          //   event: REGISTRATION_REQUEST,
          //   data: {
          //     name: name,
          //     email: email,
          //   },
          //   notificationId: notificationId,
          // });
          // console.log(
          //   `Sending notification to admin for the registration request job enqueued with ID: ${job.id}`
          // );
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  workerOptions
);

registrationRequestWorker.on("completed", async (job) => {
  console.log(`Registration request Job completed: ${job.id}`);
  await job.remove();
});

registrationRequestWorker.on("failed", async (job, error) => {
  console.log(`Registration request Job failed: ${job.id}, Error: ${error}`);
  await job.remove();
});

registrationRequestWorker.on("error", async (error) => {
  console.log(`Registration request Job failed with error: ${error}`);
});

export const cleanUpRegistrationWorker = async () => {
  try {
    if (!registrationRequestWorker) return;
    await registrationRequestWorker.close();
  } catch (error) {
    console.error("Error closing Registration request worker:", error);
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

export default registrationRequestWorker;
