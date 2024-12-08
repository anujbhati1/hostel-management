import { Router } from "express";
import { login, Signup } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/login", login);
authRoutes.post("/signup", Signup);

export default authRoutes;
