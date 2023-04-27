import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext.mjs';
import axios from 'axios';
import './UserPosts.css';
import { Link } from 'react-router-dom';


function UserPosts() {
  // const { email } = useParams();
  const { user } = useContext(UserContext);
  const email = user.email;

  const [posts, setPosts] = useState([]);
  const handleDelete = async (postId) => {
    try {
      // await axios.delete(`http://localhost:3001/deletePost/${postId}`);
      await axios.delete(`https://lijie-fit-journal.herokuapp.com/deletePost/${postId}`);

      // Filter out the deleted post from the posts state
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error(error);
    }
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const filteredPosts = posts.filter((post) => {
    // const postDate = new Date(post.createdAt).toLocaleDateString();
    // console.log(post.title)
    // console.log(postDate);
    // console.log(formatDate(new Date(post.createdAt)));
    const formatedDate = formatDate(new Date(post.createdAt));
    // console.log(selectedDate);
    // console.log(new Date(post.createdAt).toISOString().slice(0, 10));

    const matchTitle = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDate = !selectedDate ||
      formatedDate === selectedDate;
    //   console.log(matchTitle && matchDate)
    // console.log("-----------")
    return matchTitle && matchDate;
  });


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    // console.log("Date is", e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      // const response = await axios.get(`http://localhost:3001/posts/${email}`);
      const response = await axios.get(`https://lijie-fit-journal.herokuapp.com/posts/${email}`);
      const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(sortedPosts);
    };
    fetchPosts();
  }, [email]);
  useEffect(() => {
    // console.log("in here!");
    // console.log(user);
    if (user) {
      // console.log("Saving user to localStorage:", user);
      // console.log("here!!!!!!!!!!!!!!!!!!!");
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("lastActive", Date.now());
    }
  }, [user]);

  return (
    <div className="user-posts">
      <h1>{(user.username)}'s Posts</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={handleSearch}
        />
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          timeZone="local"
        />
      </div>
      <table className="posts-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post) => (
            <tr key={post._id}>
              <td>
                <Link to={`/post/${post._id}`}>{post.title}</Link>
              </td>
              <td>{new Date(post.createdAt).toLocaleString()}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(post._id)}>
                  Delete
                </button>
                <Link to={`/edit-post/${post._id}`}>
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