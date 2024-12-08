import { Router } from "express";
import { authenticator } from "../middleware/authenticator";
import {
  assignNewStudent,
  getStudentDetails,
  removeStudent,
} from "../controllers/student.controller";

const studentRoutes = Router();

studentRoutes.get(
  "/:studentId",
  authenticator({ isAdmin: true }),
  getStudentDetails
);
studentRoutes.post(
  "/assign-student",
  authenticator({ isAdmin: true }),
  assignNewStudent
);
studentRoutes.delete(
  "/remove-student/:bedId",
  authenticator({ isAdmin: true }),
  removeStudent
);
export default studentRoutes;
