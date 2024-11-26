const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db.js');
const errorHandler = require('./middleware/error.js');

// Load env vars
dotenv.config({ path: './config/config.env', });

// Connect to database
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps.js');
const courses = require('./routes/courses.js');

const app = express();

//////////////// APP USES /////////////////////////////

// Body parser
app.use(express.json());

// File uploader
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount Routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

// Error middleware
app.use(errorHandler);

//////////////////////////////////////////////////////

const PORT = process.env.PORT || 6969;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', function(err, promise) {
  console.log('Error: ' + err.message);

  // CLose server & exit process
  server.close(function() {
    return process.exit(1);
  });
});