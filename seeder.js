const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load ENV vars
dotenv.config({
  path: './config/config.env',
});

// Load models
const Bootcamp = require('./models/Bootcamp.js');
const Course = require('./models/Course.js');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(__dirname + '/_data/bootcamps.json', 'utf-8'));
const courses = JSON.parse(fs.readFileSync(__dirname + '/_data/courses.json', 'utf-8'));

// Import into DB
const importData = async function() {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);

    console.log('Data imported..');
    process.exit();
  } catch(err) {
    console.log(err);
  };
};

// Delete data
const deleteData = async function() {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();

    console.log('Data destroyed..');
    process.exit();
  } catch(err) {
    console.log(err);
  };
};

if(process.argv[2] === '-i') {
  importData();
} else if(process.argv[2] === '-d') {
  deleteData();
};