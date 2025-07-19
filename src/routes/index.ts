import { Router } from "express";
import userRoutes from "./usersRoute";
import patientRouter from "./patientRoute";
import mealRouter from "./mealRoute";
const router = Router();

// Versioned routing prefix is added in app.ts using env.BASIC_API_URL
router.use("/users", userRoutes);
router.use("/bmi", patientRouter);
router.use("/meal", mealRouter);


export default router;


