const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db.js');

//load env vars
dotenv.config({ path: './config/config.env' });

connectDB();

// Route files
const bootcamps = require('./routes/bootcamps.js');

const PORT = process.env.PORT || 6969;

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

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