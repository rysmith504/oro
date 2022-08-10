import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

export const ArtistContext = React.createContext();

const ArtistContextProvider: JSX.Element = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      const options = {
        url: '/hidden',
        method: 'GET',
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      };
      axios(options)
        .then((res) => {
          setUser({
            email: res.data.email,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            image: res.data.image,
            _id: res.data._id,
          });
          if (res.status === 200) { return res; }
        })
        .catch((err) => console.error(err, '***ERROR***'));
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider value = {user} >
      { children }
      </UserContext.Provider>
  );
}

export default ArtistContextProvider;