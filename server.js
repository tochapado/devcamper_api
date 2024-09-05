const express = require('express');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 6969;

//load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);