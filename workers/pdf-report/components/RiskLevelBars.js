import React from "react";
import { View } from "@react-pdf/renderer";

const RiskLevelBars = ({ riskLevel, tw }) => {
  const colorMapping = {
    "Very Low": ["bg-green-600"],
    Low: ["bg-green-400", "bg-green-400"],
    Medium: ["bg-yellow-500", "bg-yellow-500", "bg-yellow-500"],
    High: ["bg-red-400", "bg-red-400", "bg-red-400", "bg-red-400"],
    "Very High": [
      "bg-red-600",
      "bg-red-600",
      "bg-red-600",
      "bg-red-600",
      "bg-red-600",
    ],
  };

  let barClasses = new Array(5).fill("bg-gray-100");

  const barColors = colorMapping[riskLevel];
  if (barColors) {
    barColors.forEach((colorClass, index) => {
      barClasses[index] = colorClass;
    });
  }

  return (
    <View style={tw("flex flex-row")}>
      {barClasses.map((colorClass, index) => (
        <View
          key={index}
          style={tw(`flex-1 h-1.5 mx-0.5 rounded ${colorClass}`)}
        />
      ))}
    </View>
  );
};

export default RiskLevelBars;
