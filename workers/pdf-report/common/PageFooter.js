import React from "react";
import { View, Text } from "@react-pdf/renderer";

import LogoBlack from "../assets/LogoBlack.js";

const PageFooter = ({ reportProducedFor, tw }) => {
  return (
    <View
      style={tw(
        "flex flex-row bg-white text-white w-full justify-between items-center mt-4 py-1"
      )}
    >
      <Text style={tw("text-10 text-gray-600 tracking-wide")}>
        Produced for {reportProducedFor}
      </Text>
      <View style={tw("flex flex-row text-black items-center")}>
        <Text
          style={tw("text-10 text-gray-600 tracking-wide flex flex-row mr-2")}
        >
          Powered by
        </Text>
        <LogoBlack tw={tw} />
      </View>
    </View>
  );
};

export default PageFooter;
