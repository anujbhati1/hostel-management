import { Router } from "express";
import { login, Signup } from "../controllers/auth.controller";

const authRoutes = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login to the application
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobile:
 *                 type: string
 *                 description: Mobile number of the user.
 *                 example: "1234567890"
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *                 example: "securepassword"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Login successful"
 *                 data:
 *                   type: object
 *                   description: User details
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     mobile:
 *                       type: string
 *                     role:
 *                       type: string
 *                 token:
 *                   type: string
 *                   description: Authentication token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Invalid login credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "User not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "Something went wrong!"
 */
authRoutes.post("/login", login);

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user.
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 description: Email of the user.
 *                 example: "john.doe@example.com"
 *               role:
 *                 type: string
 *                 description: Role of the user (e.g., ADMIN, STUDENT, GUEST, EMPLOYEE).
 *                 example: "STUDENT"
 *               password:
 *                 type: string
 *                 description: Password for the user.
 *                 example: "securepassword"
 *               mobile:
 *                 type: string
 *                 description: Mobile number of the user.
 *                 example: "1234567890"
 *               city:
 *                 type: string
 *                 description: City of the user.
 *                 example: "New York"
 *               loginId:
 *                 type: string
 *                 description: Login ID for the user.
 *                 example: "johndoe123"
 *     responses:
 *       200:
 *         description: Signup successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Signup successful"
 *                 data:
 *                   type: object
 *                   description: User details
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     mobile:
 *                       type: string
 *                     role:
 *                       type: string
 *                 token:
 *                   type: string
 *                   description: Authentication token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "User already exists."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "Something went wrong!"
 */
authRoutes.post("/signup", Signup);

export default authRoutes;
