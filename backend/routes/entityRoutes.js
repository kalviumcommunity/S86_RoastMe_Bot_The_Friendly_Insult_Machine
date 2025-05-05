// routes/entityRoutes.js
const express = require('express');
const { body, validationResult, param } = require('express-validator');
const router = express.Router();
const { Entity, User } = require('../models'); // Sequelize models

// POST - Create a new entity
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('created_by')
      .notEmpty().withMessage('created_by is required')
      .isInt().withMessage('created_by must be a valid user ID'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { name, description, created_by } = req.body;

      // Ensure the user exists before creating the entity
      const user = await User.findByPk(created_by);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Create a new entity with the validated data
      const newEntity = await Entity.create({ name, description, created_by });

      res.status(201).json({
        success: true,
        message: 'Entity created successfully',
        entity: newEntity,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message,
      });
    }
  }
);

// GET - All entities with user info
router.get('/', async (req, res) => {
  try {
    const entities = await Entity.findAll({
      include: [
        {
          model: User,
          as: 'creator',  // Ensure 'creator' is the alias used for user
          attributes: ['name', 'email'],
        },
      ],
    });

    res.status(200).json({ success: true, entities });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET - Entities by specific user
router.get(
  '/by-user/:userId',
  [
    param('userId')
      .isInt().withMessage('Invalid user ID'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const userId = req.params.userId;

      // Find entities created by the specific user
      const entities = await Entity.findAll({
        where: { created_by: userId },
        include: [
          {
            model: User,
            as: 'creator', // Ensure the correct alias is used for the user model
            attributes: ['name', 'email'],
          },
        ],
      });

      // Return entities if found, else show a message
      if (entities.length > 0) {
        res.status(200).json({ success: true, entities });
      } else {
        res.status(404).json({ success: false, message: 'No entities found for this user' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  }
);

module.exports = router;
