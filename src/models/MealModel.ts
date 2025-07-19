import mongoose, { Schema } from "mongoose";

interface IMealPlan {
  planType: string; // e.g., "daily" or "weekly"
  fitnessGoal: string; // e.g., "weight-loss", "muscle-gain", "maintenance"
  dietPreference: string[]; // e.g., ["Vegan", "Low-Carb"]
  meals: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
  };
}

const mealPlanSchema = new Schema<IMealPlan>(
  {
    planType: {
      type: String,
      enum: ["daily", "weekly"],
      required: true,
    },
    fitnessGoal: {
      type: String,
      enum: ["weight-loss", "muscle-gain", "maintenance"],
      required: true,
    },
    dietPreference: {
      type: [String],
      required: true,
    },
    meals: {
      breakfast: { type: [String], required: true },
      lunch: { type: [String], required: true },
      dinner: { type: [String], required: true },
    },
  }
);

export default mongoose.model<IMealPlan>("MealPlan", mealPlanSchema);
