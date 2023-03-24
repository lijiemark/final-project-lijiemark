import mongoose from 'mongoose';

// users
// * our site requires authentication...
// * so users have a username and password
// * they also can have 0 or more posts
const User = new mongoose.Schema({
  username: { type: String, required: true },
  hash: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

// a single item in a training list
const TrainingListItem = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: String },
  reps: { type: String },
  intervals: { type: String },
  checked: { type: Boolean, default: false, required: true }
}, {
  _id: true
});

// a single item in a diet list
const DietListItem = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: String },
  protein: { type: String },
  carbs: { type: String },
  checked: { type: Boolean, default: false, required: true }
}, {
  _id: true
});

// a training list
// * each list must have a related user
// * a list can have 0 or more items
const TrainingList = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  createdAt: { type: Date, required: true },
  items: [TrainingListItem]
});

// a diet list
// * each list must have a related user
// * a list can have 0 or more items
const DietList = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  createdAt: { type: Date, required: true },
  items: [DietListItem]
});

// a self-evaluation review for a training or diet plan
const Review = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  score: { type: Number },
  review: { type: String },
  createdAt: { type: Date, required: true }
});

// a fitness post
// * each post must have a related user
// * a post can have 1 or more training or diet lists, and 1 review
const Post = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  week: { type: String, required: true },
  day: { type: String, required: true },
  title: { type: String, required: true },
  trainingList: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainingList' },
  dietList: { type: mongoose.Schema.Types.ObjectId, ref: 'DietList' },
  review: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
  createdAt: { type: Date, required: true }
});


// TODO: add remainder of setup for slugs, connection, registering models, etc. below

export const UserModel = mongoose.model('User', User);
export const TrainingListItemModel = mongoose.model('TrainingListItem', TrainingListItem);
export const DietListItemModel = mongoose.model('DietListItem', DietListItem);
export const TrainingListModel = mongoose.model('TrainingList', TrainingList);
export const DietListModel = mongoose.model('DietList', DietList);
export const ReviewModel = mongoose.model('Review', Review);
export const PostModel = mongoose.model('Post', Post);
