const express = require('express');
const router = express.Router();
const Entity = require('../models/entity'); // Import Entity model

// POST - Create a new entity
router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: "Name is required" });
        }

        const newEntity = new Entity({ name, description });
        await newEntity.save();

        res.status(201).json({ success: true, message: "Entity created successfully", entity: newEntity });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

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
