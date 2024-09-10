const express = require('express');
const dotenv = require('dotenv');

// Route files
const rolas = require('./routes/rolas.js');

const path = require('path');

const PORT = process.env.PORT || 6969;

//load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

// Mount routers
app.use('/api/v1/rolas', rolas);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);