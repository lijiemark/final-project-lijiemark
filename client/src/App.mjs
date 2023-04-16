import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.mjs';
import SignUp from './components/SignUp.mjs';
import Home from './components/Home.mjs';
import CreatePost from './components/CreatePost.mjs';
import UserPosts from './components/UserPosts.mjs';
import EditPost from './components/EditPost.mjs';
import Post from './components/Post.mjs';
import { useParams } from 'react-router-dom';
import Navbar from './components/Navbar.mjs';
import { UserContextProvider } from './context/UserContext.mjs';

function EmailRouteWrapper({ children, ...rest }) {
  const { email } = useParams();
  return React.cloneElement(children, { email, ...rest });
}
function App() {
  return (
    <Router>
      <UserContextProvider>
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/home/:email" element={<Home />} />
          <Route
            path="/createPost/:email"
            element={
              <EmailRouteWrapper>
                <CreatePost />
              </EmailRouteWrapper>
            }
          />
          <Route
            path="/post/:id/:email"
            element={
              <EmailRouteWrapper>
                <Post />
              </EmailRouteWrapper>
            }
          />

          <Route
            path="/edit-post/:id/:email"
            element={<EmailRouteWrapper>
              <EditPost />
            </EmailRouteWrapper>}
          />
          <Route
            path="/userPosts/:email"
            element={
              <EmailRouteWrapper>
                <UserPosts />
              </EmailRouteWrapper>
            }
          />

          {/* Add other routes here */}
        </Routes>
      </UserContextProvider>

    </Router>
  )
}

export default App