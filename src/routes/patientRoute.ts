import { Router } from "express";

import { calculateAndSaveBMI, getBMIRecords } from "../modules/patient/patientController";
const patientRouter = Router();

patientRouter.post("/", calculateAndSaveBMI);
patientRouter.get("/", getBMIRecords);

// userRouter.post("/login", loginUser);
// userRouter.get("/getAllUsersCountByAdmin", getAllUsersCountByAdmin);
export default patientRouter;
