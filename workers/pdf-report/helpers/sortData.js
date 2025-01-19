import { sortComparator } from "./reportDatasetsSorting.js";

const getSortedDataAndMessage = (report, sortOrder) => {
  const sortOrderMessages = {
    defaultOrder: "Sorted by Group",
    riskLevel: "Sorted by Risk Level",
    importance: "Sorted by Importance",
    datasetName: "Sorted Alphabetically",
  };

  const bookmarkTitles = {
    defaultOrder: "Group :",
    riskLevel: "Risk Level :",
    importance: "Importance :",
    datasetName: "",
  };

  let sortedByMessage =
    sortOrderMessages[sortOrder] || "Sorted by Default Order";

  let bookmarkTitle = bookmarkTitles[sortOrder] || "";

  const sortCriteria = sortOrder || "defaultOrder";

  switch (sortCriteria) {
    case "defaultOrder":
      report.layers.sort(sortComparator);
      break;
    case "datasetName":
      report.layers.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "importance":
      report.layers.sort((a, b) => {
        if (a.importance.number < b.importance.number) {
          return 1;
        } else if (a.importance.number > b.importance.number) {
          return -1;
        } else {
          return a.name.localeCompare(b.name);
        }
      });
      break;
    case "riskLevel":
      report.layers.sort((a, b) => {
        if (a.riskLevel.current.number < b.riskLevel.current.number) {
          return 1;
        } else if (a.riskLevel.current.number > b.riskLevel.current.number) {
          return -1;
        } else {
          return a.name.localeCompare(b.name);
        }
      });
      break;
    default:
      report.layers.sort(sortComparator);
      break;
  }

  const groupedData = report?.layers?.reduce((acc, obj) => {
    let key;
    if (sortOrder === "defaultOrder") {
      key = obj.storeName;
    } else if (sortOrder === "riskLevel") {
      key = obj.riskLevel.current.value;
    } else if (sortOrder === "importance") {
      key = obj.importance.value;
    }

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});

  return { groupedData, sortedByMessage, bookmarkTitle };
};

export default getSortedDataAndMessage;
