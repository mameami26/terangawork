const mongoose = require('mongoose');
const User = require('../models/User');
const Service = require('../models/Service');
const Job = require('../models/Job');
const Review = require('../models/Review');

const seedDatabase = async () => {
  // Clear existing data
  await User.deleteMany({});
  await Service.deleteMany({});
  await Job.deleteMany({});
  await Review.deleteMany({});

  // Create seed users, services, jobs, reviews
  const worker1 = await new User({ firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'worker' }).save();
  const client1 = await new User({ firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', role: 'client' }).save();

  const service1 = await new Service({ title: 'Plumbing', description: 'Fix leaks', price: 50, worker: worker1._id }).save();
  const job1 = await new Job({ client: client1._id, service: service1._id, scheduleDate: new Date() }).save();

  const review1 = await new Review({ client: client1._id, worker: worker1._id, rating: 5, review: 'Great work!' }).save();

  console.log('Database seeded successfully!');
  mongoose.connection.close();
};

seedDatabase();
