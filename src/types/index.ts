export type HealthConditionId = "diabetes" | "hypertension" | "ulcer" | "pcos" | "pregnancy" | "weightLoss";

export type HealthNotes = Record<HealthConditionId, "excellent" | "good" | "moderate" | "limit" | "not-recommended" | "reduce-pepper" | "reduce-salt" | "reduce-spice" | string>;

export type Recipe = {
  id: number;
  name: string;
  category: "breakfast" | "lunch" | "dinner" | "snack";
  region: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  spiceLevel: number; // 0-5
  prepTime?: number;
  tags?: string[];
  ingredients: string[];
  healthNotes: HealthNotes;
};

export type DayId = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export type MealType = "breakfast" | "lunch" | "dinner";

export type MealPlan = Partial<Record<DayId, Partial<Record<MealType, Recipe>>>>;

export type Preferences = {
  healthConditions: HealthConditionId[];
  spicePreference: number; // 0-5
};

export type PantryItem = { name: string; checked?: boolean };
