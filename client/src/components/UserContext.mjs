import { createContext } from 'react';

export const UserContext = createContext({
  user: null,
  setUser: () => { },
  lastActive: null,
  setLastActive: () => { },
});
