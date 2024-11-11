const express = require('express');
const router = express.Router();

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require('../controllers/bootcamps.js');

// Include other resource routers
const courseRouter = require('./courses.js');

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router
  .route('/')
  .get(getBootcamps);

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

module.exports = router;