const express = require('express');
const { body, validationResult, param } = require('express-validator');
const mongoose = require('mongoose');
const router = express.Router();
const Entity = require('../models/entity');

// POST - Create a new entity with validation
router.post(
  '/',
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").optional().isString().withMessage("Description must be a string"),
    body("created_by")
      .notEmpty().withMessage("created_by is required")
      .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage("Invalid user ID"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { name, description, created_by } = req.body;
      const newEntity = new Entity({ name, description, created_by });
      await newEntity.save();

      res.status(201).json({
        success: true,
        message: "Entity created successfully",
        entity: newEntity
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
    }
  }
);

// GET - Fetch all entities with created_by user info
router.get('/', async (req, res) => {
  try {
    const entities = await Entity.find().populate('created_by', 'name email');
    res.status(200).json({ success: true, entities });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// GET - Fetch entities by user ID with created_by user info
router.get(
  '/by-user/:userId',
  [
    param("userId").custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage("Invalid user ID"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const entities = await Entity.find({ created_by: req.params.userId })
        .populate('created_by', 'name email');

      res.status(200).json({ success: true, entities });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  }
);

module.exports = router;
