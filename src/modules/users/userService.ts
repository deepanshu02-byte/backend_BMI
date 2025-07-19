import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { TCreateUserBody, TRoles, TUserLoginBody } from "../../types/user";
import { env } from "../../config/envConfig";
import { IUser } from "../../interfaces/userInterface";
import userModel from "../../models/UserModel";

export const registerUser = async (createBody: TCreateUserBody) => {
  const { name, email, password, mobileNumber, role } = createBody;
  const existing = await userModel.findOne({ email });
  if (existing) throw new Error("User already exists");
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    name,
    email,
    passwordHash,
    role,
    mobileNumber,
  });

  return { name: user.name, email: user.email, role: user.role };
};

export const loginUser = async (
  bodyParams: TUserLoginBody
): Promise<{
  token: string;
  email: string;
  role: TRoles;
  name: string;
  userId: string;
}> => {
  const { email, password } = bodyParams;
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("Invalid credentials");
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new Error("Invalid credentials");
  const response: any = {
    token: generateJWT(user),
    email: user.email,
    role: user.role,
    name: user.name,
    gender: 'male',
    height: 5.10,
    weight: 70,
    userId: user._id,
  };
  return response;
};

const generateJWT = (user: IUser) => {
  // JWT payload containing user information
  const payload = {
    userId: user._id,
    role: user.role,
    email: user.email,
  };
  // Generate and return the JWT
  const token = jwt.sign(payload, env.JWT_ACCESS, { expiresIn: "7d" });
  return token;
};

export const getAllUsersCountByAdmin = async () => {
  const result = await userModel.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  let activeUsers = 0;
  let suspendedUsers = 0;
  let closedUsers = 0;
  let totalUsers = 0;

  result.forEach((item) => {
    totalUsers += item.count;
    if (item._id === "active") {
      activeUsers = item.count;
    } else if (item._id === "suspended") {
      suspendedUsers = item.count;
    } else if (item._id === "closed") {
      closedUsers = item.count;
    }
  });

  return { totalUsers, activeUsers, suspendedUsers, closedUsers };
};
