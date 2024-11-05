//  @desc   Get all bootcamps
//  @route  GET /api/v1/bootcamps
//  @access Public
function getBootcamps(req, res, next) {
  res
    .status(200)
    .json({
      success: true,
      msg: 'show all bootcamps',
    });
};

//  @desc   Get single bootcamp
//  @route  GET /api/v1/bootcamps/:id
//  @access Public
function getBootcamp(req, res, next) {
  res
    .status(200)
    .json({
      success: true,
      msg: 'show bootcamp ' + req.params.id,
    });
};

//  @desc   Create bootcamp
//  @route  POST /api/v1/bootcamps
//  @access Private
function createBootcamp(req, res, next) {
  res
    .status(200)
    .json({
      success: true,
      msg: 'create bootcamp',
    });
};

//  @desc   Update bootcamp
//  @route  PUT /api/v1/bootcamps/:id
//  @access Private
function updateBootcamp(req, res, next) {
  res
    .status(200)
    .json({
      success: true,
      msg: 'update bootcamp ' + req.params.id,
    });
};

//  @desc   Delete bootcamp
//  @route  DELETE /api/v1/bootcamps/:id
//  @access Private
function deleteBootcamp(req, res, next) {
  res
    .status(200)
    .json({
      success: true,
      msg: 'delete bootcamp ' + req.params.id,
    });
};

module.exports = {
  getBootcamps: getBootcamps,
  getBootcamp: getBootcamp,
  createBootcamp: createBootcamp,
  updateBootcamp: updateBootcamp,
  deleteBootcamp: deleteBootcamp,
};