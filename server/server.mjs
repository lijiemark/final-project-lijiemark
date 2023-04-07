import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { signup } from './auth.mjs';
import { login } from './auth.mjs';
import { logout } from './auth.mjs';
import { UserModel } from './db.mjs';
import { PostModel } from './db.mjs';
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
app.use(cors({ origin: 'https://final-project-lijiemark-6kyp6dtu6-lijiemark.vercel.app/', credentials: true }));

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

app.delete('/deletePost/:id', async (req, res) => {
  try {
    const { id } = req.params;
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
