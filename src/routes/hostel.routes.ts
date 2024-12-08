import { Router } from "express";
import {
  createHostel,
  getAllHostel,
  getHostelDetailsById,
} from "../controllers/hostel.controller";
import { authenticator } from "../middleware/authenticator";

const hostelRoutes = Router();

/**
 * @swagger
 * /api/hostels:
 *   get:
 *     summary: Get all hostels
 *     description: Fetches all hostels from the database, ordered by creation date in ascending order.
 *     tags:
 *       - Hostels
 *     responses:
 *       200:
 *         description: A list of hostels retrieved successfully.
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
 *                         example: "hostel-id-123"
 *                       name:
 *                         type: string
 *                         example: "Sunrise Hostel"
 *                       lat:
 *                         type: number
 *                         example: 44.483334
 *                       lng:
 *                         type: number
 *                         example: 72.02929
 *                       address:
 *                         type: string
 *                         example: "New York City"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-12-06T10:00:00.000Z"
 *       500:
 *         description: Server error
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
 */
hostelRoutes.get("/", getAllHostel);

/**
 * @swagger
 * /api/hostels:
 *   post:
 *     summary: Create a new hostel
 *     description: Allows a user to create a new hostel with the provided details. Requires a valid JWT token in the Authorization header.
 *     tags:
 *       - Hostels
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sunrise Hostel"
 *               lat:
 *                 type: string
 *                 example: "40.7128"
 *               lng:
 *                 type: string
 *                 example: "-74.0060"
 *               address:
 *                 type: string
 *                 example: "123 Main St, New York, NY 10001"
 *     responses:
 *       200:
 *         description: Hostel created successfully.
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
 *                   example: Hostel created successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "hostel-id-123"
 *                     name:
 *                       type: string
 *                       example: "Sunrise Hostel"
 *                     lat:
 *                       type: number
 *                       example: 40.7128
 *                     lng:
 *                       type: number
 *                       example: -74.0060
 *                     address:
 *                       type: string
 *                       example: "123 Main St, New York, NY 10001"
 *                     userId:
 *                       type: string
 *                       example: "user-id-123"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-12-06T10:00:00.000Z"
 *       400:
 *         description: Invalid input or other client-side error.
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
 *                   example: Incorrect Password
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
hostelRoutes.post("/", authenticator({ isAdmin: true }), createHostel);

/**
 * @swagger
 * /api/hostels/{hostelId}:
 *   get:
 *     summary: Get details of a specific hostel
 *     description: Retrieve all details of a specific hostel, including its rooms, beds, and the students assigned to the beds.
 *     tags:
 *       - Hostels
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hostelId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the hostel to fetch details for.
 *     responses:
 *       200:
 *         description: Successfully retrieved hostel details.
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
 *                         example: "hostel-id-123"
 *                       name:
 *                         type: string
 *                         example: "Sunrise Hostel"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-12-06T10:00:00.000Z"
 *                       rooms:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "room-id-456"
 *                             createdAt:
 *                               type: string
 *                               format: date-time
 *                               example: "2023-12-06T10:00:00.000Z"
 *                             beds:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: string
 *                                     example: "bed-id-789"
 *                                   rent:
 *                                     type: number
 *                                     example: 5000
 *                                   createdAt:
 *                                     type: string
 *                                     format: date-time
 *                                     example: "2023-12-06T10:00:00.000Z"
 *                                   student:
 *                                     type: object
 *                                     nullable: true
 *                                     properties:
 *                                       id:
 *                                         type: string
 *                                         example: "student-id-101"
 *                                       name:
 *                                         type: string
 *                                         example: "John Doe"
 *                                       age:
 *                                         type: number
 *                                         example: 21
 *       400:
 *         description: Invalid hostel ID or other client-side error.
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
 *                   example: Invalid hostel ID
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
hostelRoutes.get(
  "/:hostelId",
  authenticator({ isAdmin: true }),
  getHostelDetailsById
);

export default hostelRoutes;
