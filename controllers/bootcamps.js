const Bootcamp = require('../models/Bootcamp.js');

//  @desc   Get all bootcamps
//  @route  GET /api/v1/bootcamps
//  @access Public
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
  } catch(err) {
    res
      .status(400)
      .json({
        success: false,
        error: err,
      })
  };
};

//  @desc   Get single bootcamp
//  @route  GET /api/v1/bootcamps/:id
//  @access Public
async function getBootcamp(req, res, next) {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if(!bootcamp) {
      return res.status(400).json({ success: false });
    };

    res
      .status(200)
      .json({
        success: true,
        data: bootcamp,
      });
  } catch(err) {
    res
      .status(400)
      .json({
        success: false,
        error: err,
      });
  };
};

//  @desc   Create bootcamp
//  @route  POST /api/v1/bootcamps
//  @access Private
async function createBootcamp(req, res, next) {
  try {
    const bootcamp = await Bootcamp.create(req.body);
  
    res
      .status(201)
      .json({
        success: true,
        data: bootcamp,
      });
  } catch(err) {
    res
      .status(400)
      .json({
        success: false,
        error: err,
      });
  };
};

//  @desc   Update bootcamp
//  @route  PUT /api/v1/bootcamps/:id
//  @access Private
async function updateBootcamp(req, res, next) {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
  
    if(!bootcamp) {
      return res.status(400).json({ success: false });
    };
  
    res
      .status(200)
      .json({
        success: true,
        data: bootcamp,
      });

  } catch(err) {
    res
      .status(400)
      .json({
        success: false,
        error: err,
      })
  };
};

//  @desc   Delete bootcamp
//  @route  DELETE /api/v1/bootcamps/:id
//  @access Private
async function deleteBootcamp(req, res, next) {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  
    if(!bootcamp) {
      return res.status(400).json({ success: false });
    }
  
    res
      .status(200)
      .json({
        success: true,
        msg: 'Bootcamp deleted..',
        data: bootcamp,
      });

  } catch(err) {
    res
      .status(400)
      .json({
        success: false,
        error: err,
      });
  };
};

module.exports = {
  getBootcamps: getBootcamps,
  getBootcamp: getBootcamp,
  createBootcamp: createBootcamp,
  updateBootcamp: updateBootcamp,
  deleteBootcamp: deleteBootcamp,
};