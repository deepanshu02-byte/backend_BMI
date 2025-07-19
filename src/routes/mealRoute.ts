import { Router } from "express";
import { createMealPlan,
    getMealPlans
 } from "../modules/patient/mealController";
const mealRouter = Router();

mealRouter.post("/", createMealPlan);
mealRouter.get("/", getMealPlans);
export default mealRouter;
