const ErrorResponse = require('../utils/errorResponse.js');
const asyncHandler = require('../middleware/async.js');
const Bootcamp = require('../models/Bootcamp.js');

//  @desc   Get all bootcamps
//  @route  GET /api/v1/bootcamps
//  @access Public
const getBootcamps = asyncHandler(async function(req, res, next) {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => '$' + match);

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr));

  // SELECT fields
  if(req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  };

  // Sort
  if(req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  };

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const bootcamps = await query;

  // Pagination result
  const pagination = {};

  if(endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  };

  if(startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit,
    };
  };

  res
    .status(200)
    .json({
      success: true,
      count: bootcamps.length,
      pagination: pagination,
      data: bootcamps,
    });
});

//  @desc   Get single bootcamp
//  @route  GET /api/v1/bootcamps/:id
//  @access Public
const getBootcamp = asyncHandler(async function(req, res, next) {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if(!bootcamp) {
    return next(new ErrorResponse('Bootcamp not found id: ' + req.params.id), 404);
  };

  res
    .status(200)
    .json({
      success: true,
      data: bootcamp,
    });
});

//  @desc   Create bootcamp
//  @route  POST /api/v1/bootcamps
//  @access Private
const createBootcamp = asyncHandler(async function(req, res, next) {
  const bootcamp = await Bootcamp.create(req.body);

  res
    .status(201)
    .json({
      success: true,
      data: bootcamp,
    });
});

//  @desc   Update bootcamp
//  @route  PUT /api/v1/bootcamps/:id
//  @access Private
const updateBootcamp = asyncHandler(async function(req, res, next) {
  const bootcamp = await Bootcamp.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if(!bootcamp) {
    return next(new ErrorResponse('Bootcamp not found id: ' + req.params.id, 404));
  };

  res
    .status(200)
    .json({
      success: true,
      data: bootcamp,
    });
});

//  @desc   Delete bootcamp
//  @route  DELETE /api/v1/bootcamps/:id
//  @access Private
const deleteBootcamp = asyncHandler(async function(req, res, next) {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if(!bootcamp) {
    return next(new ErrorResponse('Bootcamp not found id: ' + req.params.id, 404));
  };

  res
    .status(200)
    .json({
      success: true,
      msg: 'Bootcamp deleted..',
      data: bootcamp,
    });
});

module.exports = {
  getBootcamps: getBootcamps,
  getBootcamp: getBootcamp,
  createBootcamp: createBootcamp,
  updateBootcamp: updateBootcamp,
  deleteBootcamp: deleteBootcamp,
};