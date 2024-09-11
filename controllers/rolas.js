// @desc    Get all rolas
// @route   GET /api/v1/rolas
// @access  Public
function getRolas(req, res, next) {
  res
    .status(200)
    .json({
      success: true,
      msg: 'Show all rolas',
    });
};

// @desc    Get a single rola
// @route   GET /apí/v1/rolas/:id
// @access  Public
function getRola(req, res, next) {
  res
  .status(200)
  .json({
    success: true,
    msg: 'Show rola #' + req.params.id,
  });
};

// @desc    Create a new rola
// @route   POST /api/v1/rolas
// @access  Private
function createRola(req, res, next) {
  res
    .status(201)
    .json({
      success: true,
      msg: 'Rola created',
    });
};

// @desc    Update rola
// @route   PUT /api/v1/rolas/:id
// @access  Private
function updateRola(req, res, next) {
  res
    .status(201)
    .json({
      success: true,
      msg: 'Rola #' + req.params.id + ' updated!',
    });
};

// @desc    Delete rola
// @route   DELETE /api/v1/rolas/:id
// @access  Private
function deleteRola(req, res, next) {
  res
    .status(201)
    .json({
      success: true,
      msg: 'Rola #' + req.params.id + ' deleted',
    });
};

module.exports = {
  getRolas: getRolas,
  getRola: getRola,
  createRola: createRola,
  updateRola: updateRola,
  deleteRola: deleteRola,
};