/**
 * @swagger
 * /api/rooms/{hostelId}:
 *   get:
 *     summary: Get all rooms in a hostel
 *     description: Fetches all rooms associated with a specific hostel. Requires a valid JWT token in the Authorization header.
 *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hostelId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the hostel whose rooms are to be retrieved
 *     responses:
 *       200:
 *         description: Successfully fetched all rooms.
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
 *                         example: "room-id-123"
 *                       name:
 *                         type: string
 *                         example: "Room A1"
 *                       hostelId:
 *                         type: string
 *                         example: "hostel-id-456"
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

/**
 * @swagger
 * /api/rooms/{hostelId}:
 *   post:
 *     summary: Create a new room
 *     description: Allows a user to create a new room within a specific hostel. Requires a valid JWT token in the Authorization header.
 *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hostelId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the hostel where the room will be created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Room A1"
 *     responses:
 *       200:
 *         description: Room created successfully.
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
 *                   example: Room created successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "room-id-123"
 *                     name:
 *                       type: string
 *                       example: "Room A1"
 *                     hostelId:
 *                       type: string
 *                       example: "hostel-id-456"
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
