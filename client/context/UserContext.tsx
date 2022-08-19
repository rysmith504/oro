import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const UserContext = React.createContext({});

const UserContextProvider = ({ children }) => {
  const [userEvents, setUserEvents] = useState([]);
  const [ currentUserInfo, setCurrentUserInfo ] = useState([]);
  const [userContacts, setUserContacts] = useState([]);

  const getUserEvents = () => {
    axios
      .get('/api/profile/events')
      .then((events) => {
        const { data } = events;
        const startDate = data.sales.public.startDateTime;
        const endDate = data.sales.public.endDateTime;

        const eventInfo = {
          eventName: data.name,
          eventId: data.id,
          eventDate: data.dates.start.localDate,
          venue: data._embedded.venues[0].name,
          postalCode: data._embedded.venues[0].postalCode,
          city: data._embedded.venues[0].city.name,
          state: data._embedded.venues[0].state.name,
          address: data._embedded.venues[0].address.line1,
          link: data.url,
          saleStart: moment(startDate).format('LLLL'),
          saleEnd: moment(endDate).format('LLLL'),
        };
        setUserEvents(eventInfo);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const logoutUser = () => {
    axios
      .get('/logout')
      .then(() => {
        console.log('logged out');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getOtherUser = () => {
    axios.get('/profile/:_id');
  };

  const getCurrentUser = () => {
    // Once user logs in, get user info
    axios
      .get('/hidden')
      .then((info) => {
        const { data } = info;
        console.log(data);
        // set state to user info
        setCurrentUserInfo(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
     getCurrentUser();
     getUserContacts();
  }, []);

  useEffect(() => {
    getUserContacts();

  }, [currentUserInfo])


  // useEffect(async () => {
  //   if(currentUserInfo) {
  //   }
  // }, [])
  const getUserContacts = () => {
    if(currentUserInfo){
      axios.get('/api/users/allusers', { params: { id: currentUserInfo.id } })
      .then(resObj => {
        setUserContacts(resObj.data)
      })
    }
  }
  // }

  const appProps = {
    userContacts,
    userEvents,
    setUserEvents,
    getUserEvents,
    logoutUser,
    currentUserInfo,
  };

  return (
    <UserContext.Provider value={appProps}>{children}</UserContext.Provider>
  );
};
export { UserContextProvider, UserContext };
