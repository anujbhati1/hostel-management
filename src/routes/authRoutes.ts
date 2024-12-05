import { Router } from "express";
import { login, Signup } from "../controllers/auth";

const authRoutes = Router();

//@ts-ignore
authRoutes.post("/auth/login", login);
//@ts-ignore
authRoutes.post("/auth/signup", Signup);

export default authRoutes;
