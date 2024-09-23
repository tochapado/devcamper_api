const express = require('express');
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses.js');

const router = express.Router({
  mergeParams: true,
});

const Course = require('../models/Course.js');
const advancedResults = require('../middleware/advancedResults.js');


router.get(
  '/',
  advancedResults(Course, {
    path: 'bootcamp',
    select: 'name description',
  }),
  getCourses
);

router.get('/:id', getCourse);

router.post('/', addCourse);

router.put('/:id', updateCourse);

router.delete('/:id', deleteCourse);

// router.route('/').get(getCourses);
// router.route('/:id).get(getCourse);
// router.route('/').post(addCourse);
// router.route('/:id').put(updateCourse);
// router.route('/:id').delete(deleteCourse);

module.exports = router;