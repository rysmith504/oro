import React, { useState, useContext, useEffect } from 'react';
import { Card,	CardHeader,	CardMedia, UseTheme, FavoriteIcon, IconButton, Tooltip } from '../styles/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
const ArtistThumbnail = ({artistProps, updateSingle, favorite, getFaveArtists, favUpdated}) => {

  const theme = UseTheme();
  const inverseMode = theme.palette.secondary.main;
  const iconColors = theme.palette.secondary.contrastText;
  const [thumbFav, setThumbFav] = useState(false);
  const navigate = useNavigate();
  const {
    id,
    artistName,
    image,
  } = artistProps;

  const { currentUserInfo } = useContext(UserContext);

  const handleClick = (name) => {
    navigate(`/artists/${name}`);
    updateSingle(name);
  };

  const handleFollow = (artistId) => {
    console.log(currentUserInfo.id, artistId);
    const userId = currentUserInfo.id;
    console.log('update');
    axios.put('/api/favArtists/update', { params: { artist: artistId, user: userId } })
      .then(() => {
        setThumbFav(true);
        favUpdated(true);
        getFaveArtists(currentUserInfo.id);
      })
      .catch(err => {
        getFaveArtists(currentUserInfo.id);
        setThumbFav(true);
        favUpdated(true);
        console.error(err);
      }
      );
  };



  const handleUnfollow = (artistId) => {
    console.log(currentUserInfo.id, artistId);
    const userId = currentUserInfo.id;
    console.log('update');
    axios.put('/api/favArtists/update', { params: { artist: artistId, user: userId } })
      .then(() => {
        setThumbFav(false);
        favUpdated(false);
        getFaveArtists(currentUserInfo.id);
      })
      .catch(err => {
        getFaveArtists(currentUserInfo.id);
        setThumbFav(false);
        favUpdated(false);
        console.error(err);
      }
      );
  };

  useEffect(()=>{
  }, [thumbFav])
  useEffect(()=>{
    setThumbFav(favorite);
  }, [])

  return (
    <Card sx={{ bgcolor: inverseMode,
      ':hover': {
        boxShadow: 20,
        opacity: 0.8;
      } }}>
      <CardHeader
        title={artistName}
        sx={{ bgcolor: inverseMode }}
      />
      <CardMedia
        style = {{ cursor: 'pointer'}}
        component="img"
        height="194"
        image={image}
        alt={artistName}
        sx={{ bgcolor: inverseMode }}
        onClick={() => handleClick(artistName)}
      />
      <IconButton aria-label="add to favorites">
        {thumbFav ? <Tooltip title="unfollow"><FavoriteIcon sx={{ color: '#AE66FF' }} onClick={()=>{ handleUnfollow(id); }} /></Tooltip> : <Tooltip title="follow"><FavoriteIcon sx={{ color: iconColors }} onClick={()=>{ handleFollow(id); }}/></Tooltip>}
      </IconButton>
    </Card>
  );
};

export default ArtistThumbnail;
