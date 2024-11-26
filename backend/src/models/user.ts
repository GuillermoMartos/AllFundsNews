import mongoose from 'mongoose';
import { userCategoriesNews } from '../helpers/constants';
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  archivedNewsIds: [
    {
      type: String,
    },
  ],
  deletedNewsIds: [
    {
      type: String,
    },
  ],
  userRangeOfInterestDate: {
    highestDateOfNew: {
      type: Date,
      default: Date.now(),
    },
    lowestDateOfNew: {
      type: Date,
      default: Date.now(),
    },
  },
  searchStrategy: {
    type: Array,
    default: userCategoriesNews,
  },
});

userSchema.index({
  archivedNewsIds: 1,
});
userSchema.index({
  deletedNewsIds: 1,
});

export const User = mongoose.model('User', userSchema);
