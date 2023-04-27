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
    // console.log("Changing background.");

    document.body.style.backgroundImage = `url("${process.env.PUBLIC_URL}/img/login-img-2.jpeg")`;
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`https://lijie-fit-journal.herokuapp.com/login`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        setUser({
          username: response.data.username,
          email: response.data.email,
          height: response.data.height,
          weight: response.data.weight,
          age: response.data.age,
        });

        navigate(`/userPosts`);
      }
    } catch (error) {
      // console.error(error);

      if (error.response && error.response.status === 401) {
        alert("Authentication failed. Wrong email or password.");
      } else {
        console.error("An error occurred during the login process.");
      }
    }
  };


  return (
    <div className="auth-container">
      <form className="form" onSubmit={handleSubmit}>
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
