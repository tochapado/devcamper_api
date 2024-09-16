const express = require('express');

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require('../controllers/bootcamps.js');

const router = express.Router();

// Get Bootcamps
router.get('/', getBootcamps);

// Get a single Bootcamp
router.get('/:id', getBootcamp);

// Add new Bootcamp
router.post('/', createBootcamp);

// Update a Bootcamp
router.put('/:id', updateBootcamp);

// Delete a Bootcamp
router.delete('/:id', deleteBootcamp);

module.exports = router;