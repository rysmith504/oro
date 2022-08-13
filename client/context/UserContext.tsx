// import axios from 'axios';
import React, { useState } from 'react';
import axios from 'axios';

const UserContext = React.createContext({});

const UserContextProvider = ({ children }) => {
  const [ userEvents, setUserEvents ] = useState([]);

  // const getUserEvents = () => {
  //   axios.get('/userEvents')
  //     .then()
  // }

  const appProps = {
    userEvents,
    setUserEvents,
  };


  return (
    <UserContext.Provider value={appProps}>{children}</UserContext.Provider>
  );
};
export { UserContextProvider, UserContext };
