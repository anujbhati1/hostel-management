import "dotenv/config";
import express from "express";
import cors from "cors";
import { getIndex } from "./controllers";
import authRoutes from "./routes/auth.routes";
import { PrismaClient } from "@prisma/client";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swaggerConfig";
import hostelRoutes from "./routes/hostel.routes";
import roomRoutes from "./routes/room.routes";
import bedRoutes from "./routes/bed.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import studentRoutes from "./routes/student.routes";

const PORT = Number(process.env.PORT) || 4000;
const app = express();

//Middlewares
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(cors());

//Routes
app.use("/health-check", getIndex);
app.use("/api/auth", authRoutes);
app.use("/api/hostels", hostelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/beds", bedRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/students", studentRoutes);

//DB Connection
export const prisma = new PrismaClient();

app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
