const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  scheduleDate: Date,
  createdAt: { type: Date, default: Date.now }
});
const Job = mongoose.model('Job', jobSchema);
module.exports = Job;


