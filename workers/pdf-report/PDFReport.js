import React from "react";
import { Document, Font } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

import ReportFrontPage from "./pages/ReportFrontPage.js";
import SiteOverviewPage from "./pages/SiteOverviewPage.js";
import ReportOverviewPage from "./pages/ReportOverviewPage.js";

import DetailedReportPage from "./pages/DetailedReportPage.js";
import SummaryPage from "./pages/SummaryPage.js";
import PlanningPolicyPage from "./pages/PlanningPolicyPage.js";
import SiteLevelsPage from "./pages/SiteLevelsPage.js";

const RobotoRegular = "./uploads/fonts/Roboto-Regular.ttf";
const RobotoBold = "./uploads/fonts/Roboto-Bold.ttf";
const RobotoItalic = "./uploads/fonts/Roboto-Italic.ttf";

const PlaceHolder = `./uploads/images/application.png`;

Font.register({
  family: "Roboto",
  fonts: [
    { src: RobotoRegular },
    { src: RobotoBold, fontWeight: "bold" },
    { src: RobotoItalic, fontStyle: "italic", fontWeight: 400 },
  ],
});

const tw = createTw({
  theme: {
    fontFamily: {
      roboto: "Roboto",
    },
    extend: {
      colors: {
        havelock_blue_500: "#3D9BE9",
        conifer_500: "#ABD03E",
        web_orange_500: "#F09C00",
      },
    },
    fontSize: {
      6: 6,
      8: 8,
      10: 10,
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      "2xl": 24,
      "3xl": 30,
      "4xl": 36,
      "5xl": 48,
      "6xl": 60,
      "7xl": 72,
      "8xl": 96,
      "9xl": 128,
    },
  },
});

const PDFReport = ({
  report,
  userName,
  sortOrder,
  planningPolicyInformation,
  preloadedImages,
}) => {
  return (
    <Document
      style={tw("font-roboto")}
      title={`${report.title}  | FGB Acumen`}
      author={userName}
    >
      <ReportFrontPage
        reportTitle={report.title}
        userName={userName}
        createdDate={report.updatedAt}
        heading="Site Assessment Report"
        reportProducedFor={report.reportProducedFor}
        clientCompanyLogoURL={
          preloadedImages[report.clientCompanyLogoURL] || PlaceHolder
        }
        tw={tw}
      />
      <SummaryPage
        userName={userName}
        reportProducedFor={report.reportProducedFor}
        heading="Preface"
        tw={tw}
      />
      <SiteOverviewPage
        reportProducedFor={report.reportProducedFor}
        siteOverview={report.siteOverview}
        address={report.address}
        reportImage={preloadedImages[report.optimizedImage] || PlaceHolder}
        sectionNumber="I"
        heading="Site Overview"
        tw={tw}
      />
      <ReportOverviewPage
        reportProducedFor={report.reportProducedFor}
        report={report}
        sortOrder={sortOrder}
        sectionNumber="II"
        heading="Risk Analysis Overview"
        tw={tw}
      />
      <DetailedReportPage
        reportProducedFor={report.reportProducedFor}
        report={report}
        sortOrder={sortOrder}
        preloadedImages={preloadedImages}
        sectionNumber="III"
        heading="Detailed Risk Analysis"
        tw={tw}
      />
      {report?.layers?.some(
        (layer) => layer.name === "LIDAR Elevation Points"
      ) && (
        <SiteLevelsPage
          reportProducedFor={report.reportProducedFor}
          layer={report.layers.find(
            (layer) => layer.name === "LIDAR Elevation Points"
          )}
          lidarImage={
            preloadedImages[
              report.layers.find(
                (layer) => layer.name === "LIDAR Elevation Points"
              )?.optimizedImage
            ] || PlaceHolder
          }
          heading="LIDAR Elevation Points"
          tw={tw}
        />
      )}
      {planningPolicyInformation && (
        <PlanningPolicyPage
          policyData={planningPolicyInformation}
          sectionNumber="IV"
          heading="Planning Policy Information"
          tw={tw}
        />
      )}
    </Document>
  );
};

export default PDFReport;
