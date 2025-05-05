// routes/userRoutes.js
const express = require("express");
const { body, validationResult } = require("express-validator");
const { User } = require("../models"); // Sequelize User model
const router = express.Router();

// ✅ GET all users - modified to return { users: [...] }
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll(); // Sequelize method to fetch all users
    res.status(200).json({ users }); // ✅ Matches expected frontend structure
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST new user with validation
router.post(
  "/",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("role").optional().isString().withMessage("Role must be a string"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { username, email, role } = req.body;

      // Check if user already exists based on email or username
      const existingUser = await User.findOne({ 
        where: { 
          [Op.or]: [{ email }, { username }] 
        }
      });

      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email or username already in use" });
      }

      const newUser = await User.create({ username, email, role }); // Sequelize method to create a new user
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

// PUT update user
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: { id: req.params.id },
      returning: true, // Returns the updated row
    });

    if (updatedUser[0] === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: updatedUser[1][0] }); // Returning the updated user object
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE user
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
