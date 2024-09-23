const express = require('express');

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampPhotoUpload,
} = require('../controllers/bootcamps.js');

const Bootcamp = require('../models/Bootcamp.js');
const advancedResults = require('../middleware/advancedResults.js');

// Include other resource routers
const courseRouter = require('./courses.js');

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

// Get Bootcamps
router.get(
  '/',
  advancedResults(Bootcamp, 'courses'),
  getBootcamps
);

// Get a single Bootcamp
router.get('/:id', getBootcamp);

// Add new Bootcamp
router.post('/', createBootcamp);

// Update a Bootcamp
router.put('/:id', updateBootcamp);

// Delete a Bootcamp
router.delete('/:id', deleteBootcamp);

// Photo router
router.put('/:id/photo', bootcampPhotoUpload);

module.exports = router;