import React from "react";
import { View, Text, Image, Link } from "@react-pdf/renderer";

import MessageCard from "./report-card/MessageCard.js";
import LevelsCard from "./report-card/LevelsCard.js";

const PlaceHolder = `./uploads/images/application.png`;

const ConstraintReportCard = ({
  layerIndex,
  layer,
  sortOrder,
  tw,
  preloadedImages,
}) => {
  const automatedMessage = layer?.message?.automated || "Not Available";
  const customMessage = layer?.message?.customized || "Not Provided";
  const riskLevelExplaination = layer?.riskLevelExplaination || "Not Available";

  const imageUrl = preloadedImages[layer.optimizedImage] || PlaceHolder;

  return (
    <View
      style={tw("flex flex-row justify-between items-stretch mb-4")}
      wrap={false}
      key={`constraint-${layer.layerId}`}
    >
      {/* Image Card */}
      <View style={tw("flex w-[45%] flex-col mb-0.5 flex-1")}>
        <View
          style={tw(
            "flex bg-gray-800 text-white py-3 pl-3 rounded-t-md items-start justify-center mb-0.5"
          )}
        >
          <Text
            style={tw("flex text-gray-200 text-6 tracking-widest uppercase")}
          >
            {layer.storeName}
          </Text>
          <Text
            style={tw("flex text-gray-100 text-10 font-bold mt-1 capitalize")}
            bookmark={{ title: `${layer.name}` }}
            id={`${layer.layerId}`}
          >
            {layer.name}
          </Text>
        </View>
        <View style={tw("flex max-h-[200]")}>
          <Link src={layer.image} style={tw("rounded-b-md")}>
            <Image
              style={tw("h-full object-cover rounded-b-md")}
              src={imageUrl}
              alt="Dataset"
            />
          </Link>
        </View>
      </View>

      {/* Report Card */}
      <View
        style={tw(
          "flex h-full w-[55%] flex-col ml-2 p-2 border border-gray-200 rounded-md flex-1"
        )}
      >
        <MessageCard
          title="Automated Report"
          message={automatedMessage}
          type="automatedMessage"
          marginAdjustment="-mt-[1.8]"
          tw={tw}
          key={`automated-${layer.layerId}`}
        />
        <MessageCard
          title="Custom Notes"
          message={customMessage}
          type="customMessage"
          marginAdjustment="mt-[0.8]"
          tw={tw}
          key={`custom-${layer.layerId}`}
        />
        <MessageCard
          title="Importance"
          message={layer.importance.value}
          type="importance"
          marginAdjustment="mt-0"
          tw={tw}
          key={`importance-${layer.layerId}`}
        />
        <LevelsCard
          title="Risk Level"
          message={
            layer?.riskLevel?.user?.value || layer?.riskLevel?.default?.value
          }
          type="riskLevel"
          tw={tw}
          key={`risk-${layer.layerId}`}
        />
        <MessageCard
          title="Risk Level Explanation"
          message={riskLevelExplaination}
          type="riskLevelExplaination"
          marginAdjustment="mt-0"
          tw={tw}
          key={`risk-explanation-${layer.layerId}`}
        />
      </View>
    </View>
  );
};

export default ConstraintReportCard;
