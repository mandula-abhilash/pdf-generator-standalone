import React from "react";
import { View } from "@react-pdf/renderer";

const ImportanceLevelBars = ({ importanceLevel, tw }) => {
  let barStyles = new Array(5).fill("bg-gray-100");

  const blueShades = [
    "bg-blue-400",
    "bg-blue-500",
    "bg-blue-600",
    "bg-blue-700",
    "bg-blue-800",
  ];

  const levelMapping = {
    "Very Low": 1,
    Low: 2,
    Medium: 3,
    High: 4,
    "Very High": 5,
  };

  const levelIndex = levelMapping[importanceLevel] || 0;
  for (let i = 0; i < levelIndex; i++) {
    barStyles[i] = blueShades[i];
  }

  return (
    <View style={tw("flex flex-row")}>
      {barStyles.map((colorClass, index) => (
        <View
          key={index}
          style={tw(`flex-1 h-1.5 mx-0.5 rounded-md ${colorClass}`)}
        />
      ))}
    </View>
  );
};

export default ImportanceLevelBars;
