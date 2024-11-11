const ErrorResponse = require('../utils/errorResponse.js');
const asyncHandler = require('../middleware/async.js');
const Course = require('../models/Course.js');
const Bootcamp = require('../models/Bootcamp.js');

//  @desc   Get all courses
//  @route  GET /api/v1/courses
//  @route  GET /api/v1/bootcamps/:bootcampId/courses
//  @access Public
// const getCourses = asyncHandler(async function(req, res, next) {
//   let query;

//   if(req.params.bootcampId) {
//     query = Course.find({ bootcamp: req.params.bootcampId });
//   } else {
//     query = Course.find();
//   };

//   // Copy req.query
//   const reqQuery = { ...req.query };

//   // Fields to exclude
//   const removeFields = ['select', 'sort', 'page', 'limit'];

//   // Loop over removeFields and delete from reqQuery
//   removeFields.forEach(param => delete reqQuery[param]);

//   // Create query string
//   let queryStr = JSON.stringify(reqQuery);

//   // Create operators
//   queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => '$' + match);

//   // Finding resource
//   query = Course.find(JSON.parse(queryStr));

//   // SELECT fields
//   if(req.query.select) {
//     const fields = req.query.select.split(',').join(' ');
//     query = query.select(fields);
//   };

//   // Sort
//   if(req.query.sort) {
//     const sortBy = req.query.sort.split(',').join(' ');
//     query = query.sort(sortBy);
//   } else {
//     query = query.sort('-createdAt');
//   };


//   // Pagination
//   // const page = parseInt(req.query.page, 10) || 1;
//   // const limit = parseInt(req.query.limit, 10) || 10;
//   // const startIndex = (page - 1) * limit;
//   // const endIndex = page * limit;
//   // const total = await Bootcamp.countDocuments();

//   // Pagination
//   const page = parseInt(req.query.page, 10) || 1;
//   const limit = parseInt(req.query.limit, 10) || 10;
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;
//   const total = await Course.countDocuments();

//   query = query.skip(startIndex).limit(limit);

//   // Executing query
//   const courses = await query;

//   // Pagination result
//   const pagination = {};

//   if(endIndex < total) {
//     pagination.next = {
//       page: page + 1,
//       limit: limit,
//     };
//   };

//   if(startIndex > 0) {
//     pagination.prev = {
//       page: page - 1,
//       limit: limit,
//     };
//   };

//   res
//     .status(200)
//     .json({
//       success: true,
//       count: courses.length,
//       pagination: pagination,
//       data: courses,
//     });
// });

const getCourses = asyncHandler(async function(req, res, next) {
  let query;

  if(req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description',
    });
  };

  const courses = await query;

  res
    .status(200)
    .json({
      success: true,
      count: courses.length,
      data: courses,
    });
});

//  @desc   Get single course
//  @route  GET /api/v1/courses/:id
//  @access Public
const getCourse = asyncHandler(async function(req, res, next) {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if(!course) {
    return next(new ErrorResponse('Course not found id: ' + req.params.id), 404);
  };

  res
    .status(200)
    .json({
      success: true,
      data: course,
    });
});

//  @desc   Create course
//  @route  POST /api/v1/bootcamps/:bootcampId/courses
//  @access Private
const addCourse = asyncHandler(async function(req, res, next) {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if(!bootcamp) {
    return next(new ErrorResponse('No bootcamp with id: ' + req.params.bootcampId), 404);
  };

  const course = await Course.create(req.body);

  res
    .status(201)
    .json({
      success: true,
      data: course,
    });
});

//  @desc   Update course
//  @route  PUT /api/v1/courses/:id
//  @access Private
const updateCourse = asyncHandler(async function(req, res, next) {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if(!course) {
    return next(new ErrorResponse('Course not found id: ' + req.params.id, 404));
  };

  res
    .status(200)
    .json({
      success: true,
      data: course,
    });
});

//  @desc   Delete course
//  @route  DELETE /api/v1/courses/:id
//  @access Private
const deleteCourse = asyncHandler(async function(req, res, next) {
  const course = await Course.findById(req.params.id);

  if(!course) {
    return next(new ErrorResponse('Course not found id: ' + req.params.id, 404));
  };

  await course.deleteOne();

  res
    .status(200)
    .json({
      success: true,
      msg: 'Course deleted..',
      data: course,
    });
});

module.exports = {
  getCourses: getCourses,
  getCourse: getCourse,
  addCourse: addCourse,
  updateCourse: updateCourse,
  deleteCourse: deleteCourse,
};