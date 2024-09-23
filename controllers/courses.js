const ErrorResponse = require('../utils/errorResponse.js');
const asyncHandler = require('../middleware/async.js');
const Course = require('../models/Course.js');
const Bootcamp = require('../models/Bootcamp.js');

// @desc    Get courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
const getCourses = asyncHandler(async function(req, res, next) {
  if(req.params.bootcampId) {
    const courses = await Course.find({
      bootcamp: req.params.bootcampId,
    });

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } else {
    res.status(200).json(res.advancedResults);
  };
});

// @desc    Get a single course
// @route   GET /api/v1/courses/:id
// @access  Public
const getCourse = asyncHandler(async function(req, res, next) {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if(!course) {
    return next(
      new ErrorResponse(
        'No course with the id ' + req.params.id,
        404
      ));
  };

  res
    .status(200)
    .json({
      success: true,
      data: course,
    });
});

// @desc    Add course
// @route   POST /api/vi/bootcamps/:bootcampId/courses
// @access  Private
const addCourse = asyncHandler(async function(req, res, next) {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if(!bootcamp) {
    return next(
      new ErrorResponse(
        'No bootcamp with the id ' + req.params.bootcampId,
        404
      ));
  };

  const course = await Course.create(req.body);

  res
    .status(200)
    .json({
      success: true,
      data: course,
    });
});

// @desc    update course
// @route   PUT /api/v1/courses/:id
// @access  Private
const updateCourse = asyncHandler(async function(req, res, next) {
  let course = await Course.findById(req.params.id);

  if(!course) {
    return next(new ErrorResponse('No course with the id ' + req.params.id, 404));
  };

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res
    .status(200)
    .json({
      success: true,
      data: course,
    });
});

// @desc    delete course
// @route   DELETE /api/v1/courses/:id
// @access  Private
const deleteCourse = asyncHandler(async function(req, res, next) {
  const course = await Course.findById(req.params.id);

  if(!course) {
    return next(new ErrorResponse(
      'No course with the id ' + req.params.id,
      404
    ));
  };

  await course.deleteOne();

  res
    .status(200)
    .json({
      success: true,
      data: {},
    });
});

module.exports = {
  getCourses: getCourses,
  getCourse: getCourse,
  addCourse: addCourse,
  updateCourse: updateCourse,
  deleteCourse: deleteCourse,
};