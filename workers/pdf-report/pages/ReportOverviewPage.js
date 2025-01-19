import React from "react";
import { Page, View, Text, Link } from "@react-pdf/renderer";

import PageHeader from "../common/PageHeader.js";
import PageFooter from "../common/PageFooter.js";

import RiskLevelBars from "../components/RiskLevelBars.js";

import getSortedDataAndMessage from "../helpers/sortData.js";

const ReportOverviewPage = ({
  reportProducedFor,
  report,
  sortOrder,
  sectionNumber,
  heading,
  tw,
}) => {
  const { groupedData, sortedByMessage, bookmarkTitle } =
    getSortedDataAndMessage(report, sortOrder);

  return (
    <Page size="A4" style={tw("bg-white px-4 pt-4 w-full")} bookmark={heading}>
      <View fixed style={tw("min-h-[14mm] mb-2")}>
        <PageHeader tw={tw} heading={heading} sectionNumber={sectionNumber} />
      </View>
      <View style={tw("flex flex-col w-full min-h-[260mm]")}>
        {groupedData &&
          Object.keys(groupedData).map((groupName, groupIndex) => (
            <View style={tw("flex w-full bg-white mb-6")} key={groupIndex}>
              <View
                style={tw(
                  "flex flex-row w-full justify-between items-center text-gray-100 bg-gray-800 p-1.5 border-l-8 border-havelock_blue_500 pl-4"
                )}
                fixed
                bookmark={`${bookmarkTitle} ${groupName}`}
              >
                <Text
                  style={tw("flex text-10 uppercase font-bold")}
                  wrap={false}
                >
                  {sortOrder === "datasetName" ? "Constraints" : groupName}
                </Text>
                <Text style={tw("flex text-8 text-gray-100")}>
                  {sortedByMessage}
                </Text>
              </View>

              {groupedData[groupName].map((layer, layerIndex) => (
                <View
                  style={tw("flex text-gray-800 text-xs px-2 mt-3")}
                  key={layerIndex}
                  wrap={false}
                >
                  <View
                    style={tw(
                      "flex flex-row w-full justify-between items-start mt-1"
                    )}
                  >
                    <Text
                      style={tw("text-gray-900 text-10 w-[35%]")}
                      src={`#${layer.layerId}`}
                    >
                      {layer.name}
                    </Text>
                    <View
                      style={
                        sortOrder === "importance"
                          ? tw("flex w-[65%] flex-col-reverse")
                          : tw("flex w-[65%]")
                      }
                    >
                      <View
                        style={
                          sortOrder === "importance"
                            ? tw("flex flex-row w-full mt-2 items-center")
                            : tw("flex flex-row w-full items-center")
                        }
                      >
                        <Text
                          style={tw(
                            "text-gray-500 text-8 w-[25%] tracking-wide uppercase"
                          )}
                        >
                          Risk Level
                        </Text>
                        <Text
                          style={tw(
                            "flex text-8 w-[20%] text-gray-900 uppercase"
                          )}
                        >
                          {layer?.riskLevel?.user?.value ||
                            layer?.riskLevel?.default?.value}
                        </Text>
                        <View style={tw("flex w-[55%]")}>
                          <RiskLevelBars
                            riskLevel={
                              layer?.riskLevel?.user?.value ||
                              layer?.riskLevel?.default?.value
                            }
                            tw={tw}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ))}
      </View>
      <View fixed style={tw("min-h-[14mm]")}>
        <PageFooter reportProducedFor={reportProducedFor} tw={tw} />
      </View>
    </Page>
  );
};

export default ReportOverviewPage;
