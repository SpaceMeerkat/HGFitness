 type ExerciseSet = {
    activeStatus: boolean;
    type: string;
    uniqueSetKey: string;
    subsetExercises: string[];
    subsetReps: string[];
    userInputWeights: (string | null)[];
    userInputReps: (string | null)[];
    userNotes:(string | null);
  };

  // Initialize the exercise dictionary
  export const InitializeExerciseDictionary = (exerciseKeys: any, exercises: any) => {
    const dictionary: { [key: number]: ExerciseSet } = {};
    let setIndex = 0;
  
    for (let i = 0; i < exerciseKeys.length; i++) {
      const key = exerciseKeys[i];
      let [type, exercise, repsWeight] = exercises[key];
      const nextKey = exerciseKeys[i + 1];
      const nextNextKey = exerciseKeys[i + 2];
      const nextExercise = exercises[nextKey];
      const thirdExercise = exercises[nextNextKey];
  
      let foundSuperSet = false;
      const supersetExercises = [[type, exercise, repsWeight]];
  
      // Check if there is a superset of 2 or 3 exercises
      if (nextExercise && nextExercise[0][0] === "&") {
        foundSuperSet = true;
        supersetExercises.push(nextExercise);
  
        if (thirdExercise && thirdExercise[0][0] === "&") {
          supersetExercises.push(thirdExercise);
        }
      }
  
      // Generate a unique type string without duplicates
      const typeList = supersetExercises.map(([t]) => t.replace('& ', ''));
      type = Array.from(new Set(typeList)).join(' & ');
  
      // Initialize subset arrays
      const subsetExercises = [];
      const subsetReps = [];
      const userInputWeights = [];
      const userInputReps = [];
  
      // Prepare details for each exercise in the superset, including remaining sets count
      const exerciseDetails = supersetExercises.map(([_, supersetExercise, supersetRepsWeight]) => {
        const repsParts = supersetRepsWeight.split('x');
        const sets = parseInt(repsParts[0], 10);
        const range = repsParts.slice(1).join('x');
        const useSplitRange = range.includes('/');
        const splitRange = useSplitRange ? range.split('/') : [];
        return { supersetExercise, sets, range, useSplitRange, splitRange, remainingSets: sets };
      });
  
      // Continue adding exercises to the superset until all exercises have no remaining sets
      let allSetsComplete = false;
      while (!allSetsComplete) {
        allSetsComplete = true;
  
        // Round-robin through each exercise in the superset
        for (const details of exerciseDetails) {
          const { supersetExercise, range, useSplitRange, splitRange } = details;
  
          // Only add exercise if it has remaining sets
          if (details.remainingSets > 0) {
            subsetExercises.push(supersetExercise);
            subsetReps.push(useSplitRange ? (splitRange[details.sets - details.remainingSets] || splitRange[splitRange.length - 1]) : range);
            userInputWeights.push(null); // Placeholder for weights input
            userInputReps.push(null);    // Placeholder for reps input
  
            // Decrement remaining sets count for this exercise
            details.remainingSets -= 1;
  
            // If any exercise still has remaining sets, keep looping
            if (details.remainingSets > 0) {
              allSetsComplete = false;
            }
          }
        }
      }
  
      // Initialize the notes
      const userNotes = null;
  
      // Populate the dictionary
      dictionary[setIndex] = {
        activeStatus: setIndex === 0, // Set the first exercise as active
        type,
        uniqueSetKey: String(setIndex),
        subsetExercises,
        subsetReps,
        userInputWeights,
        userInputReps,
        userNotes,
      };
  
      setIndex++;
      i += supersetExercises.length - 1; // Skip the next exercises as they are part of the superset
    }
  
    return dictionary;
  };