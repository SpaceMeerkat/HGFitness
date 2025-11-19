// ---------------- Component 1 ----------------
// Count completed programs scaled by rerunNumber
export const getTotalPrograms = (trackingData: {
  [programName: string]: {
    completed: boolean;
    rerunNumber: number;
  };
}): number => {
    
  let total = 0;

  for (const programName in trackingData) {
    const program = trackingData[programName];
    if (program.completed) {
      total += program.rerunNumber + 1; // scale by rerunNumber
    } else {
    if (program.rerunNumber > 0) {
      total += program.rerunNumber;
    }}
  }

  return total;
};


// ---------------- Component 2 ----------------
// Count total memoryData items across all programs
export const getTotalSessions = (trackingData: {
  [programName: string]: {
    memoryData: { [key: string]: any }[];
    rerunNumber: number;
    totalDaysCount: number;
  };
}): number => {
  let total = 0;

  for (const programName in trackingData) {
    const program = trackingData[programName];
    if (program.memoryData) {
        total += Object.keys(program.memoryData).length; 
    }
    if (program.rerunNumber > 0) {
        total += program.rerunNumber * program.totalDaysCount;
    }
  }

  return total;
};
