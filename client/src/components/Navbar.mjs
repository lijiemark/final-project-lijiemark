import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { UserContext } from '../context/UserContext.mjs';

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUserEmail = localStorage.getItem("userEmail");
    const storedLastActive = localStorage.getItem("lastActive");
    const currentTime = Date.now();

    if (
      storedUserEmail &&
      storedLastActive &&
      currentTime - storedLastActive < 15 * 60 * 1000
    ) {
      setUser(storedUserEmail);
    }
  }, []);
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("userEmail");
    localStorage.removeItem("lastActive");
    navigate("/login");
  };

  // const handleRedirect = (path) => {
  // if (user) {
  // navigate(`${path}/${user}`);
  // navigate(`${path}`);
  //   } else {
  //     navigate('/login');
  //   }
  // };

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
          {/* <button onClick={() => handleRedirect('/createPost')}>Create Post</button> */}
          <button onClick={() => navigate('/createPost')}>Create Post</button>
          {/* <button onClick={() => handleRedirect('/userPosts')}>All My Posts</button> */}
          <button onClick={() => navigate('/userPosts')}>All My Posts</button>

          <button onClick={handleLogout}>Log Out</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
