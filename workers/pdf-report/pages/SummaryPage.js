import React from "react";
import { Page, Text, View } from "@react-pdf/renderer";

import PageHeader from "../common/PageHeader.js";
import PageFooter from "../common/PageFooter.js";

const SummaryPage = ({ userName, reportProducedFor, heading, tw }) => {
  return (
    <Page size="A4" style={tw("bg-white px-4 pt-4")} bookmark={heading} wrap>
      <View fixed style={tw("min-h-[14mm]")}>
        <PageHeader tw={tw} heading={heading} />
      </View>
      <View style={tw("flex flex-col w-full min-h-[260mm]")}>
        <View style={tw("my-2 text-10 leading-relaxed")}>
          <Text style={tw("mb-2 text-gray-800")}>
            This report has been created by{" "}
            <Text style={tw("font-bold")}>{userName}</Text> for{" "}
            <Text style={tw("font-bold")}>{reportProducedFor}</Text> and
            provides a comprehensive and efficient analysis of the development
            site. It provides a clear and in-depth overview of potential risks
            and site characteristics, helping with decision-making and
            significantly reducing the time and resources you would typically
            spend on manual data collection, increasing the robustness and
            accuracy of your initial site assessment.
          </Text>
          <View style={tw("mb-2")}>
            <Text
              style={tw("text-10 font-bold text-gray-800")}
              src={`#section1`}
            >
              Section I : Site Overview
            </Text>
            <Text style={tw("text-gray-800 indent-4")}>
              This section provides a very brief overview of the address of the
              site and the administrative regions that it is located within.
            </Text>
          </View>
          <View style={tw("mb-2")}>
            <Text
              style={tw("text-10 font-bold text-gray-800")}
              src={`#section2`}
            >
              Section II : Risk Analysis Overview
            </Text>
            <Text style={tw("text-gray-800 pb-1 indent-4")}>
              The Risk Analysis Overview is where you can quickly assess which
              constraints are likely to present the biggest obstacles to
              development.
            </Text>

            <Text style={tw("text-gray-800 pb-1")}>
              Within the software you can order the risks in several ways
              depending on your personal preference. Your selected order
              preference is then used as the order within the report. The order
              is then fixed within the pdf report.
            </Text>
            <Text style={tw("text-gray-800 pb-1")}>
              The default order places similar datasets together and provides an
              excellent, logical way of reviewing the data. Within the
              application you can also order the datasets so that the
              highest-risk items are placed at the top of the report, which is
              handy for quickly seeing the high-risk items immediately.
              Alphabetical order allows you to find specific datasets you might
              be interested in quickly and without thought.
            </Text>
          </View>
          <View style={tw("mb-2")}>
            <Text
              style={tw("text-10 font-bold text-gray-800")}
              src={`#section3`}
            >
              Section III : Detailed Risk Analysis
            </Text>
            <Text style={tw("text-gray-800 pb-1 indent-8")}>
              This final section provides more detail on the specific risks.
              Within this section, you can find automated risk assessments and
              explanations. These are useful to convey why specific risks are
              relevant to the site.
            </Text>
            <Text style={tw("text-gray-800 pb-1")}>
              Any custom comments you have included through the report
              generation process will be included within this section, allowing
              you to provide enriched, context-specific responses to each risk
              item.
            </Text>
          </View>
          <View style={tw("mb-2")}>
            <Text style={tw("text-10 font-bold text-gray-800 pb-1")}>
              Useful Tools
            </Text>
            <View style={tw("text-gray-800 ml-4")}>
              <View style={tw("flex pb-1")}>
                <Text style={tw("font-semibold tracking-wide")}>
                  Clickable Images :{" "}
                  <Text style={tw("not-italic font-normal")}>
                    Within Section 3 all of the images are clickable. This means
                    that the use can click on an image and be taken to a larger
                    version of the image within their web browser. This image
                    shows more of the surrounding area but could also be useful
                    for including within reports.
                  </Text>
                </Text>
              </View>
              <View style={tw("flex pb-1")}>
                <Text style={tw("font-semibold tracking-wide")}>
                  Navigational PDF :{" "}
                  <Text style={tw("not-italic font-normal")}>
                    You can click on any of the risks items within section 2 and
                    you will immediately be taken to the more detailed
                    explanation of this risk within section 3. Within the risk
                    information there are many direct links to source
                    information so you can validate or find out more about
                    specific risks.
                  </Text>
                </Text>
              </View>
              <View style={tw("flex pb-1")}>
                <Text style={tw("font-semibold tracking-wide")}>
                  Shareable Link :{" "}
                  <Text style={tw("not-italic font-normal")}>
                    Rather than having to save the report and then attach it to
                    send it to members of the team, we generate a link that can
                    be used to share the document. Even better, if the report is
                    updated, the link remains the same so anyone you have shared
                    the report link with will also be viewing the latest
                    information.
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={tw("text-10 font-bold text-gray-800")}>
              Risk Categorisation
            </Text>
            <Text style={tw("text-gray-800 pb-1 indent-4")}>
              Within the report we have categorised risks in two ways :
            </Text>
            <View style={tw("text-gray-800 ml-4")}>
              <View style={tw("flex pb-1")}>
                <Text style={tw("font-semibold tracking-wide")}>
                  Risk Relevance :{" "}
                  <Text style={tw("not-italic font-normal")}>
                    Risk relevance is a way of weighting the risk levels so that
                    you can easily differentiate between constraints that might
                    make the development of a site unviable and those that are
                    just something that might create a moderate abnormal cost.
                    The higher the risk relevance the more serious its potential
                    impact on the site, either in construction or viability
                    terms.
                  </Text>
                </Text>
              </View>
              <View style={tw("flex pb-1")}>
                <Text style={tw("font-semibold tracking-wide")}>
                  Risk Rating :{" "}
                  <Text style={tw("not-italic font-normal")}>
                    The risk rating is the likelihood of the specific risk item
                    being a consideration on the specific site. The higher the
                    risk rating, the more seriously you need to consider the
                    impact of the risk. A low risk rating means that the risk is
                    unlikely to have any real impact on the site.
                  </Text>
                </Text>
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

export default SummaryPage;
