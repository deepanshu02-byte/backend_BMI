import mongoose, { Schema } from "mongoose";

interface IBMI {
  userid: string;
  height: number;     // in centimeters
  weight: number;     // in kilograms
  bmi: number;        // calculated BMI
  category: string;   // BMI category
  calculatedAt?: Date;
}

const bmiSchema = new Schema<IBMI>(
  {
    userid: { type: String, required: false, trim: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    bmi: { type: Number, required: true },
    category: {
      type: String,
      enum: ["Underweight", "Normal weight", "Overweight", "Obese"],
      required: true,
    },
    calculatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBMI>("BMI", bmiSchema);
