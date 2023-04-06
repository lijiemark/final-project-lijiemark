import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext.mjs';
import { useLocation } from 'react-router-dom';

function Home() {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }
  }, [location.state]);

  return (
    <div>
      <h1>Welcome, {user ? user : 'Guest'}!</h1>
    </div>
  );
}

export default Home;
