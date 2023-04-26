import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { UserContext } from '../context/UserContext.mjs';

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  // console.log("in navbar saving");
  // console.log(user);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   const storedLastActive = localStorage.getItem("lastActive");
  //   const currentTime = Date.now();
  //   console.log("storedUser:", storedUser);
  //   console.log("storedLastActive:", storedLastActive);
  //   console.log("currentTime:", currentTime);
  //   if (
  //     storedUser &&
  //     storedLastActive &&
  //     currentTime - storedLastActive < 15 * 60 * 1000
  //   ) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
