const express = require('express');
const dotenv = require('dotenv');

// Route files
const bootcamps = require('./routes/bootcamps.js');

// Load env vars
dotenv.config({ path: './config/config.env', });

const app = express();

// Mount Routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 6969;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));