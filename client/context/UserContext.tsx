// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = React.createContext({});

const UserContextProvider = ({ children }) => {
  const [ userEvents, setUserEvents ] = useState([]);

  const getUserEvents = () => {
    axios.get('/profile/events')
      .then(events => {
        const {data} = events;
        const eventInfo = {
          eventName: data.name,
          eventDate: data.dates.start.localDate
        }
        setUserEvents(eventInfo);
      })
      .catch(err => {
        console.error(err);
      })
  }

  const appProps = {
    userEvents,
    setUserEvents,
    getUserEvents,
  };


  return (
    <UserContext.Provider value={appProps}>{children}</UserContext.Provider>
  );
};
export { UserContextProvider, UserContext };
