type Gender = "male" | "female";
type ActivityLevel = "mild" | "medium" | "hard";
type Goal = "lose weight" | "maintain" | "gain";

export function calculateCalories(
  gender: Gender,
  age: number,
  height: number, // cm
  weight: number, // kg
  activity: ActivityLevel,
  goal: Goal
): [number, number, number] {
  // --- Step 1: Calculate BMR using Mifflin-St Jeor ---
  let bmrMifflin =
    gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  // --- Step 2: Calculate BMR using Revised Harris-Benedict ---
  let bmrHarris =
    gender === "male"
      ? 13.397 * weight + 4.799 * height - 5.677 * age + 88.362
      : 9.247 * weight + 3.098 * height - 4.33 * age + 447.593;

  // --- Step 3: Average BMR ---
  let bmr = (bmrMifflin + bmrHarris) / 2;

  // --- Step 4: Apply activity multiplier ---
  const activityMultipliers: Record<ActivityLevel, number> = {
    mild: 1.2,
    medium: (1.2 + 1.95) / 2, // ~1.575
    hard: 1.95,
  };
  let weightedBmr = bmr * activityMultipliers[activity];

  // --- Step 5: Apply goal adjustment ---
  const goalMultipliers: Record<Goal, number> = {
    "lose weight": 0.9,
    maintain: 1.0,
    gain: 1.1,
  };
  let finalCalories = weightedBmr * goalMultipliers[goal];

  // --- Step 6: Calculate Protein ---
  const proteinMultipliers: Record<Goal, number> = {
    "lose weight": 0.8,
    maintain: 1.4,
    gain: 2,
  };
  let finalProtein = weight * proteinMultipliers[goal];

  // --- Step 7: Calculate Water 1dp---
  let finalWater = Math.round(weight * 0.035 * 10) / 10;

  return [Math.round(finalProtein), Math.round(finalCalories), finalWater]; // round to nearest integer
}
