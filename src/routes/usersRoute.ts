import { Router } from "express";
import {
  registerUser,
  loginUser,
  getAllUsersCountByAdmin,
} from "../modules/users/userController";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/getAllUsersCountByAdmin", getAllUsersCountByAdmin);
export default userRouter;
