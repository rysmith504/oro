import React, { useEffect, useContext, useState } from 'react';
import ArtistInfoCard from '../components/ArtistCards';
import { ArtistContext } from '../context/ArtistContext';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';
import {Box,	Grid} from '../styles/material';
import ArtistThumbnail from '../components/ArtistThumbnail';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import Login from './Login';

const Artists = () => {
  const { userEvents, getUserEvents, currentUserInfo } = useContext(UserContext);
  const artistContext = useContext(ArtistContext);
  const themeContext = useContext(ThemeContext);
  // const {mode, setMode, toggleMode} = themeContext;
  const {artistData, getFaveArtists } = artistContext;

  const {allArtists, artists} = artistData;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // const artistName = searchParams.get(...);
  const [singleArtist, setSingleArtist] = useState(null);

  const updateSingle = (name) => {
    setSingleArtist(name);
  };

  const resetSingle = () => {
    setSingleArtist(null);
  };
  useEffect(() => {
    getFaveArtists(currentUserInfo.id);
  }, []);


  if (currentUserInfo.id === undefined) {
    return (
      <div>
        <h1>Please login to view artists</h1>
        <Login/>
      </div>
    );
  } else if (singleArtist !== null) {
    const current = allArtists.filter((obj) => obj.artistName == singleArtist);

    if (!current[0].image.length) {
      const musicImages = ['music', 'band', 'concert', 'music-festival', 'rock-concert', 'musical', 'guitar', 'singer', 'opera'];
      current.image = `https://source.unsplash.com/random/?${musicImages[Math.floor(Math.random() * musicImages.length + 1)]}`;
    }
    return (
      <div>
        <Box sx={{
          flexGrow: 1,
          height: '100%' }}>
          <Grid container spacing={2}>
            <Grid item key={`art${current[0].artistName}`} xs={12} sm={12} md={12}>
              <ArtistInfoCard
                resetSingle={resetSingle}
                artistProps={current[0]} key={`artistObj${current[0].artistName}`}/>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  } else if (artists === true && Array.isArray(allArtists)) {
    return (
      <div>
        <h1>Artists</h1>
        <Box sx={{
          flexGrow: 1,
          height: '100%' }}>
          <Grid container spacing={2}>
            {allArtists.map((artObj, index) => {
              if (!artObj.image.length) {
                const musicImages = ['music', 'band', 'concert', 'music-festival', 'rock-concert', 'musical', 'guitar', 'singer', 'opera'];
                artObj.image = `https://source.unsplash.com/random/?${musicImages[Math.floor(Math.random() * musicImages.length + 1)]}`;
              }
              return (
                <Grid item key={`art${index}`} xs={12} sm={4} md={3}>
                  <ArtistThumbnail
                    updateSingle={updateSingle}
                    artistProps={artObj} key={`artistObj${index}`}/>
                </Grid>
              );
            })
            }
          </Grid>
        </Box>
      </div>
    );
  } else {
    return (
      <div>
        <h1>You do not currently have any favorite artists.</h1>
        <p>Start following artists:</p>
        <Box sx={{
          flexGrow: 1,
          height: '100%' }}>
          <Grid container spacing={2}>
            {Array.isArray(allArtists) && allArtists.map((artObj, index) => {
              if (!artObj.image.length) {
                const musicImages = ['music', 'band', 'concert', 'music-festival', 'rock-concert', 'musical', 'guitar', 'singer', 'opera'];
                artObj.image = `https://source.unsplash.com/random/?${musicImages[Math.floor(Math.random() * musicImages.length + 1)]}`;
              }
              return (
                <Grid item key={`art${index}`} xs={12} sm={4} md={3}>
                  <ArtistThumbnail
                    updateSingle={updateSingle}
                    artistProps={artObj} key={`artistObj${index}`}/>
                </Grid>
              );
            })
            }
          </Grid>
        </Box>
      </div>
    );
  }

};
export default Artists;
