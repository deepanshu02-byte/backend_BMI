import jwt from "jsonwebtoken";
import { UserRole } from "../models/UserModel";

/**
 * @param id
 * @param role
 * @returns a token containing object id assigned and role assignes
 */
export const generateToken = (id: string, role: UserRole) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};
