const express = require('express');

const {
  getRolas,
  getRola,
  createRola,
  updateRola,
  deleteRola,
} = require('../controllers/rolas.js');

const router = express.Router();

// Get Rolas
router.get('/', getRolas);

// Get a single Rola
router.get('/:id', getRola);

// Add new Rola
router.post('/', createRola);

// Update a Rola
router.put('/:id', updateRola);

// Delete a Rola
router.delete('/:id', deleteRola);

module.exports = router;