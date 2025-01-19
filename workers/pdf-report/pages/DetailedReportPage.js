import React from "react";
import { Page, View, Text } from "@react-pdf/renderer";

import PageHeader from "../common/PageHeader.js";
import PageFooter from "../common/PageFooter.js";

import ConstraintReportCard from "../components/ConstraintReportCard.js";
import { sortComparator } from "../helpers/reportDatasetsSorting.js";

const DetailedReportPage = ({
  reportProducedFor,
  report,
  sortOrder,
  preloadedImages,
  sectionNumber,
  heading,
  tw,
}) => {
  switch (sortOrder) {
    case "defaultOrder":
      report.layers.sort(sortComparator);
      break;
    case "datasetName":
      report.layers.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "importance":
      report.layers.sort((a, b) => {
        if (a.importance.number < b.importance.number) {
          return 1;
        } else if (a.importance.number > b.importance.number) {
          return -1;
        } else {
          return a.name.localeCompare(b.name);
        }
      });
      break;
    case "riskLevel":
      report.layers.sort((a, b) => {
        if (a.riskLevel.current.number < b.riskLevel.current.number) {
          return 1;
        } else if (a.riskLevel.current.number > b.riskLevel.current.number) {
          return -1;
        } else {
          return a.name.localeCompare(b.name);
        }
      });
      break;
    default:
      report.layers.sort(sortComparator);
      break;
  }

  return (
    <Page size="A4" style={tw("bg-white px-4 pt-4 w-full")} bookmark={heading}>
      <View fixed style={tw("min-h-[14mm] mb-2")}>
        <PageHeader tw={tw} heading={heading} sectionNumber={sectionNumber} />
      </View>
      <View style={tw("flex flex-col w-full min-h-[260mm]")}>
        {report?.layers
          ?.filter((layer) => layer.name !== "LIDAR Elevation Points")
          .map((layer, layerIndex) => (
            <ConstraintReportCard
              layerIndex={layerIndex}
              layer={layer}
              sortOrder={sortOrder}
              tw={tw}
              preloadedImages={preloadedImages}
            />
          ))}
      </View>
      <View fixed style={tw("min-h-[14mm]")}>
        <PageFooter reportProducedFor={reportProducedFor} tw={tw} />
      </View>
    </Page>
  );
};

export default DetailedReportPage;
