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

/**
 * @swagger
 * /api/students/assign-student:
 *   post:
 *     summary: Assign a new student to a bed
 *     description: Creates a new student profile and assigns the student to a specific bed.
 *     tags:
 *       - Students
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - mobile
 *               - bedId
 *               - studentId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *                 description: The name of the student.
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *                 description: The mobile number of the student.
 *               bedId:
 *                 type: string
 *                 example: "bed123"
 *                 description: The ID of the bed to which the student will be assigned.
 *               studentId:
 *                 type: string
 *                 example: "fde8y8fwf8er8f7f"
 *                 description: The ID of the the student we have to assign a bed..
 *     responses:
 *       200:
 *         description: Successfully created student profile and assigned bed.
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
 *                   example: "Student profile created and assign the bed."
 *                 data:
 *                   type: object
 *                   properties:
 *                     studentData:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "student123"
 *                         name:
 *                           type: string
 *                           example: "John Doe"
 *                         mobile:
 *                           type: string
 *                           example: "9876543210"
 *                         role:
 *                           type: string
 *                           example: "STUDENT"
 *                     bedData:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "bed123"
 *                         studentId:
 *                           type: string
 *                           example: "student123"
 *       409:
 *         description: User with the provided mobile number already exists.
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
 *                   example: "User already exists. Please select from existing user!"
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
 *                   example: "Something went wrong!"
 */

/**
 * @swagger
 * /api/students/remove-student/{bedId}:
 *   delete:
 *     summary: Remove a student from a bed
 *     description: Removes the student assigned to a specific bed by setting the `studentId` to null.
 *     tags:
 *       - Students
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bedId
 *         required: true
 *         schema:
 *           type: string
 *           example: "bed123"
 *         description: The ID of the bed from which the student will be removed.
 *     responses:
 *       200:
 *         description: Student removed successfully.
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
 *                   example: "Student removed successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "bed123"
 *                     studentId:
 *                       type: null
 *       401:
 *         description: Unauthorized. JWT token is missing or invalid.
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
 *                   example: "Unauthorized"
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
 *                   example: "Something went wrong!"
 */
