const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db.js');
const errorHandler = require('./middleware/error.js');

//load env vars
dotenv.config({ path: './config/config.env' });

connectDB();

// Route files
const bootcamps = require('./routes/bootcamps.js');
const courses = require('./routes/courses.js');
const auth = require('./routes/auth.js');

const PORT = process.env.PORT || 6969;

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
};

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);

// Error handler middleware
app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promisses rejections
process.on('unhandledRejection', function(err, promise) {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(function() {
    return process.exit(1);
  });
});