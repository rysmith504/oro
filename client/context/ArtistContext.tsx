import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArtistContext = React.createContext({});

const ArtistContextProvider = ({ children }) => {
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const getArtist = () => {
      setArtist({
        id: 100045,
        userId: 3489758923745,
        artistName: 'Mariah Carie',
      });
      //  axios()
      //   .then((res) => {
      //     setArtist({
      //       id: res.data.id,
      //       userId: res.data.userId,
      //       firstName: res.data.firstName,
      //       eventAPIid: res.data.eventAPIid
      //     });
      //     if (res.status === 200) { return res; }
      //   })
      //   .catch((err) => console.error(err, '***ERROR***'));
    };
    getArtist();
  }, []);

  return (
    <ArtistContext.Provider value = {artist} >
      { children }
    </ArtistContext.Provider>
  );
};


export { ArtistContextProvider, ArtistContext };
