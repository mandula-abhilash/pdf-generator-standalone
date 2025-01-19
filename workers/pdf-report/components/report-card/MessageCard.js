import React from "react";
import { View, Text, Svg, Path, Link } from "@react-pdf/renderer";
import svgs from "./svgs.js";

const MessageCard = ({ title, message, type, marginAdjustment, tw }) => {
  const renderTextWithSpansAndLinks = (message) => {
    const parts = [];
    let currentIndex = 0;

    const processSpan = (spanContent, spanStartIndex) => {
      const spanClassMatch = spanContent.match(/class="([^"]+)"/);
      let spanClassName = spanClassMatch ? spanClassMatch[1] : "";

      // Replace className 'text-havelock-blue-500' with 'text-havelock_blue_500'
      spanClassName = spanClassName.replace(
        "text-havelock-blue-500",
        "text-havelock_blue_500"
      );

      const linkMatch = spanContent.match(
        /<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>/
      );
      if (linkMatch) {
        const [fullMatch, linkHref, linkText] = linkMatch;
        const beforeLink = spanContent.slice(
          spanContent.indexOf(">") + 1,
          spanContent.indexOf(fullMatch)
        );
        const afterLink = spanContent.slice(
          spanContent.indexOf(fullMatch) + fullMatch.length,
          -7
        );

        return (
          <Text key={`text-${spanStartIndex}`} style={tw(spanClassName)}>
            {beforeLink}
            <Link
              key={`link-${spanStartIndex}`}
              style={tw("text-havelock_blue_500 no-underline")}
              src={linkHref}
            >
              {linkText}
            </Link>
            {afterLink}
          </Text>
        );
      }

      // No link found inside the span
      return (
        <Text key={`text-${spanStartIndex}`} style={tw(spanClassName)}>
          {spanContent.slice(spanContent.indexOf(">") + 1, -7)}
        </Text>
      );
    };

    while (currentIndex < message.length) {
      const spanStartIndex = message.indexOf("<span", currentIndex);

      if (spanStartIndex === -1) {
        // No more spans found, add the remaining text
        parts.push(message.slice(currentIndex));
        break;
      }

      // Add the text before the span
      if (spanStartIndex > currentIndex) {
        parts.push(message.slice(currentIndex, spanStartIndex));
      }

      const spanEndIndex = message.indexOf("</span>", spanStartIndex);
      if (spanEndIndex === -1) {
        // Malformed HTML, add the remaining text
        parts.push(message.slice(spanStartIndex));
        break;
      }

      const spanContent = message.slice(spanStartIndex, spanEndIndex + 7);
      parts.push(processSpan(spanContent, spanStartIndex));

      currentIndex = spanEndIndex + 7;
    }

    return parts;
  };

  return (
    <View style={tw("flex flex-col mb-2")}>
      <View style={tw("flex flex-row items-center justify-start")}>
        <View style={tw("flex w-3 mr-2")}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={tw(`flex ${marginAdjustment}`)}
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
      </View>
      <Text style={tw("ml-5 text-8 text-gray-900 leading-relaxed mt-1")}>
        {renderTextWithSpansAndLinks(message)}
      </Text>
    </View>
  );
};

export default MessageCard;
