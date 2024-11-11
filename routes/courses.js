const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses.js');

router
  .route('/')
  .get(getCourses);

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