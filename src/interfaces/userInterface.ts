import { TRoles } from "../types/user";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  passwordHash: string;
  role: TRoles;
  mobileNumber: string;
  status: string;
}
