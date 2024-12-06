import "dotenv/config";
import express from "express";
import cors from "cors";
import { getIndex } from "./controllers";
import authRoutes from "./routes/authRoutes";
import { PrismaClient } from "@prisma/client";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swaggerConfig";
import hostelRoutes from "./routes/hostelRoutes";

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

//DB Connection
export const prisma = new PrismaClient();

app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
