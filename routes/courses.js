const express = require('express');
const router = express.Router();

const {
  getCourses,
  getCourse,
  createCourse,
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
  .post(createCourse);

router
  .route('/:id')
  .put(updateCourse);

router
  .route('/:id')
  .delete(deleteCourse);

module.exports = router;