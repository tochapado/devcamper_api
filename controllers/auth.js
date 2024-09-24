const ErrorResponse = require('../utils/errorResponse.js');
const asyncHandler = require('../middleware/async.js');
const User = require('../models/User.js');

// @desc    Resgister user
// @route   POST /api/v1/auth/register
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

  // Create token
  const token = user.getSignedJwtToken();

  res
    .status(200)
    .json({ success: true, token: token, user: user });
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
const login = asyncHandler(async function(req, res, next) {
  const { email, password } = req.body;

  // Validate email & password
  if(!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  };

  // Check for user
  const user = await User
    .findOne({ email: email })
    .select('+password');

  if(!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  };

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if(!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  };

  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token: token, user: user });
});

module.exports = {
  register: register,
  login: login,
};