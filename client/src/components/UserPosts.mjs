import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserPosts.css';

function UserPosts({ email }) {
  const [posts, setPosts] = useState([]);
  const handleDelete = async (postId) => {
    try {
      // await axios.delete(`http://localhost:3001/deletePost/${postId}`);
      await axios.delete(`${process.env.REACT_APP_API_URL}/deletePost/${postId}`);

      // Filter out the deleted post from the posts state
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      // const response = await axios.get(`http://localhost:3001/posts/${email}`);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${email}`);

      setPosts(response.data);
    };
    fetchPosts();
  }, [email]);

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
              <td>{post.title}</td>
              <td>{post.content}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(post._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserPosts;
