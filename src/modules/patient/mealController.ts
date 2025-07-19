import { Request, Response } from "express";
import MealModel from "../../models/MealModel";

export const createMealPlan = async (req: Request, res: Response): Promise<any> => {
  try {
    const { planType, fitnessGoal, dietPreference, meals } = req.body;

    // Validate required fields
    if (!planType || !fitnessGoal || !dietPreference || !meals) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const { breakfast, lunch, dinner } = meals;

    if (!breakfast || !lunch || !dinner) {
      return res.status(400).json({ message: "Meals must include breakfast, lunch, and dinner." });
    }

    // Create a new meal plan record
    const mealPlanRecord = new MealModel({
      planType,
      fitnessGoal,
      dietPreference,
      meals: {
        breakfast,
        lunch,
        dinner,
      },
      createdAt: new Date(),
    });

    await mealPlanRecord.save();

    return res.status(201).json({
      message: "Meal plan created and saved successfully.",
      data: mealPlanRecord,
    });
  } catch (error) {
    console.error("Meal plan creation error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getMealPlans = async (req: Request, res: Response): Promise<any> => {
  try {
    const mealPlans = await MealModel.find().sort({ createdAt: -1 }); // Latest first

    return res.status(200).json({
      message: "Meal plans retrieved successfully.",
      data: mealPlans,
    });
  } catch (error) {
    console.error("Error retrieving meal plans:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
