const { User, Service, Job, Review } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { role }) => {
      const filter = role ? { role } : {};
      return await User.find(filter).populate('services reviews');
    },
    // user: async (parent, { id }) => {
    //   return await User.findById(id).populate('services reviews');
    // },
    service: async () => {
      return await Service.find().populate('worker');
    },
    job: async (parent, { clientId }) => {
      const filter = clientId ? { client: clientId } : {};
      return await Job.find(filter).populate('service client');
    },
    review: async () => {
      return await Review.find().populate('client worker');
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addService: async (parent, { title, description, price, workerId }) => {
      const service = new Service({ title, description, price, worker: workerId });
      return await service.save();
    },
    addJob: async (parent, { clientId, serviceId, scheduleDate }) => {
      const job = new Job({ client: clientId, service: serviceId, scheduleDate });
      return await job.save();
    },
    addReview: async (parent, { clientId, workerId, rating, review }) => {
      const newReview = new Review({ client: clientId, worker: workerId, rating, review });
      return await newReview.save();
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw AuthenticationError;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Invalid email or password');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Invalid email or password');
      }

      const token = signToken(user);

      return { token, user };
    },
  }
};

module.exports = resolvers;
