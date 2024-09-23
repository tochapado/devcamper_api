const path = require('path');
const ErrorResponse = require('../utils/errorResponse.js');
const asyncHandler = require('../middleware/async.js');
const Bootcamp = require('../models/Bootcamp.js');

// @desc    Get all Bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
const getBootcamps = asyncHandler(async function(req, res, next) {
  res
    .status(200)
    .json(res.advancedResults);
});

// @desc    Get a single Bootcamp
// @route   GET /apí/v1/bootcamps/:id
// @access  Public
const getBootcamp = asyncHandler(async function(req, res, next) {
  const bootcamp = await Bootcamp.findById(req.params.id);
  
  if(!bootcamp) {
    return next(new ErrorResponse('Bootcamp not found with id ' + req.params.id, 404));
  };

  res
    .status(200)
    .json({
      success: true,
      data: bootcamp,
    });
});

// @desc    Create a new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
const createBootcamp = asyncHandler(async function(req, res, next) {
  const bootcamp = await Bootcamp.create(req.body);

  res
    .status(201)
    .json({
      success: true,
      data: bootcamp,
    });
});

// @desc    Update Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
const updateBootcamp = asyncHandler(async function(req, res, next) {
  const bootcamp = await Bootcamp.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  
  if(!bootcamp) {
    return next(new ErrorResponse('Bootcamp not found with id ' + req.params.id, 404));
  };

  res
    .status(200)
    .json({
      success: true,
      data: bootcamp,
    });
});

// @desc    Delete Bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
const deleteBootcamp = asyncHandler(async function(req, res, next) {
  const bootcamp = await Bootcamp.findById(req.params.id);
  
  if(!bootcamp) {
    return next(new ErrorResponse('Bootcamp not found with id ' + req.params.id, 404));
  };

  await bootcamp.deleteOne();

  res
    .status(200)
    .json({
      success: true,
      data: bootcamp,
    });
});

// @desc    Upload photo for bootcamp
// @route   PUT /api/v1/bootcamps/:id/photo
// @access  Private
const bootcampPhotoUpload = asyncHandler(async function(req, res, next) {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if(!bootcamp) {
    return next(
      new ErrorResponse('Bootcamp not found with id ' + req.params.id, 404)
    );
  };

  if(!req.files) {
    return next(
      new ErrorResponse('Please upload a file', 400)
    );
  };

  const file = req.files.file;

  // Assure image is a photo
  if(!file.mimetype.startsWith('image')) {
    return next(
      new ErrorResponse('Please upload an image file', 400)
    );
  };

  // Check file size
  if(file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        'Please upload an image file less than ' + process.env.MAX_FILE_UPLOAD + 'bytes',
        400
      ));
  };

  // Create custom filename
  file.name = 'photo_' + bootcamp._id + path.parse(file.name).ext;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async function(error) {
    console.log(error);
    return next(
      new ErrorResponse(
        'Error uploading the photo',
        500
      ));
  });

  await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

  res
    .status(200)
    .json({
      success: true,
      data: file.name,
    });
});

module.exports = {
  getBootcamps: getBootcamps,
  getBootcamp: getBootcamp,
  createBootcamp: createBootcamp,
  updateBootcamp: updateBootcamp,
  deleteBootcamp: deleteBootcamp,
  bootcampPhotoUpload: bootcampPhotoUpload,
};