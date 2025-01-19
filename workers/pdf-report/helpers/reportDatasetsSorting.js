const defaultOrder = {
  Boundaries: [
    "Region",
    "County",
    "Local Authority",
    "Ward",
    "Parish",
    "Enterprize Zones",
    "Combined Authorities",
    "Local Enterprise Partnerships",
    "Local Planning Authorities",
  ],
  "Land Designations": [
    "Areas of Outstanding Natural Beauty",
    "Ancient Woodland",
    "Heritage Coasts",
    "Country Parks",
    "National Parks",
    "National Nature Reserves",
    "Local Nature Reserves",
    "Green Belt",
    "Common Land",
    "Ramsar",
    "Special Areas of Conservation",
    "Sites of Special Scientific Interest",
    "Special Protection Areas",
    "World Heritage Sites",
    "Historic Battlefields",
  ],
  "Conservation Areas": ["Conservation Areas"],
  Other: ["Listed Buildings", "Built Up Areas", "Scheduled Monuments"],
};

export const sortComparator = (a, b) => {
  const storeA = a.storeName.toLowerCase();
  const storeB = b.storeName.toLowerCase();

  // First, sort by storeName if they are different
  if (storeA !== storeB) {
    return storeA.localeCompare(storeB);
  }

  // If storeNames are the same, sort by the order defined in defaultOrder
  const nameOrderA = defaultOrder[storeA]?.indexOf(a.name.toLowerCase()) ?? -1;
  const nameOrderB = defaultOrder[storeB]?.indexOf(b.name.toLowerCase()) ?? -1;

  const bothFound = nameOrderA !== -1 && nameOrderB !== -1;

  if (bothFound) {
    return nameOrderA - nameOrderB;
  }

  if (nameOrderA !== nameOrderB) {
    return nameOrderA - nameOrderB;
  }

  // If not found in defaultOrder, fallback to alphabetical sorting
  return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
};
