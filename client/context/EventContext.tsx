import axios from 'axios';
import React, { useState } from 'react';
import { EventDetailsType } from '../types';

const EventContext = React.createContext({});

const EventContextProvider = ({ children }) => {
  const [eventDetails, setEventDetails] = useState<EventDetailsType>();

  const getEventDetails = (id: string): EventDetailsType => {
    axios
      .get('/eventDetails', { params: { id } })
      .then(({ data }) => {
        setEventDetails(response.data.hits);
      })
      .catch((err) => console.error(err));
  };

  const appProps = {
    eventDetails,
    setEventDetails,
    getEventDetails,
  };
  return (
    <EventContext.Provider value={appProps}>{children}</EventContext.Provider>
  );
};
export { EventContextProvider, EventContext };
