const express = require("express");
const UserController = require("../../controllers/UserController/UserController");
const { body } = require("express-validator");

const router = express.Router();

// Login endpoint
router.post("/login", UserController.login);

// Register user endpoint
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password too short"),
  ],
  UserController.register
);

// Get all users endpoint
router.get("/list", UserController.listUsers);

router.get("/userGetById/:id", UserController.userGetById);

// Get all users endpoint
router.get("/getUser", UserController.getUsers);

// Forgot Password Endpoint
router.post("/forgot-password", UserController.forgotPassword);

// Get all admins endpoint
router.get("/admins", UserController.listAdmins);

// DELETE an admin by ID
router.delete("/admins/:id", UserController.deleteAdmin);

// Update an admin by ID
router.put("/admins/:id", UserController.updateAdmin);

module.exports = router;
