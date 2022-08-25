import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = React.createContext({});

const UserContextProvider = ({ children }) => {
  const [userEvents, setUserEvents] = useState([]);
  const [currentUserInfo, setCurrentUserInfo] = useState([]);
  const [userContacts, setUserContacts] = useState([]);

  const logoutUser = () => {
    axios
      .post('/logout')
      .then(() => {
        setCurrentUserInfo([]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getCurrentUser = async () => {
    // Once user logs in, get user info
    await axios
      .get('/hidden')
      .then(({ data }) => {
        // set state to user info
        setCurrentUserInfo(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getCurrentUser();
    // getUserEvents();
  }, []);

  useEffect(() => {
    getUserContacts();
  }, [currentUserInfo]);

  const getUserContacts = () => {
    if (currentUserInfo) {
      axios.get('/api/users/allusers', { params: { id: currentUserInfo.id } })
        .then(resObj => {
          setUserContacts(resObj.data);
        });
    }
  };

  const appProps = {
    userContacts,
    userEvents,
    setUserEvents,
    // getUserEvents,
    logoutUser,
    currentUserInfo,
    getCurrentUser
  };

  return (
    <UserContext.Provider value={appProps}>{children}</UserContext.Provider>
  );
};
export { UserContextProvider, UserContext };
