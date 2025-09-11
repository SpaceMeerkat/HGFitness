type ProgramDict = {
  [programName: string]: {
    Days: string[];
    Price: string[];
    [key: string]: any;
  };
};

interface FilterOptions {
  alphabetical?: boolean;
  priceAscending?: boolean;
  priceDescending?: boolean;
  daysAscending?: boolean;
  daysDescending?: boolean;
  sex: "Men" | "Women" | "All";
  days: number;
}

export function filterAndSortPrograms(
  programs: ProgramDict,
  {
    alphabetical = true,
    priceAscending = false,
    priceDescending = false,
    daysAscending = false,
    daysDescending = false,
    sex,
    days,
  }: FilterOptions
): ProgramDict {
  // Step 1: Filter by sex and days
  let filteredEntries = Object.entries(programs).filter(([key, value]) => {
    // Handle sex
    const matchesSex =
      sex === "All" ? true : key.endsWith(sex);

    // Handle days
    const programDays = parseInt(value.Days[0], 10);
    const matchesDays = programDays <= days;

    return matchesSex && matchesDays;
  });

  // Step 2: Sorting logic
  if (alphabetical) {
    filteredEntries.sort(([a], [b]) => a.localeCompare(b));
  } else if (priceAscending) {
    filteredEntries.sort(
      ([, aValue], [, bValue]) =>
        parseFloat(aValue.Price[0]) - parseFloat(bValue.Price[0])
    );
  } else if (priceDescending) {
    filteredEntries.sort(
      ([, aValue], [, bValue]) =>
        parseFloat(bValue.Price[0]) - parseFloat(aValue.Price[0])
    );
  } else if (daysAscending) {
    filteredEntries.sort(
      ([, aValue], [, bValue]) =>
        parseInt(aValue.Days[0], 10) - parseInt(bValue.Days[0], 10)
    );
  } else if (daysDescending) {
    filteredEntries.sort(
      ([, aValue], [, bValue]) =>
        parseInt(bValue.Days[0], 10) - parseInt(aValue.Days[0], 10)
    );
  }

  // Step 3: Return back as dictionary
  return Object.fromEntries(filteredEntries);
}
