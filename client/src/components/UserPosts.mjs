import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext.mjs';

import axios from 'axios';
import './UserPosts.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function UserPosts({ }) {
  // const { email } = useParams();
  const { user } = useContext(UserContext);
  const email = user.email;

  const [posts, setPosts] = useState([]);
  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:3001/deletePost/${postId}`);
      // await axios.delete(`https://lijie-fit-journal.herokuapp.com/deletePost/${postId}`);

      // Filter out the deleted post from the posts state
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`http://localhost:3001/posts/${email}`);
      // const response = await axios.get(`https://lijie-fit-journal.herokuapp.com/posts/${email}`);
      setPosts(response.data);
    };
    fetchPosts();
  }, [email]);
  useEffect(() => {
    console.log("in here!");
    console.log(user);
    if (user) {
      console.log("Saving user to localStorage:", user);
      console.log("here!!!!!!!!!!!!!!!!!!!");
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("lastActive", Date.now());
    }
  }, [user]);

  return (
    <div className="user-posts">
      <h1>User Posts</h1>
      <table className="posts-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>
                <Link to={`/post/${post._id}/${email}`}>{post.title}</Link>
              </td>              <td>{post.content}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(post._id)}>
                  Delete
                </button>
                <Link to={`/edit-post/${post._id}/${email}`}>
                  <button className="edit-button">Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserPosts;
