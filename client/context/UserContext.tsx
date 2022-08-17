import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const UserContext = React.createContext({});

const UserContextProvider = ({ children }) => {
  const [userEvents, setUserEvents] = useState([]);

  const getUserEvents = () => {
    axios.get('/profile/events')
      .then(events => {
        const { data } = events;
        const startDate = data.sales.public.startDateTime;
        const endDate = data.sales.public.endDateTime;

        const eventInfo = {
          eventName: data.name,
          eventDate: data.dates.start.localDate,
          venue: data._embedded.venues[0].name,
          postalCode: data._embedded.venues[0].postalCode,
          city: data._embedded.venues[0].city.name,
          state: data._embedded.venues[0].state.name,
          address: data._embedded.venues[0].address.line1,
          link: data.url,
          saleStart: moment(startDate).format('LLLL'),
          saleEnd: moment(endDate).format('LLLL')
        }
        setUserEvents(eventInfo);
      })
      .catch(err => {
        console.error(err);
      })
  }

  const logoutUser = () => {
    axios.get('/logout')
      .then(() => {
        console.log('logged out');
      })
      .catch(err => {
        console.error(err);
      })
  }

  const getOtherUser = () => {
    axios.get('/profile/:_id')
  }

  const appProps = {
    userEvents,
    setUserEvents,
    getUserEvents,
    logoutUser,
  };


  return (
    <UserContext.Provider value={appProps}>{children}</UserContext.Provider>
  );
};
export { UserContextProvider, UserContext };
