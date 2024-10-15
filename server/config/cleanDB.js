const mongoose = require('mongoose');
const User = require('../models/User');
const Service = require('../models/Service');
const Job = require('../models/Job');
const Review = require('../models/Review');

const cleanDB = async () => {
  try {
    await User.deleteMany({});
    await Service.deleteMany({});
    await Job.deleteMany({});
    await Review.deleteMany({});
    console.log('Database cleaned successfully');
  } catch (error) {
    console.error('Error cleaning the database:', error);
  } finally {
    mongoose.connection.close();
  }
};

module.exports = cleanDB;
