import Ionicons from '@expo/vector-icons/Ionicons';

export type PlanType = "free" | "subscription" | "premium";

// Benefits included ("yes") and not included ("no") for each plan
export const PLAN_BENEFITS: Record<PlanType, { yes: string[]; no: string[] }> = {
  premium: {
    yes: [
      "Gym program progress tracking",
      "One shot gym program tracking",
      "Meal nutrition tracking",
      "Individual exercise progress monitoring",
      "Fresh gym programs every month",
      "Unlimited gym program re-tracking",
      "Guided nutrition tracking",
      "Expanded exercise progress monitoring"
    ],
    no: [
    ],
  },
  subscription: {
    yes: [
      "Gym program progress tracking",
      "One shot gym program tracking",
      "Meal nutrition tracking",
      "Individual exercise progress monitoring",
      "Fresh gym programs every month",
    ],
    no: [
      "Unlimited gym program re-tracking",
      "Guided nutrition tracking",
      "Expanded exercise progress monitoring"
    ],
  },
  free: {
    yes: [
      "Gym program progress tracking",
      "One shot gym program tracking",
      "Meal nutrition tracking",
      "Individual exercise progress monitoring",
    ],
    no: [
      "Fresh gym programs every month",
      "Unlimited gym program re-tracking",
      "Guided nutrition tracking",
      "Expanded exercise progress monitoring"
    ],
  },
};

// Icon and one-line explanation for each benefit, keyed by the benefit text above
export const BENEFIT_DETAILS: Record<string, { icon: keyof typeof Ionicons.glyphMap; description: string }> = {
  "Gym program progress tracking": { icon: 'barbell-outline', description: "Log every set, rep and weight across your program." },
  "One shot gym program tracking": { icon: 'flash-outline', description: "Track one-off gym sessions outside of a program." },
  "Meal nutrition tracking": { icon: 'nutrition-outline', description: "Log your meals and stay on top of your nutrition." },
  "Individual exercise progress monitoring": { icon: 'pulse-outline', description: "See how each exercise improves over time." },
  "Fresh gym programs every month": { icon: 'calendar-outline', description: "A new program each month that builds on the last." },
  "Unlimited gym program re-tracking": { icon: 'repeat-outline', description: "Re-run any program as many times as you like." },
  "Guided nutrition tracking": { icon: 'compass-outline', description: "Guidance to help you hit your nutrition goals." },
  "Expanded exercise progress monitoring": { icon: 'analytics-outline', description: "Deeper insight into your progress on every exercise." },
};
