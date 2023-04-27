import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext.mjs';
import { useLocation } from 'react-router-dom';
import './Home.css';

function Home() {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  useEffect(() => {
    // console.log("Changing background.");

    document.body.style.backgroundImage = `url("${process.env.PUBLIC_URL}/img/fitJournal-3.jpeg")`;
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
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }
  }, [location.state]);

  const getRandomQuote = () => {
    const quotes = [
      "Believe you can and you're halfway there.",
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      "The harder you work for something, the greater you'll feel when you achieve it.",
      "Don't watch the clock; do what it does. Keep going.",
      "The only limit to our realization of tomorrow will be our doubts of today."
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <div className="home-container">
      <h1>Welcome back, {user ? user.username : 'Guest'}!</h1>
      <p className="motivational-quote">{getRandomQuote()}</p>
    </div>
  );
}

export default Home;
