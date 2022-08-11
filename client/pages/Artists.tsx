import React, { useState, useEffect, useRef, useContext } from 'react';
import ArtistInfoCard from '../components/ArtistCards';
import axios from 'axios';

const Artists = () => {
  const [artists, setArtistData] = useState(
    {
      artist: '',
      favArtist: '',
    }
  );

  const getFaveArtists = (name) => {
    name = name | 'Adele';
    axios.get('/favArtists', {
      params: {
        artistName: name
      }
    })
      .then((artistData) => {
        console.log('artistEvents', artistData.data[0]);
        const artist = artistData.data[0];
        setArtistData((state) => {
          return { ...state, favArtist: artist };
        });
      })
      .catch((err) => {
        console.log('artistEvents');
        console.error(err);
      });
  };

  useEffect(() => {
    getFaveArtists('Beyonce');
  }, []);

  return (
    <div>
      <div>Hello ARtists</div>
      <ArtistInfoCard artistProps={artists}/>
    </div>
  );
};

export default Artists;
