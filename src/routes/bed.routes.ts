import { Router } from "express";
import { authenticator } from "../middleware/authenticator";
import { createBed, getAllBed } from "../controllers/bed.controller";

const bedRoutes = Router();

/**
 * @swagger
 * /api/beds/{roomId}:
 *   get:
 *     summary: Get all beds in a room
 *     description: Fetches all beds associated with a specific room. Requires a valid JWT token in the Authorization header.
 *     tags:
 *       - Beds
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the room whose beds are to be retrieved
 *     responses:
 *       200:
 *         description: Successfully fetched all beds.
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
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "bed-id-123"
 *                       name:
 *                         type: string
 *                         example: "Bed A1"
 *                       roomId:
 *                         type: string
 *                         example: "room-id-456"
 *                       rent:
 *                         type: number
 *                         example: 5000
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-12-06T10:00:00.000Z"
 *       500:
 *         description: Server error.
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
 *                   example: Something went wrong!
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
bedRoutes.get("/:roomId", getAllBed);

/**
 * @swagger
 * /api/beds/{roomId}:
 *   post:
 *     summary: Create a new bed
 *     description: Allows a user to create a new bed within a specific room. Requires a valid JWT token in the Authorization header.
 *     tags:
 *       - Beds
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the room where the bed will be created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Bed A1"
 *               rent:
 *                 type: number
 *                 example: 5000
 *             required:
 *               - name
 *               - rent
 *     responses:
 *       200:
 *         description: Bed created successfully.
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
 *                   example: Bed created successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "bed-id-123"
 *                     name:
 *                       type: string
 *                       example: "Bed A1"
 *                     rent:
 *                       type: number
 *                       example: 5000
 *                     roomId:
 *                       type: string
 *                       example: "room-id-456"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-12-06T10:00:00.000Z"
 *       500:
 *         description: Server error.
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
 *                   example: Something went wrong!
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
bedRoutes.post("/:roomId", authenticator({ isAdmin: true }), createBed);

export default bedRoutes;
