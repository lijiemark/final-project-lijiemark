import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from './db.mjs';
import dotenv from 'dotenv';

dotenv.config();
export async function signup(req, res) {
  const { username, email, password } = req.body;
  console.log("you made it to signup post route", username);

  // Generate salt and hash password
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  // Create new user object
  const newUser = new UserModel({
    username: username,
    email: email,
    hash: hash,
  });

  try {
    // Save user object to database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log('saved user', username);
  } catch (err) {
    console.log("here");
    res.status(400).json({ message: err.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  console.log("you're logging in babe");

  // Check if user with the given email exists
  const user = await UserModel.findOne({ email });
  console.log("here?");
  console.log(user);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Check if password is correct
  const isMatch = await bcrypt.compare(password, user.hash);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  console.log("welcome!!!")

  // Create a JWT and send it to the client
  // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  // // res.json({ token });
  // // Set the token as a cookie
  // res.cookie('jwt', token, { httpOnly: true });

  // Send a success status and the email
  res.status(200).json({ email: user.email });
}

export function logout(req, res) {
  // Clear the JWT token cookie
  res.clearCookie('jwt');

  // Redirect to the login page
  res.redirect('/login');
}
