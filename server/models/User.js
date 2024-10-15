const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  phone: String,
  location: String,
  bio: String,
  role: { type: String, enum: ['client', 'worker'], default: 'client' },
  services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});

module.exports = mongoose.model('User', userSchema);
