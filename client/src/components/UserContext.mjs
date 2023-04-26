import React, { useState, useEffect } from 'react';

export const UserContext = React.createContext({
  user: null,
  setUser: () => { },
  lastActive: null,
  setLastActive: () => { },
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [lastActive, setLastActive] = useState(null);
  const [isLocalStorageChecked, setIsLocalStorageChecked] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedLastActive = localStorage.getItem('lastActive');
    const currentTime = Date.now();

    if (
      storedUser &&
      storedLastActive &&
      currentTime - storedLastActive < 15 * 60 * 1000
    ) {
      setUser(JSON.parse(storedUser));
    }
    setIsLocalStorageChecked(true);
  }, []);

  const contextValue = {
    user,
    setUser,
    lastActive,
    setLastActive,
    isLocalStorageChecked,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {isLocalStorageChecked && children}
    </UserContext.Provider>
  );
};
