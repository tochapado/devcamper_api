const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses.js');

const Course = require('../models/Course.js');
const advancedResults = require('../middleware/advancedResults.js');

router
  .route('/')
  .get(
    advancedResults(Course, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getCourses
  );

router
  .route('/:id')
  .get(getCourse);

router
  .route('/')
  .post(addCourse);

router
  .route('/:id')
  .put(updateCourse);

router
  .route('/:id')
  .delete(deleteCourse);

module.exports = router;