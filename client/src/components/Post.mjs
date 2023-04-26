import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Post.css';

function Post({ email }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`http://localhost:3001/post/${id}`);
      // const response = await axios.get(`https://lijie-fit-journal.herokuapp.com/post/${id}`);

      setPost(response.data);
    };
    fetchPost();

  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Week: {post.week}</p>
      <p>Day: {post.day}</p>
      <h3>Training List</h3>
      <ul>
        {post.trainingList.items.map((item, index) => (
          <li key={index}>
            {item.checked ? (
              <del>
                {item.name} - Sets: {item.sets}, Reps: {item.reps}, Intervals: {item.intervals}
              </del>
            ) : (
              <>
                {item.name} - Sets: {item.sets}, Reps: {item.reps}, Intervals: {item.intervals}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Post;
