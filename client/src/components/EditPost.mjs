import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams
import { useNavigate } from 'react-router-dom';
import './EditPost.css';

function EditPost({ history }) {
  const navigate = useNavigate();
  const [trainingList, setTrainingList] = useState([]);
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { id } = useParams(); // Get the id and email directly from useParams

  useEffect(() => {
    const fetchPost = async () => {
      // console.log(id);
      // console.log(email);
      // const response = await axios.get(`http://localhost:3001/editpost/${id}`);
      const response = await axios.get(`https://lijie-fit-journal.herokuapp.com/editpost/${id}`);

      setPost(response.data);
      setTitle(response.data.title);
      setContent(response.data.content);
      setTrainingList(response.data.trainingList.items);
    };

    fetchPost();
  }, [id]);
  const handleCheckItem = (index) => {
    const updatedTrainingList = [...trainingList];
    updatedTrainingList[index].checked = !updatedTrainingList[index].checked;
    setTrainingList(updatedTrainingList);
  };

  const handleDeleteItem = (index) => {
    const updatedTrainingList = [...trainingList];
    updatedTrainingList.splice(index, 1);
    setTrainingList(updatedTrainingList);
  };

  const handleAddItem = () => {
    const updatedTrainingList = [...trainingList, {
      name: '',
      sets: '',
      reps: '',
      intervals: '',
      checked: false
    }];
    setTrainingList(updatedTrainingList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // await axios.put(`http://localhost:3001/editpost/${post._id}`, { title, content, trainingList });
      await axios.put(`https://lijie-fit-journal.herokuapp.com/editpost/${post._id}`, { title, content, trainingList });

      navigate(`/userPosts`); // Replace with the route where you display the user posts
    } catch (error) {
      console.error(error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="edit-container">

        <h1>Edit Post</h1>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <label>Training List:</label>
          <ul>
            {trainingList.map((item, index) => (
              <li key={index}>
                <span>Done?   </span>

                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheckItem(index)}
                />
                <br></br>
                <br></br>
                <span>Exercise Name: </span>
                <input
                  type="text"
                  value={item.name}
                  placeholder="Exercise Name"
                  onChange={(e) => {
                    const updatedTrainingList = [...trainingList];
                    updatedTrainingList[index].name = e.target.value;
                    setTrainingList(updatedTrainingList);
                  }}
                />
                <span>Sets: </span>
                <input
                  type="text"
                  value={item.sets}
                  placeholder="Sets"
                  onChange={(e) => {
                    const updatedTrainingList = [...trainingList];
                    updatedTrainingList[index].sets = e.target.value;
                    setTrainingList(updatedTrainingList);
                  }}
                />
                <span>Reps: </span>
                <input
                  type="text"
                  value={item.reps}
                  placeholder="Reps"
                  onChange={(e) => {
                    const updatedTrainingList = [...trainingList];
                    updatedTrainingList[index].reps = e.target.value;
                    setTrainingList(updatedTrainingList);
                  }}
                />
                <span>Intervals: </span>
                <input
                  type="text"
                  value={item.intervals}
                  placeholder="Intervals"
                  onChange={(e) => {
                    const updatedTrainingList = [...trainingList];
                    updatedTrainingList[index].intervals = e.target.value;
                    setTrainingList(updatedTrainingList);
                  }}
                />
                <button className="button delete" type="button" onClick={() => handleDeleteItem(index)}>Delete</button>
              </li>
            ))}
          </ul>
          <button className="button add" type="button" onClick={handleAddItem}>Add Item</button>
          <button className="button" type="submit">Save</button>
        </form>
      </div>

    </div>
  );
}

export default EditPost;
