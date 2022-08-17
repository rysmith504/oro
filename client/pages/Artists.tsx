import React, { useState, useEffect, useRef, useContext } from 'react';
import ArtistInfoCard from '../components/ArtistCards';
import { ArtistContext } from '../context/ArtistContext';
import { ThemeContext, ThemeContextProvider } from '../context/ThemeContext';
import {Box,	Grid, Item} from '../styles/material';

const Artists = () => {
  const artistContext = useContext(ArtistContext);
  // const themeContext = useContext(ThemeContext);
  // console.log(artistContext);
  // const {mode, setMode, toggleMode} = themeContext;
  const {artistData, getFaveArtists, setArtistData } = artistContext;
  const favorites = artistData;

  useEffect(() => {
    getFaveArtists();
  }, []);

  return (
    <div>
      <div>Hello ARtists</div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {favorites.map((artObj, index) => {
            if (!artObj.image.length) {
              const musicImages = ['music', 'band', 'concert', 'music-festival', 'rock-concert', 'musical', 'guitar', 'singer', 'opera'];
              artObj.image = `https://source.unsplash.com/random/?${musicImages[Math.floor(Math.random() * musicImages.length + 1)]}`;
            }
            return (
              <Grid item key={`art${index}`} xs={12} sm={4} md={2}>
                <ArtistInfoCard artistProps={artObj} key={artObj.id}/>
              </Grid>
            );
          })
          }
        </Grid>
      </Box>
    </div>
  );
};

export default Artists;
