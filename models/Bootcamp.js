const mongoose = require('mongoose');

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name!'],
    unique: true,
    trim: true,
    maxlength: [69, 'Name cant be more than 69 chars!'],
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description!'],
    maxlength: [420, 'Description cant be more than 420 chars!'],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please add a valid URL with HTTP or HTTPS!'
    ],
  },
  phone: {
    type: String,
    maxLength: [20, 'Phone number cant be longer than 20 chars!'],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email!'
    ],
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
  },
  location: {
    // GeoJSON point
    type: {
      type: String,
      enum: ['Point'],
      // required: true,
    },
    coordinates: {
      type: [Number],
      // required: true,
      index: '2dsphere',
    },
    formattedAdress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    // Array of strings
    type: [String],
    required: true,
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Other'
    ],
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating must cant be more than 10'],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Bootcamp', BootcampSchema);