import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext.mjs';

import dotenv from 'dotenv';
dotenv.config();
function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // const response = await axios.post('http://localhost:3001/login', {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {

        email: email,
        password: password,
      });
      console.log(email);

      console.log("here's the response:");
      console.log(response.data);
      if (response.status === 200) {
        console.log("here before creating the post");
        console.log(email);
        setUser(email);
        navigate(`/createPost/${email}`, { state: { user: email } });
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
