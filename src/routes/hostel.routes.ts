import { Router } from "express";
import {
  createHostel,
  getAllHostel,
  getHostelDetailsById,
} from "../controllers/hostel.controller";
import { authenticator } from "../middleware/authenticator";

const hostelRoutes = Router();

hostelRoutes.get("/", getAllHostel);
hostelRoutes.post("/", authenticator({ isAdmin: true }), createHostel);
hostelRoutes.get(
  "/:hostelId",
  authenticator({ isAdmin: true }),
  getHostelDetailsById
);

export default hostelRoutes;
