import React from "react";
import { Page, View, Image, Link } from "@react-pdf/renderer";
import PageHeader from "../common/PageHeader.js";
import PageFooter from "../common/PageFooter.js";

const PlaceHolder = `./uploads/images/application.png`;

const SiteLevelsPage = ({
  reportProducedFor,
  layer,
  lidarImage,
  heading,
  tw,
}) => {
  return (
    <Page size="A4" style={tw("bg-white px-4 pt-4")} wrap>
      <View fixed style={tw("min-h-[14mm]")}>
        <PageHeader tw={tw} heading={heading} />
      </View>
      <View
        style={tw("flex w-full")}
        bookmark={{ title: `${layer.name}` }}
        id={`${layer.layerId}`}
      >
        <View style={tw("flex h-full w-full")}>
          <View style={tw("flex relative h-full w-full m-auto")}>
            <Link
              src={layer.image || layer.optimizedImage}
              target="_blank"
              rel="noopener noreferrer"
              style={tw("rounded-b-md")}
            >
              <Image
                src={lidarImage || PlaceHolder}
                style={tw("flex w-full h-full z-20 object-cover")}
                alt="LIDAR Elevation Points"
              />
            </Link>
          </View>
        </View>
      </View>
      <View fixed style={tw("min-h-[14mm]")}>
        <PageFooter reportProducedFor={reportProducedFor} tw={tw} fixed />
      </View>
    </Page>
  );
};

export default SiteLevelsPage;
