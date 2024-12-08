import { Router } from "express";
import { authenticator } from "../middleware/authenticator";
import { getDashboardData } from "../controllers/dashboard.controller";

const dashboardRoutes = Router();

dashboardRoutes.get("/", authenticator({ isAdmin: true }), getDashboardData);

export default dashboardRoutes;
