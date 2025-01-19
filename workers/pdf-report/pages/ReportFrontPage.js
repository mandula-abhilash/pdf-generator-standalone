import React from "react";
import { Page, Text, View, Image } from "@react-pdf/renderer";

const ReportFrontPage = ({
  reportTitle,
  userName,
  createdDate,
  heading,
  reportProducedFor,
  clientCompanyLogoURL,
  tw,
}) => {
  const frontPageImagePath = `./uploads/images/front-page-image.jpeg`;
  const dateObj = new Date(createdDate);

  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Page size="A4" style={tw("bg-white font-roboto")} bookmark={heading}>
      <View style={tw("flex bg-white m-4 rounded-t-md")}>
        <View
          style={tw(
            "flex justify-center items-center border-4 border-gray-800 rounded-t-md"
          )}
        >
          <Image src={frontPageImagePath} style={tw("flex object-cover")} />
        </View>

        {/* Top Left Container */}
        <View
          style={tw(
            "absolute flex top-12 left-12 justify-between items-start text-gray-900 leading-relaxed max-w-[130mm]"
          )}
        >
          <Text
            style={tw(
              "text-10 uppercase font-bold text-gray-600 ml-0.5 tracking-wider"
            )}
          >
            {formattedDate}
          </Text>
          <Text
            style={tw(
              "text-[27] uppercase font-bold tracking-widest text-web_orange_500 mt-1"
            )}
          >
            Site Assessment Report
          </Text>
          <Text
            style={tw(
              "text-sm font-bold uppercase text-havelock_blue_500 tracking-wider -mt-1.5 ml-0.5"
            )}
          >
            {reportTitle}
          </Text>
        </View>

        {/* Top Right Container */}
        <View
          style={tw(
            "absolute flex top-[56px] right-[4px] w-[46.5mm] text-gray-900 leading-relaxed bg-black"
          )}
        >
          <View
            style={tw(
              "flex items-center w-[32mm] h-[32mm] justify-between mx-auto"
            )}
          >
            {clientCompanyLogoURL && (
              <Image
                src={clientCompanyLogoURL}
                style={tw("flex object-contain rounded-sm")}
              />
            )}
          </View>
        </View>

        <View
          style={tw(
            "flex absolute bottom-12 right-12 text-gray-900 items-end justify-start"
          )}
        >
          <View style={tw("flex items-end")}>
            <Text
              style={tw(
                "flex text-8 uppercase text-gray-800 tracking-widest text-right"
              )}
            >
              Created By
            </Text>
            <Text
              style={tw(
                "flex text-xs text-gray-800 uppercase tracking-wider font-bold leading-relaxed text-right"
              )}
            >
              {userName}
            </Text>
          </View>
          <View style={tw("flex items-end pt-4")}>
            <Text
              style={tw(
                "flex text-8 uppercase text-gray-800 tracking-widest text-right"
              )}
            >
              Produced For
            </Text>
            <Text
              style={tw(
                "flex text-xs text-gray-800 uppercase tracking-wider font-bold leading-relaxed text-right"
              )}
            >
              {reportProducedFor}
            </Text>
          </View>
        </View>
      </View>
    </Page>
  );
};

export default ReportFrontPage;
