import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.mjs';
import SignUp from './components/SignUp.mjs';
import Home from './components/Home.mjs';
import CreatePost from './components/CreatePost.mjs';
import UserPosts from './components/UserPosts.mjs';
import EditPost from './components/EditPost.mjs';
import Post from './components/Post.mjs';
import Navbar from './components/Navbar.mjs';
import { UserContextProvider } from './context/UserContext.mjs';
import PrivateRoute from "./components/PrivateRoute.mjs";
import MyAccount from './components/MyAccount.mjs';

import './App.css';

function App() {
  return (
    <Router>
      <UserContextProvider>
        <div className="app-container">

          <Navbar />
          <div className="content-container">

            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/home/:email" element={<Home />} />
              {/* <Route path="/createPost/:email" element={<PrivateRoute><CreatePost /></PrivateRoute>} /> */}
              <Route path="/createPost" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
              {/* <Route path="/userPosts/:email" element={<PrivateRoute><UserPosts /></PrivateRoute>} /> */}
              <Route path="/userPosts" element={<PrivateRoute><UserPosts /></PrivateRoute>} />
              <Route path="/post/:id/" element={<PrivateRoute><Post /></PrivateRoute>} />
              <Route path="/edit-post/:id" element={<PrivateRoute><EditPost /></PrivateRoute>} />
              <Route path="/myAccount" element={<PrivateRoute><MyAccount /></PrivateRoute>} />

            </Routes>
          </div>
        </div>

      </UserContextProvider>
    </Router>
  );
}
export default App


