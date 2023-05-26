import mongoose from 'mongoose';

const account = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  slug: { type: String },
  tags: [
    { type: String },
  ],
  activated: { type: Boolean },
  deleted: { type: Boolean },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  createdBy: { type: String },
  updatedBy: { type: String },
});

export default mongoose.model('Account', account);
