const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Entity = require('../models/entity');

// POST - Create a new entity with validation
router.post(
  '/',
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").optional().isString().withMessage("Description must be a string"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { name, description } = req.body;
      const newEntity = new Entity({ name, description });
      await newEntity.save();

      res.status(201).json({ success: true, message: "Entity created successfully", entity: newEntity });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  }
);

// GET - Fetch all entities
router.get('/', async (req, res) => {
  try {
    const entities = await Entity.find();
    res.status(200).json({ success: true, entities });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;
