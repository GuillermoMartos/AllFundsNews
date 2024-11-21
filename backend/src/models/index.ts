import mongoose from 'mongoose';
import { userSchema } from './user';
import { articleSchema } from './article';

export const User = mongoose.model('User', userSchema);
export const Article = mongoose.model('Article', articleSchema);
