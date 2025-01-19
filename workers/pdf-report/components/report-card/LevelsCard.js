import React from "react";
import { View, Text, Svg, Path } from "@react-pdf/renderer";

import RiskLevelBars from "../RiskLevelBars.js";
import ImportanceLevelBars from "../ImportanceLevelBars.js";

import svgs from "./svgs.js";

const LevelsCard = ({ title, message, type, tw }) => {
  return (
    <View style={tw("flex flex-col mb-4")}>
      <View style={tw("flex flex-row items-center justify-start")}>
        <View style={tw("flex w-3 mr-2")}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={tw("flex")}
          >
            <Path d={svgs[type].path} fill={svgs[type].color}></Path>
          </Svg>
        </View>
        <Text
          style={tw(
            "flex text-8 uppercase font-bold text-gray-600 tracking-wider"
          )}
        >
          {title}
        </Text>
        <Text
          style={tw(
            "flex ml-2 text-8 font-bold uppercase text-gray-900 leading-relaxed mt-1"
          )}
        >
          {message}
        </Text>
      </View>
      <View style={tw("flex ml-[14px] mt-0.5 w-[70%]")}>
        {type === "riskLevel" && <RiskLevelBars riskLevel={message} tw={tw} />}
        {type === "importance" && (
          <ImportanceLevelBars importanceLevel={message} tw={tw} />
        )}
      </View>
    </View>
  );
};

export default LevelsCard;
