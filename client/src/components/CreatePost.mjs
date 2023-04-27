import React, { useState, useContext } from 'react';
import axios from 'axios';
import './CreatePost.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.mjs';

function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user, setUser } = useContext(UserContext);
  // console.log(user);
  const [showAlert, setShowAlert] = useState(false);


  const [week, setWeek] = useState('');
  const [day, setDay] = useState('');
  const [trainingListItems, setTrainingListItems] = useState([{ name: '', sets: '', reps: '', intervals: '', checked: false }]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (trainingListItems.length === 0 || trainingListItems.some(item => !item.name)) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    try {
      await axios.post('http://localhost:3001/createPost', {
        title: title,
        content: content,
        email: user.email,
        week: week,
        day: day,
        trainingListItems: trainingListItems
      });
      setTitle('');
      setContent('');
      navigate('/userPosts');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-post-container">
      <h1>Write down today's journal... {user.username}!</h1>
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
        <div className="form-group">
          <label htmlFor="trainingList">Training List</label>
          {trainingListItems.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Training item"
                value={item.name}
                onChange={(e) =>
                  setTrainingListItems([
                    ...trainingListItems.slice(0, index),
                    { ...item, name: e.target.value },
                    ...trainingListItems.slice(index + 1),
                  ])
                }
              />
              <input
                type="text"
                placeholder="Sets"
                value={item.sets}
                onChange={(e) =>
                  setTrainingListItems([
                    ...trainingListItems.slice(0, index),
                    { ...item, sets: e.target.value },
                    ...trainingListItems.slice(index + 1),
                  ])
                }
              />
              <input
                type="text"
                placeholder="Reps"
                value={item.reps}
                onChange={(e) =>
                  setTrainingListItems([
                    ...trainingListItems.slice(0, index),
                    { ...item, reps: e.target.value },
                    ...trainingListItems.slice(index + 1),
                  ])
                }
              />
              <input
                type="text"
                placeholder="Intervals"
                value={item.intervals}
                onChange={(e) =>
                  setTrainingListItems([
                    ...trainingListItems.slice(0, index),
                    { ...item, intervals: e.target.value },
                    ...trainingListItems.slice(index + 1),
                  ])
                }
              />
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(e) =>
                  setTrainingListItems([
                    ...trainingListItems.slice(0, index),
                    { ...item, checked: e.target.checked },
                    ...trainingListItems.slice(index + 1),
                  ])
                }
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setTrainingListItems([
                ...trainingListItems,
                { name: '', sets: '', reps: '', intervals: '', checked: false },
              ])
            }
          >
            Add Item
          </button>
        </div>
        <button type="submit">Submit Post</button>

      </form>
      {showAlert && (
        <div className="alert-box">
          Please enter at least one training item!
        </div>
      )}
    </div>

  );
}

export default CreatePost;
