import { Router } from "express";
import {
  CreateInsurance,
  GetAllInsurance,
  GetInsuranceById,
} from "../controllers/insurance";
import { authenticator } from "../middleware/authenticator";

const insuranceRoutes = Router();

insuranceRoutes.get("/insurance", authenticator, GetAllInsurance);
insuranceRoutes.get("/insurance/:id", authenticator, GetInsuranceById);
insuranceRoutes.post("/insurance", authenticator, CreateInsurance);

export default insuranceRoutes;
