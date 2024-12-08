import { Router } from "express";
import { authenticator } from "../middleware/authenticator";
import { createRoom, getAllRooms } from "../controllers/room.controller";

const roomRoutes = Router();

roomRoutes.get("/:hostelId", getAllRooms);
roomRoutes.post("/:hostelId", authenticator({ isAdmin: true }), createRoom);

export default roomRoutes;
