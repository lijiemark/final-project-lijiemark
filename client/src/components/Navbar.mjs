import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { UserContext } from '../context/UserContext.mjs';

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const handleRedirect = (path) => {
    if (user) {
      navigate(`${path}/${user}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      {!user && (
        <>
          <button onClick={() => navigate('/login')}>Log In</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
        </>
      )}
      {user && (
        <>
          <button onClick={() => handleRedirect('/createPost')}>Create Post</button>
          <button onClick={() => handleRedirect('/userPosts')}>All My Posts</button>
          <button onClick={handleLogout}>Log Out</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
