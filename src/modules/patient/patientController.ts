import { Request, Response } from "express";
// import BMIModel from "../models/bmiModel"; // adjust path as needed
import BMI from "../../models/BmiModel";
export const calculateAndSaveBMI = async (req: Request, res: Response):Promise<any> => {
  try {
    const { height, weight } = req.body;

    if (!height || !weight) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const heightInMeters = height / 100;
    const bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(2));

    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal weight";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";

    const bmiRecord = new BMI({
      height,
      weight,
      bmi,
      category,
      calculatedAt: new Date(),
    });

    await bmiRecord.save();

    return res.status(201).json({
      message: "BMI calculated and saved successfully.",
      data: bmiRecord,
    });
  } catch (error) {
    console.error("BMI calculation error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getBMIRecords = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userid } = req.query;

    const filter = userid ? { userid } : {};

    const records = await BMI.find(filter).sort({ calculatedAt: -1 });

    return res.status(200).json({
      message: "BMI records fetched successfully.",
      data: records,
    });
  } catch (error) {
    console.error("Error fetching BMI records:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
