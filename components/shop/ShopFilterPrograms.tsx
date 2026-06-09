type ProgramDict = {
  [programName: string]: {
    Days: string[];
    Price: string[];
    [key: string]: any;
  };
};

interface FilterOptions {
  priceAscending?: boolean;
  daysAscending?: boolean;
  sex: "Men" | "Women" | "All";
}

export function filterAndSortPrograms(
  programs: ProgramDict,
  {
    priceAscending = true,
    daysAscending = false,
    sex,
  }: FilterOptions
): ProgramDict {
  // Step 1: Filter by sex
  let filteredEntries = Object.entries(programs).filter(([key]) => {
    return sex === "All" ? true : key.endsWith(sex);
  });

  // Step 2: Sorting logic
  if (daysAscending) {
    filteredEntries.sort(
      ([, aValue], [, bValue]) =>
        parseInt(aValue.Days[0], 10) - parseInt(bValue.Days[0], 10)
    );
  } else if (priceAscending) {
    filteredEntries.sort(
      ([, aValue], [, bValue]) =>
        parseFloat(aValue.Price[0]) - parseFloat(bValue.Price[0])
    );
  }

  // Step 3: Return back as dictionary
  return Object.fromEntries(filteredEntries);
}
