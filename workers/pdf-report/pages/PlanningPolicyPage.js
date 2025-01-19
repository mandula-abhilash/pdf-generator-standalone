import React from "react";
import { Page, View, Text, Link } from "@react-pdf/renderer";

import PageHeader from "../common/PageHeader.js";
import PageFooter from "../common/PageFooter.js";

const SubHeading = ({ subHeading, tw }) => {
  let bookmarkTitle = subHeading.includes("Community Infrastructure Levy")
    ? subHeading.replace("Community Infrastructure Levy", "CIL")
    : subHeading;

  return (
    <View
      style={tw(
        "flex bg-gray-800 w-full text-white py-2 pl-3 items-start justify-center mb-0.5 border-l-8 border-havelock_blue_500"
      )}
    >
      <Text
        style={tw("flex text-gray-100 text-10 font-bold uppercase")}
        bookmark={{ title: `${bookmarkTitle}` }}
        id={`${subHeading}`}
      >
        {subHeading}
      </Text>
    </View>
  );
};

const LocalPlan = ({ subHeading, policyData, tw }) => {
  return (
    <View style={tw("flex flex-col w-full")} wrap={false}>
      <SubHeading subHeading={subHeading} tw={tw} />
      <View style={tw("ml-4 mt-2")}>
        {policyData?.localPlanPolicyInformation.map((policy, index) => (
          <Link
            key={`local-plan-${policy.planName}-${index}`}
            src={policy?.localPlanURL}
            target="_blank"
            rel="noopener noreferrer"
            style={tw("rounded-b-md no-underline my-1 text-havelock_blue_500")}
          >
            <Text style={tw("text-10")}>{policy.planName}</Text>
          </Link>
        ))}
      </View>
    </View>
  );
};

const HDT = ({ policyData, tw }) => {
  const latestYearData = policyData.housingSupply.yearlyData.sort(
    (a, b) => new Date(b.year) - new Date(a.year)
  )[0];

  const hdtData = [
    { label: "Total Homes Required", value: latestYearData.totalHomesRequired },
    {
      label: "Total Homes Delivered",
      value: latestYearData.totalHomesDelivered,
    },
    {
      label: "Measurement Percentage",
      value: latestYearData.measurementPercentage,
    },
    { label: "Consequence", value: latestYearData.consequence },
  ];

  return (
    <View style={tw("flex flex-col w-full mt-4 ml-4")} wrap={false}>
      <Text style={tw("text-10 font-bold tracking-wide leading-relaxed")}>
        {`${latestYearData.year} Housing Delivery Test`}
      </Text>
      <View style={tw("flex ml-4")}>
        {hdtData.map((item, index) => (
          <View
            key={`hdt-${index}`}
            style={tw("text-10 flex flex-row mt-1 leading-relaxed")}
          >
            <Text style={tw("text-10 w-[45%]")}>{item.label}</Text>
            <Text style={tw("text-10 w-[5%]")}>:</Text>
            <Text style={tw("text-10 w-[50%]")}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const FiveYearLandSupply = ({ policyData, tw }) => {
  const supplyData = [
    {
      label: "Supply in Years",
      value: policyData?.fiveYearHousingLandSupplyPosition?.supplyInYears,
    },
    {
      label: "Published Position",
      value: policyData?.fiveYearHousingLandSupplyPosition?.publishedSupply,
    },
    {
      label: "Appeal Derived Position",
      value: policyData?.fiveYearHousingLandSupplyPosition?.appealDerivedFigure,
    },
  ];

  return (
    <View style={tw("flex flex-col w-full mt-4")} wrap={false}>
      <Text style={tw("text-10 font-bold tracking-wide leading-relaxed")}>
        5 Year Housing Land Supply Position
      </Text>
      <View style={tw("flex ml-4")}>
        {supplyData.map((item, index) => (
          <View
            key={`fyls-${index}`}
            style={tw("text-10 flex flex-row mt-1 leading-relaxed")}
          >
            <Text style={tw("text-10 w-[45%]")}>{item.label}</Text>
            <Text style={tw("text-10 w-[5%]")}>:</Text>
            <Text style={tw("text-10 w-[50%]")}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const HousingSupply = ({ subHeading, policyData, tw }) => {
  return (
    <View style={tw("mt-2")}>
      <SubHeading subHeading={subHeading} tw={tw} />
      <View style={tw("flex flex-row w-full justify-between")}>
        <HDT policyData={policyData} tw={tw} />
        <FiveYearLandSupply policyData={policyData} tw={tw} />
      </View>
    </View>
  );
};

const AffordableHousing = ({ subHeading, policyData, tw }) => {
  return (
    <View style={tw("flex flex-col w-full mt-4")} wrap={false}>
      <SubHeading subHeading={subHeading} tw={tw} />
      <View style={tw("flex flex-row flex-wrap w-full items-stretch ml-2")}>
        {policyData?.affordableHousingPolicies?.subAreas?.map((area, index) => (
          <View
            key={`ah-area-${area._id}-${index}`}
            style={tw(
              "flex flex-col flex-wrap w-[48%] justify-between items-center mt-2 mx-[5]"
            )}
            wrap={false}
          >
            <View style={tw("flex mt-2 w-full")}>
              <Text
                style={tw("text-10 font-bold tracking-wide leading-relaxed")}
              >
                {area.name}
              </Text>
              {[
                { label: "AH %", value: area.ahPercentage },
                { label: "Threshold", value: area.threshold },
                { label: "Tenure Split", value: area.tenureSplit },
              ].map((item, idx) => (
                <View
                  key={`ah-detail-${area._id}-${idx}`}
                  style={tw("text-10 flex flex-row mt-1 ml-4 leading-relaxed")}
                >
                  <Text style={tw("text-10 w-[22%]")}>{item.label}</Text>
                  <Text style={tw("text-10 w-[3%]")}>:</Text>
                  <Text style={tw("text-10 w-[75%]")}>{item.value}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const CILPolicy = ({ subHeading, policyData, tw }) => {
  const cilData = [
    { label: "CIL Status", value: policyData.cil.status },
    {
      label: "Effective From",
      value: policyData?.cil?.effectiveDateOfLatestPublishedRate,
    },
    {
      label: "CIL Charging Schedule Link",
      value: policyData?.cil?.officialLPAChargingScheduleLink,
      isLink: true,
    },
    {
      label: "Last Published Rates Link",
      value: policyData?.cil?.officialLPALastPublishedRatesLink,
      isLink: true,
    },
  ];

  return (
    <View style={tw("flex flex-col w-full mt-4")} wrap={false}>
      <SubHeading subHeading={subHeading} tw={tw} />
      <View style={tw("flex mt-2 ml-4")}>
        {cilData.map((item, index) => (
          <View
            key={`cil-policy-${index}`}
            style={tw("text-10 flex flex-row mt-1 leading-relaxed")}
          >
            <Text style={tw("text-10 w-[25%]")}>{item.label}</Text>
            <Text style={tw("text-10 w-[5%]")}>:</Text>
            {item.isLink ? (
              <Link
                src={item.value}
                target="_blank"
                rel="noopener noreferrer"
                style={tw("rounded-b-md no-underline")}
              >
                <Text style={tw("text-10 w-[70%] text-havelock_blue_500")}>
                  {item.value}
                </Text>
              </Link>
            ) : (
              <Text style={tw("text-10 w-[70%]")}>{item.value}</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const CILZones = ({ subHeading, policyData, tw }) => {
  return (
    <View style={tw("flex flex-col w-full mt-4")} wrap={false}>
      <SubHeading subHeading={subHeading} tw={tw} />
      <View style={tw("flex flex-row flex-wrap w-full items-stretch ml-2")}>
        {policyData?.cil?.residentialRateVariations?.map((variation, index) => (
          <View
            key={`cil-zone-${variation._id}-${index}`}
            style={tw(
              "flex flex-col flex-wrap w-[48%] justify-between items-center mx-[5]"
            )}
            wrap={false}
          >
            <View style={tw("flex mt-3 w-full")}>
              <Text
                style={tw("text-10 font-bold tracking-wide leading-relaxed")}
              >
                {variation.name}
              </Text>
              {[
                { label: "Original Rate", value: variation.originalRate },
                {
                  label: "Last Published Rate",
                  value: variation.lastPublishedRate,
                },
              ].map((item, idx) => (
                <View
                  key={`cil-detail-${variation._id}-${idx}`}
                  style={tw("text-10 flex flex-row mt-1 ml-2 leading-relaxed")}
                >
                  <Text style={tw("text-10 w-[40%]")}>{item.label}</Text>
                  <Text style={tw("text-10 w-[5%]")}>:</Text>
                  <Text style={tw("text-10 w-[55%]")}>{item.value}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const PlanningPolicyPage = ({ policyData, sectionNumber, heading, tw }) => {
  return (
    <Page size="A4" style={tw("bg-white px-4 pt-4 w-full")} bookmark={heading}>
      <View fixed style={tw("min-h-[14mm] mb-2")}>
        <PageHeader tw={tw} heading={heading} sectionNumber={sectionNumber} />
      </View>
      <View style={tw("flex flex-row w-full min-h-[260mm]")}>
        <View style={tw("flex flex-row w-full flex-wrap justify-between")}>
          <LocalPlan subHeading="Local Plan" policyData={policyData} tw={tw} />
          <HousingSupply
            subHeading="Housing Supply"
            policyData={policyData}
            tw={tw}
          />
          <AffordableHousing
            subHeading="Affordable Housing Policy"
            policyData={policyData}
            tw={tw}
          />
          <CILPolicy
            subHeading="Community Infrastructure Levy : Policy Information"
            policyData={policyData}
            tw={tw}
          />
          <CILZones
            subHeading="Community Infrastructure Levy : Residential Zones"
            policyData={policyData}
            tw={tw}
          />
          {/* <Text
            wrap={false}
            style={tw(
              "text-havelock_blue_500 text-10 leading-relaxed w-full mt-4 ml-4"
            )}
          >
            <Text
              style={tw(
                "text-gray-900 font-bold tracking-wider uppercase text-10 leading-relaxed"
              )}
            >
              Additional Acumen Value :
            </Text>{" "}
            Within the Planning Policy module of Acumen you can find a wide
            range of additonal planning policy related information. You'll never
            have to waste your time searching through Local Authority websites
            trying to find the right document again.
          </Text> */}
        </View>
      </View>
      <View fixed style={tw("min-h-[14mm]")}>
        <PageFooter tw={tw} />
      </View>
    </Page>
  );
};

export default PlanningPolicyPage;
