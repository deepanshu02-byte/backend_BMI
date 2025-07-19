import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/userInterface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, trim: true, required: true },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
    },
    passwordHash: { type: String, required: true },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "suspended", "closed"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("user", userSchema);
