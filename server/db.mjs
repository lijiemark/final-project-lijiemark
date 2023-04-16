import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();
console.log('Waiting for connection to database...')
try {
  // await mongoose.connect('mongodb://localhost/fitJournal', { useNewUrlParser: true });
  //connect to mongo atlas
  // console.log('MONGO_URI:', process.env.MONGO_URI)
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
  console.log('Successfully connected to database.')
} catch (err) {
  console.log('ERROR: ', err);
}


// users
// * our site requires authentication...
// * so users have a username and password
// * they also can have 0 or more posts
const User = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
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
  content: { type: String, required: true },
  trainingList: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainingList' },
  dietList: { type: mongoose.Schema.Types.ObjectId, ref: 'DietList' },
  review: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
  createdAt: { type: Date, required: true }
});


// TODO: add remainder of setup for slugs, connection, registering models, etc. below
// Add the following functions

// export async function createUserPost(req, res) {
//   const { email, title, content, week, day } = req.body;
//   console.log("Request body:", req.body);

//   try {
//     const user = await UserModel.findOne({ email });
//     console.log("Found user:", user);

//     const newPost = new PostModel({
//       user: user._id,
//       title: title,
//       content: content,
//       week: week,
//       day: day,
//       createdAt: new Date(),
//     });
//     console.log("New post:", newPost);

//     const savedPost = await newPost.save();
//     console.log("Saved post:", savedPost);
//     res.status(201).json(savedPost);
//   } catch (err) {
//     console.log("Error caught:", err);
//     res.status(400).json({ message: err.message });
//   }
// }
export async function createUserPost(req, res) {
  const { email, title, content, week, day, trainingListItems } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    const newTrainingList = new TrainingListModel({
      user: user._id,
      name: `Training List for Week ${week}, Day ${day}`,
      createdAt: new Date(),
      items: trainingListItems.map((item) => ({
        name: item.name,
        sets: item.sets,
        reps: item.reps,
        intervals: item.intervals,
        checked: false,
      })),
    });

    const newPost = new PostModel({
      user: user._id,
      title: title,
      content: content,
      week: week,
      day: day,
      trainingList: newTrainingList._id,
      createdAt: new Date(),
    });

    const savedTrainingList = await newTrainingList.save();
    const savedPost = await newPost.save();

    res.status(201).json({
      post: savedPost,
      trainingList: savedTrainingList,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}


export async function getUserPosts(req, res) {
  try {
    const user = await UserModel.findOne({ email: req.params.email });
    const posts = await PostModel.find({ user: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getUser(req, res) {
  try {
    const user = await UserModel.findOne({ email: req.params.email });
    console.log("i'm here getting the user.");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const UserModel = mongoose.model('User', User);
export const TrainingListItemModel = mongoose.model('TrainingListItem', TrainingListItem);
export const DietListItemModel = mongoose.model('DietListItem', DietListItem);
export const TrainingListModel = mongoose.model('TrainingList', TrainingList);
export const DietListModel = mongoose.model('DietList', DietList);
export const ReviewModel = mongoose.model('Review', Review);
export const PostModel = mongoose.model('Post', Post);
