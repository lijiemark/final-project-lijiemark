import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreatePost.css';
import { useNavigate } from 'react-router-dom';

function CreatePost({ email }) {
  const navigate = useNavigate();

  console.log("in create post.mjs");
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [week, setWeek] = useState('');
  const [day, setDay] = useState('');
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`http://localhost:3001/user/${email}`);
      console.log(email);

      setUsername(response.data.username);
    };
    fetchUser();
  }, [email]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:3001/createPost', {
        email,
        title,
        content,
        week,
        day,
      }); navigate(`/userPosts/${email}`);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-post-container">
      <h1>Welcome, {username} ({email})</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="week">Week</label>
          <input
            type="text"
            id="week"
            name="week"
            value={week}
            onChange={(event) => setWeek(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="day">Day</label>
          <input
            type="text"
            id="day"
            name="day"
            value={day}
            onChange={(event) => setDay(event.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
