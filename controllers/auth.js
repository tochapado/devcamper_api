const ErrorResponse = require('../utils/errorResponse.js');
const asyncHandler = require('../middleware/async.js');
const User = require('../models/User.js');

// @desc    Resgister user
// @route   GET /api/v1/auth/register
// @access  Public
const register = asyncHandler(async function(req, res, next) {
  const { name, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res
    .status(200)
    .json({ success: true, data: user });
});

module.exports = {
  register: register,
};