import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { UserContext } from '../context/UserContext.mjs';
import { Link } from 'react-router-dom';

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("lastActive");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to={user ? `/` : '/login'}>
        <img className="logo" src="../img/fitJournal-2.png" alt="Logo" />
      </Link>
      <div className="buttons-container">

        {!user && (
          <>
            <button onClick={() => navigate('/login')}>Log In</button>
            <button onClick={() => navigate('/signup')}>Sign Up</button>
          </>
        )}
        {user && (
          <>
            {/* <button onClick={() => handleRedirect('/createPost')}>Create Post</button> */}
            <button onClick={() => navigate('/createPost')}>Create Post</button>
            {/* <button onClick={() => handleRedirect('/userPosts')}>All My Posts</button> */}
            <button onClick={() => navigate('/userPosts')}>All My Posts</button>
            <button onClick={() => navigate('/myAccount')}>My Status</button>

            <button onClick={handleLogout}>Log Out</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
