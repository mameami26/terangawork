const User = require('../models/User');
const Service = require('../models/Service');
const Job = require('../models/Job');
const Review = require('../models/Review');

const resolvers = {
  Query: {
    getUsers: async (_, { role }) => {
      const filter = role ? { role } : {};
      return await User.find(filter).populate('services reviews');
    },
    getUser: async (_, { id }) => {
      return await User.findById(id).populate('services reviews');
    },
    getServices: async () => {
      return await Service.find().populate('worker');
    },
  },
  Mutation: {
    createUser: async (_, { firstName, lastName, email, password }) => {
      const user = new User({ firstName, lastName, email, password });
      return await user.save();
    },
    createService: async (_, { title, description, price, workerId }) => {
      const service = new Service({ title, description, price, worker: workerId });
      return await service.save();
    },
    createJob: async (_, { clientId, serviceId, scheduleDate }) => {
      const job = new Job({ client: clientId, service: serviceId, scheduleDate });
      return await job.save();
    },
    createReview: async (_, { clientId, workerId, rating, review }) => {
      const newReview = new Review({ client: clientId, worker: workerId, rating, review });
      return await newReview.save();
    },
  }
};

module.exports = resolvers;
