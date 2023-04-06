import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { signup } from './auth.mjs';
import { login } from './auth.mjs';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/api', router);
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Home');
});
// Route for the signup endpoint

app.get('/signup', (req, res) => {
  res.send('sign up page');
});

app.get('/login', (req, res) => {
  res.send('log in page');
});


app.post('/login', login);

app.post('/signup', signup);


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
