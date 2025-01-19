import React from "react";
import { Page, Text, View, Image, Svg, Path } from "@react-pdf/renderer";
import PageHeader from "../common/PageHeader.js";
import PageFooter from "../common/PageFooter.js";

const SiteOverviewPage = ({
  reportProducedFor,
  siteOverview,
  address,
  reportImage,
  sectionNumber,
  heading,
  tw,
}) => {
  return (
    <Page size="A4" style={tw("bg-white px-4 pt-4")} bookmark={heading} wrap>
      <View fixed style={tw("min-h-[14mm]")}>
        <PageHeader tw={tw} heading={heading} sectionNumber={sectionNumber} />
      </View>
      <View style={tw("flex w-full")}>
        <View style={tw("flex bg-gray-800 h-full w-full")}>
          <View style={tw("flex relative h-full w-full")}>
            <Image
              src={reportImage}
              style={tw("flex w-full h-4/6 z-20 object-cover")}
            />

            <View style={tw("flex h-2/6 w-full mt-16")}>
              <View style={tw("flex flex-row justify-center items-center")}>
                <Svg
                  style={tw("w-4 h-4 mr-2 text-conifer_500")}
                  viewBox="0 0 24 24"
                >
                  <Path
                    d="m12 17 1-2V9.858c1.721-.447 3-2 3-3.858 0-2.206-1.794-4-4-4S8 3.794 8 6c0 1.858 1.279 3.411 3 3.858V15l1 2z"
                    fill="#ABD03E"
                  ></Path>
                  <Path
                    d="m16.267 10.563-.533 1.928C18.325 13.207 20 14.584 20 16c0 1.892-3.285 4-8 4s-8-2.108-8-4c0-1.416 1.675-2.793 4.267-3.51l-.533-1.928C4.197 11.54 2 13.623 2 16c0 3.364 4.393 6 10 6s10-2.636 10-6c0-2.377-2.197-4.46-5.733-5.437z"
                    fill="#ABD03E"
                  ></Path>
                </Svg>
                <Text style={tw("text-sm text-havelock_blue_500")}>
                  {address}
                </Text>
              </View>
              <View
                style={tw(
                  "flex flex-row text-gray-100 w-full h-full text-xs mt-10"
                )}
              >
                <View style={tw("flex w-1/2 h-full items-end mr-4 font-bold")}>
                  <Text style={tw("flex my-2")}>Region</Text>
                  <Text style={tw("flex my-2")}>County</Text>
                  <Text style={tw("flex my-2")}>Local Planning Authority</Text>
                  <Text style={tw("flex my-2")}>Ward</Text>
                  <Text style={tw("flex my-2")}>Parish</Text>
                </View>
                <View style={tw("flex w-1/2 h-full items-start ml-4")}>
                  <Text style={tw("flex my-2")}>
                    {siteOverview.region || " "}
                  </Text>
                  <Text style={tw("flex my-2")}>
                    {siteOverview.county || " "}
                  </Text>
                  <Text style={tw("flex my-2")}>
                    {siteOverview.local_planning_authorities || " "}
                  </Text>
                  <Text style={tw("flex my-2")}>
                    {siteOverview.ward || " "}
                  </Text>
                  <Text style={tw("flex my-2")}>
                    {siteOverview.parish || " "}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View fixed style={tw("min-h-[14mm]")}>
        <PageFooter reportProducedFor={reportProducedFor} tw={tw} fixed />
      </View>
    </Page>
  );
};

export default SiteOverviewPage;
