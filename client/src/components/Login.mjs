import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext.mjs';


function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', {
        // const response = await axios.post('https://lijie-fit-journal.herokuapp.com/login', {

        email: email,
        password: password,
      });
      console.log(email);

      console.log("here's the response:");
      console.log(response.data);
      if (response.status === 200) {
        console.log("here before creating the post");
        console.log(email);
        setUser({ username: response.data.username, email: response.data.email });
        console.log("User set:", user);
        console.log("setUser called");
        // setTimeout(() => {
        //   navigate(`/userPosts`);
        // }, 1000);
        navigate(`/userPosts`);

      } else {
        // Handle unsuccessful authentication (e.g., display an error message)
        console.error("Authentication failed.");
      }
    } catch (error) {
      console.error(error);
    }

    // navigate(`/`);



  };


  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default Login;
