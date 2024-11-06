const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async.js');
const Bootcamp = require('../models/Bootcamp.js');

//  @desc   Get all bootcamps
//  @route  GET /api/v1/bootcamps
//  @access Public
const getBootcamps = asyncHandler(async function(req, res, next) {
  const bootcamps = await Bootcamp.find();

  res
    .status(200)
    .json({
      success: true,
      count: bootcamps.length,
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