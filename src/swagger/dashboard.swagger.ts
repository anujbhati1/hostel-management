/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard data
 *     description: Fetch aggregated dashboard data for hostels owned by the authenticated user. Includes room, bed, rent, and expense information.
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched dashboard data.
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
 *                       hostelId:
 *                         type: string
 *                         example: "hostel-id-123"
 *                       hostelName:
 *                         type: string
 *                         example: "Sunrise Hostel"
 *                       totalRooms:
 *                         type: integer
 *                         example: 10
 *                       totalBeds:
 *                         type: integer
 *                         example: 50
 *                       totalRent:
 *                         type: number
 *                         example: 50000
 *                       emptyBeds:
 *                         type: integer
 *                         example: 5
 *                       emptyRooms:
 *                         type: integer
 *                         example: 2
 *                       receivedRent:
 *                         type: number
 *                         example: 45000
 *                       hostelExpense:
 *                         type: number
 *                         example: 10000
 *       401:
 *         description: Unauthorized access. JWT token is missing or invalid.
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
 *                   example: Unauthorized
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
