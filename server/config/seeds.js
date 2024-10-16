const db = require('./connection');
const { User, Service, Job, Review } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  // Clean the collections
  await cleanDB('User', 'users');
  await cleanDB('Service', 'services');
  await cleanDB('Job', 'jobs');
  await cleanDB('Review', 'reviews');

  // Insert seed data for Users
  const users = await User.insertMany([
    { firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'worker' },
    { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', role: 'client' }
  ]);

  console.log('users seeded');

  // Insert seed data for Services
  const services = await Service.insertMany([
    {
      title: 'Plumbing',
      description: 'Fix leaks',
      price: 50,
      worker: users[0]._id // John Doe is the worker
    }
  ]);

  console.log('services seeded');

  // Insert seed data for Jobs
  const jobs = await Job.insertMany([
    {
      client: users[1]._id, // Jane Smith is the client
      service: services[0]._id, // Plumbing service
      scheduleDate: new Date()
    }
  ]);

  console.log('jobs seeded');

  // Insert seed data for Reviews
  const reviews = await Review.insertMany([
    {
      client: users[1]._id, // Jane Smith
      worker: users[0]._id, // John Doe
      rating: 5,
      review: 'Great work!'
    }
  ]);

  console.log('reviews seeded');

  // Close the database connection
  process.exit();
});
