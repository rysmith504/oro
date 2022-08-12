// import axios from 'axios';
import React, { useState } from 'react';

const UserContext = React.createContext({});

const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState([]);

  const appProps = {
    userInfo,
    setUserInfo,
  };
  return (
    <UserContext.Provider value={appProps}>{children}</UserContext.Provider>
  );
};
export { UserContextProvider, UserContext };
