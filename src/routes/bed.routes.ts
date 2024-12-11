import { Router } from "express";
import { authenticator } from "../middleware/authenticator";
import {
  createBed,
  getAllBed,
  getBedDetailsById,
} from "../controllers/bed.controller";

const bedRoutes = Router();

// bedRoutes.get("/:roomId", getAllBed);
bedRoutes.post("/:roomId", authenticator({ isAdmin: true }), createBed);
bedRoutes.get("/:bedId", authenticator({ isAdmin: true }), getBedDetailsById);

export default bedRoutes;
