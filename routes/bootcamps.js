const express = require('express');
const router = express.Router();

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

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps);

router
  .route('/:id')
  .get(getBootcamp);

router
  .route('/')
  .post(createBootcamp);

router
  .route('/:id')
  .put(updateBootcamp);

router
  .route('/:id')
  .delete(deleteBootcamp);

router
  .route('/:id/photo')
  .put(bootcampPhotoUpload);

module.exports = router;