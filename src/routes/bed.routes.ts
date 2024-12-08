import { Router } from "express";
import { authenticator } from "../middleware/authenticator";
import { createBed, getAllBed } from "../controllers/bed.controller";

const bedRoutes = Router();

bedRoutes.get("/:roomId", getAllBed);
bedRoutes.post("/:roomId", authenticator({ isAdmin: true }), createBed);

export default bedRoutes;
