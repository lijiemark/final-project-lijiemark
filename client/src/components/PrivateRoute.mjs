import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext.mjs';

function PrivateRoute({ children }) {
  const { user } = useContext(UserContext);

  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
