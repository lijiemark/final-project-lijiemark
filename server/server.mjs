import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { signup } from './auth.mjs';
import { login } from './auth.mjs';
import { logout } from './auth.mjs';
import { UserModel } from './db.mjs';
import { PostModel } from './db.mjs';
import { TrainingListModel } from './db.mjs';

import { createUserPost, getUserPosts, getUser } from './db.mjs';

// import homeRouter from './home.mjs';


import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getPostsByUser(userId) {
  const posts = await PostModel.find({ userId });
  return posts;
}
app.use('/api', router);
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  const allowedOrigins = [
    'https://final-project-lijiemark-6kyp6dtu6-lijiemark.vercel.app',
    'http://localhost:3000',
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.get('/', (req, res) => {
  res.send('Home');
});
// Route for the signup endpoint
app.post('/signup', signup);

// Route for the login endpoint
app.post('/login', login);

app.post('/createPost', createUserPost);
app.get('/user/:email', getUser);
app.get('/posts/:email', getUserPosts);
app.get('/post/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findById(id)
      .populate('trainingList')
      .populate('dietList')
      .populate('review');
    res.status(200).json(post);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send({ error: 'Server error: Unable to get post' });
  }
});
app.get('/editpost/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const post = await PostModel.findById(id).populate('trainingList');
    res.status(200).json(post);
  } catch (error) {
    console.error('Server error:', error);
    console.log("we're trying to get the post");

    res.status(500).send({ error: 'Server error: Unable to get post' });
  }
});

app.put('/editpost/:id', async (req, res) => {
  const { title, content, trainingList } = req.body;

  try {
    const post = await PostModel.findById(req.params.id);
    post.title = title;
    post.content = content;
    await post.save();

    if (trainingList) {
      const trainingListToUpdate = await TrainingListModel.findById(post.trainingList);
      trainingListToUpdate.items = trainingList;
      await trainingListToUpdate.save();
    }

    res.status(200).send({ message: 'Post and training list updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to update post and training list' });
  }
});


app.delete('/deletePost/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await PostModel.findByIdAndDelete(id);
    res.status(200).send({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send({ error: 'Server error: Unable to delete post' });
  }
});
// Use the home router for the user home page
// app.get('/home', homeRouter);
// // Route for creating a new post
// app.post('/users/:slug/posts', createPost);

// // Route for displaying all posts for a user
// app.get('/users/:slug', async (req, res) => {
//   try {
//     // Find the user based on the slug
//     const user = await UserModel.findOne({ slug: req.params.slug });
//     console.log("here", user);
//     // Find all the posts for the user
//     const posts = await getPostsByUser(user._id);

//     // Render the user home page with the posts data
//     res.render('home', { user, posts });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });


app.post('/login', login);

app.post('/signup', signup);
app.get('/logout', logout);


const port = process.env.PORT || 3001;

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../my-app/build')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../my-app/build', 'index.html'));
//   });
// }

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
