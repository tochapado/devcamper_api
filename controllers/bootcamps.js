const Bootcamp = require('../models/Bootcamp.js');

// @desc    Get all Bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
async function getBootcamps(req, res, next) {
  try {
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({
        success: true,
        count: bootcamps.length,
        data: bootcamps,
      });
  } catch(error) {
    res
      .status(400)
      .json({
        success: false,
      });
  };
};

// @desc    Get a single Bootcamp
// @route   GET /apí/v1/bootcamps/:id
// @access  Public
async function getBootcamp(req, res, next) {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    
    if(!bootcamp) {
      return res
        .status(400)
        .json({
          success: false,
        });
    };

    res
      .status(200)
      .json({
        success: true,
        data: bootcamp,
      });
  } catch(error) {
    res
      .status(400)
      .json({
        success: false,
      });
  };
};

// @desc    Create a new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
async function createBootcamp(req, res, next) {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res
      .status(201)
      .json({
        success: true,
        data: bootcamp,
      });
  } catch(error) {
    res
      .status(400)
      .json({
        success: false,
      });
  };
};

// @desc    Update Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
async function updateBootcamp(req, res, next) {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
  
    if(!bootcamp) {
      return res
        .status(400)
        .json({
          success: false,
        });
    };
  
    res
      .status(200)
      .json({
        success: true,
        data: bootcamp,
      });

  } catch(error) {
    res
      .status(400)
      .json({
        success: false,
      });
  };
};

// @desc    Delete Bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
async function deleteBootcamp(req, res, next) {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if(!bootcamp) {
      return res
        .status(400)
        .json({
          success: false,
        });
    };

    res
      .status(200)
      .json({
        success: true,
        data: bootcamp,
      });
  } catch(error) {
    res
      .status(400)
      .json({
        success: false,
      });
  }
};

module.exports = {
  getBootcamps: getBootcamps,
  getBootcamp: getBootcamp,
  createBootcamp: createBootcamp,
  updateBootcamp: updateBootcamp,
  deleteBootcamp: deleteBootcamp,
};