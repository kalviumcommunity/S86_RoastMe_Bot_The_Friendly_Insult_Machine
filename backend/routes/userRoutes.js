// routes/userRoutes.js
const express = require("express");
const { body, validationResult } = require("express-validator");
const { User } = require("../models");
const { Op } = require("sequelize");
const { updateUserRole } = require("../controllers/userController"); // Import the updateUserRole controller

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Register new user
router.post(
  "/",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("role")
      .optional()
      .isIn(["admin", "user"])
      .withMessage("Role must be 'admin' or 'user'"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { username, email, role = "user" } = req.body;

      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ email }, { username }],
        },
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Email or username already in use" });
      }

      const newUser = await User.create({ username, email, role });
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

// Update user role by username
router.put("/role", updateUserRole); // Use the updateUserRole controller

// Update user by ID
router.put("/:id", 
  [
    body("role")
      .optional()
      .isIn(["admin", "user"])
      .withMessage("Role must be 'admin' or 'user'"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { username, email, role } = req.body;
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      if (username) user.username = username;
      if (email) user.email = email;
      if (role) user.role = role;

      await user.save();
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: { id: req.params.id },
    });

    if (deletedUser === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
