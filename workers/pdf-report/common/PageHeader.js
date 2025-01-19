import React from "react";
import { Text, View } from "@react-pdf/renderer";

const PageHeader = ({ tw, heading, sectionNumber = null }) => {
  const id =
    sectionNumber === "I"
      ? "section1"
      : sectionNumber === "II"
      ? "section2"
      : sectionNumber === "III"
      ? "section3"
      : null;

  return (
    <View
      style={tw(
        "flex flex-row bg-white w-full justify-start items-center tracking-wide"
      )}
    >
      <View
        style={tw(
          `flex flex-row justify-between items-center text-sm text-white uppercase bg-gray-800 p-3 w-full rounded-t-md border-b-4 border-web_orange_500`
        )}
      >
        <Text style={tw("font-bold")} id={id ? id : null}>
          {sectionNumber ? `Section ${sectionNumber} : ${heading}` : heading}
        </Text>
        <Text
          style={tw("text-8")}
          render={({ pageNumber, totalPages }) =>
            pageNumber >= 3 && `Page ${pageNumber} of ${totalPages}`
          }
        ></Text>
      </View>
    </View>
  );
};

export default PageHeader;
