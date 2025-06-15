export type TrackingData = {
  datestamp: Date;
  runningMeals: any;
  runningCalories: any;
  runningProtein: any;
  runningWater: any; } & {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snack: string[];
  water: string[];
  [key: string]: string[]
};

export const getWaterNames = (meal: string, dictionary: TrackingData) => {
  const mealKey = meal.toLowerCase() as keyof TrackingData; // Convert meal to lowercase
  const uniqueIds = dictionary[mealKey]; // Get unique IDs from the dictionary
  // Match unique IDs with meal names
  return uniqueIds
};

export type Meal = {
  activeVersion: number;
  calories: [];
  protein: []
  name: string;
};

export type MealProgramsState = {
  [key: string]: Meal[]; // Assuming `activeMeal` is a key and its value is an array of meals
};

export const getMealNames = (meal: string, dictionary: TrackingData, mealPrograms: MealProgramsState) => {
  const mealKey = meal.toLowerCase() as keyof TrackingData; // Convert meal to lowercase
  const uniqueIds = dictionary[mealKey].map((item: string) => item); //.split('_')[0]); // Extract IDs from strings
  const mealCategory = mealPrograms[meal]; // Get the meal category

  // Match unique IDs with meal names
  return uniqueIds.map((id: string) => {
    const [indexStr, versionStr] = id.split('_');
    const index = parseInt(indexStr, 10);  
    const version = parseInt(versionStr, 10);
    const calorieValue = mealPrograms[meal][index].calories[version - 1];
    const proteinValue = mealPrograms[meal][index].protein[version - 1];
    const mealItem = mealCategory[index]; // Find the meal item by ID (convert id to integer)
    return mealItem ? { mealName: mealItem.name, calorieValue, proteinValue } : null;
    })
    .filter(Boolean) as { mealName: string; calorieValue: number; proteinValue: number }[]; // Type assertion here
};

type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Water';

export const iconDictionary: Record<MealType, string> = {
  Breakfast: "cafe-outline",
  Lunch: "restaurant-outline",
  Dinner: "pizza-outline",
  Snack: "nutrition-outline",
  Water: "water-outline"
};

export const iconColors: Record<MealType, string> = {
  Breakfast: "brown",
  Lunch: "magenta",
  Dinner: "orange",
  Snack: "lime",
  Water: "cyan"
};

type addMealItemProps = {
  setDictionary: (data: any) => void;
  storeTrackingAsync: (data: any) => Promise<void>;
  setTrackingData: (data: any) => void;
  setOverlayVisible: (setting: boolean) => void;
  key: keyof TrackingData;
  dictionary: TrackingData;
  itemarg: string;
  trackingData: any;
  mealValue: any;
  calorieValue: any;
  proteinValue: any;
  waterValue: any;
};

  // Function to add an item to any meal
  export function addMealItem ({key, dictionary, itemarg, trackingData, mealValue, calorieValue, proteinValue, waterValue, 
    setDictionary, storeTrackingAsync, setTrackingData, setOverlayVisible}: addMealItemProps ) {
    const updatedDictionary = { 
      ...dictionary, 
      [key]: [...(dictionary[key] || []), itemarg] ,
      runningMeals: (dictionary.runningMeals || 0) + mealValue,
      runningCalories: (dictionary.runningCalories || 0) + calorieValue,
      runningProtein: (dictionary.runningProtein || 0) + proteinValue,
      runningWater: (dictionary.runningWater || 0) + waterValue,
    };
    setDictionary(updatedDictionary); // Only need this not the updatedMeals below now
  
    const updatedTrackingData = { ...trackingData, meals: updatedDictionary }; // Changed from updatedMeals to updatedDictionary with datestamp formatting
    storeTrackingAsync(updatedTrackingData).then(() => {
      setTrackingData(updatedTrackingData);
    });
  
    setOverlayVisible(false);
  };

  type removeMealItemProps = {
    setDictionary: (data: any) => void;
    storeTrackingAsync: (data: any) => Promise<void>;
    setTrackingData: (data: any) => void;
    mealarg: string;
    index: number;
    dictionary: TrackingData;
    trackingData: any;
    mealValue: any;
    calorieValue: any;
    proteinValue: any;
    waterValue: any;
  };

  export function removeMealItem ({
    mealarg, 
    index, 
    dictionary, 
    trackingData, 
    mealValue,
    calorieValue,
    proteinValue,
    waterValue,
    setDictionary, 
    storeTrackingAsync, 
    setTrackingData, 
  }: removeMealItemProps) {
    const mealKey = mealarg.toLowerCase() as keyof TrackingData; // Keep meal case-sensitive (e.g., 'Breakfast')
    // Safely update the dictionary by creating a new array for the mealKey
    const updatedDictionary = {
      ...dictionary,
      [mealKey]: dictionary[mealKey]?.filter((_, i) => i !== index),
      runningMeals: (dictionary.runningMeals || 0) - mealValue,
      runningCalories: (dictionary.runningCalories || 0) - calorieValue,
      runningProtein: (dictionary.runningProtein || 0) - proteinValue,
      runningWater: (dictionary.runningWater || 0) - waterValue,
    };
    setDictionary(updatedDictionary);  

    // Update the tracking data with the updated meals and persist it
    const updatedTrackingData = { ...trackingData, meals: updatedDictionary }; // Changed to updatedDictionary with datestamp formatting
    storeTrackingAsync(updatedTrackingData).then(() => {
      setTrackingData(updatedTrackingData);
    });
  };

  type handleMealPressProps = {
    setActiveMeal: (data: any) => void;
    setOverlayVisible: (visible: boolean) => void;
    mealarg: string;
  };

  export function handleMealPress ({mealarg, setActiveMeal, setOverlayVisible}: handleMealPressProps) {
    setActiveMeal(mealarg);
    setOverlayVisible(true);
  };

  type updateActiveVersionProps = {
    setMealProgramsState: (update: (prevState: MealProgramsState) => MealProgramsState) => void;
    activeMeal: string;
    mealIndex: number;
    newVersion: number;
  }; 

  export function updateActiveVersion ({
    activeMeal,
    mealIndex,
    newVersion,
    setMealProgramsState,
  }: updateActiveVersionProps) {
    setMealProgramsState((prevState) => {
      const updatedMeals = { ...prevState };
      const updatedMeal = { ...updatedMeals[activeMeal][mealIndex] };
      updatedMeal.activeVersion = newVersion;
      updatedMeals[activeMeal][mealIndex] = updatedMeal;
      return updatedMeals;
    });
  };

  export function randomFunction (test: string) {
    console.log(test);
  };
