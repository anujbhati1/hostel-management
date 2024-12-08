/**
 * @swagger
 * /api/students/{studentId}:
 *   get:
 *     summary: Get student details
 *     description: Fetch details of a student by their ID, including their assigned bed, room, and hostel information. Requires authentication using a JWT token.
 *     tags:
 *       - Students
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student whose details are to be fetched.
 *     responses:
 *       200:
 *         description: Successfully fetched student details.
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
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "student-id-123"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     bed:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "bed-id-456"
 *                         rent:
 *                           type: number
 *                           example: 5000
 *                         room:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "room-id-789"
 *                             name:
 *                               type: string
 *                               example: "Room A"
 *                             hostel:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: string
 *                                   example: "hostel-id-321"
 *                                 name:
 *                                   type: string
 *                                   example: "Sunrise Hostel"
 *       404:
 *         description: Student not found.
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
 *                   example: No student found.
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
