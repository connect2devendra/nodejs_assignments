const express = require('express');
const router = express.Router();
const { checkToken } = require("../middleware/VerifyToken");
const { getUsers, getUserByID, userLogin } = require('../controllers/user-controller');


/**
 * @swagger
 * tags:
 *  - name: USERS
 *    description: Manage Users APIs
 */

/**
 * @swagger
 * /api/v1/users/login:
 *  post:
 *   tags:
 *    - "USERS"
 *   summary: "User Login"
 *   description: "User login by email and password to generate token"
 *   operationId: "userLogin"
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *         default: "Fred@123.com"
 *        password:
 *         type: string
 *         default: "68651"
 *   responses:
 *    200:
 *     description: Success 
 *    500:
 *     description: Error   
 */

/**
 * @swagger
 * /api/v1/users/:
 *  get:
 *   tags:
 *    - "USERS"
 *   summary: "Fetch All Users"
 *   description: Fetch All Users
 *   operationId: "getUsers"
 *   responses:
 *    200:
 *     description: Success 
 *    500:
 *     description: Error
 *   security:
 *     - bearerAuth: []
 */

/**
 * @swagger
 * /api/v1/users/{user_id}:
 *  get:
 *   tags:
 *    - "USERS"
 *   summary: "Fetch Single User Details"
 *   description: Fetch User By ID
 *   operationId: "getUserByID"
 *   parameters:
 *    - in: path
 *      description: Id of the User
 *      required: true
 *      name: user_id
 *      schema:
 *       type: integer
 *      example: 1
 *   responses:
 *    200:
 *     description: Success 
 *    500:
 *     description: Error 
 *   security:
 *     - bearerAuth: []
 */
router.post("/login", userLogin);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserByID);


module.exports = router;