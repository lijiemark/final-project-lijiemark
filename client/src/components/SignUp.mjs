import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import { UserContext } from '../context/UserContext.mjs';


function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    // console.log("Changing background.");

    document.body.style.backgroundImage = `url("${process.env.PUBLIC_URL}/img/signup-img.jpeg")`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';


    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundRepeat = '';
    };
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(username, email, password);
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      // console.log(username);
      // const response = await axios.post('http://localhost:3001/signup', {
      const response = await axios.post('https://lijie-fit-journal.herokuapp.com/signup', {

        username: username,
        email: email,
        password: password,
      });
      // console.log(response.data);
      setUser({ username: username, email: email });
      navigate(`/createPost`);

    } catch (error) {
      // console.log("here eroor!!");
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>

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

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
