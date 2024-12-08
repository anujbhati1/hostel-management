import { Router } from "express";
import { authenticator } from "../middleware/authenticator";
import { getStudentDetails } from "../controllers/student.controller";

const studentRoutes = Router();

studentRoutes.get(
  "/:studentId",
  authenticator({ isAdmin: true }),
  getStudentDetails
);

export default studentRoutes;
