import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    unique: true,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Url = mongoose.model('Url', UrlSchema);

export default Url;
