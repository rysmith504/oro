// import axios from 'axios';
import React, { useState } from 'react';
import axios from 'axios';

const UserContext = React.createContext({});

const UserContextProvider = ({ children }) => {
  const [getEventDetails, setGetEventDetails] = useState([]);

  const getEventDetails = ({ id }) => {
    axios
      .get('/eventDetails', { params: { id } })
      .then((response) => {
        setGetEventDetails(response.data.hits);
      })
      .catch((err) => console.error(err));
  };

  const appProps = {
    getEventDetails,
    setGetEventDetails,
  };
  return (
    <UserContext.Provider value={appProps}>{children}</UserContext.Provider>
  );
};
export { UserContextProvider, UserContext };
