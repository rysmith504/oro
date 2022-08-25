import React, { useState, useContext } from 'react';
import { Card,	CardHeader,	CardMedia, UseTheme, FavoriteIcon, IconButton } from '../styles/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
const ArtistThumbnail = ({artistProps, updateSingle}) => {
  const [favorite, setFavorite] = useState(false);

  const theme = UseTheme();
  const inverseMode = theme.palette.secondary.main;
  const iconColors = theme.palette.secondary.contrastText;

  const navigate = useNavigate();
  const [singleArtist, setSingleArtist] = useState('');
  const {
    id,
    artistName,
    image,
  } = artistProps;

  const { userEvents, getUserEvents, currentUserInfo } = useContext(UserContext);

  const handleClick = (name) => {
    setSingleArtist(name);
    navigate(`/artists/${name}`);
    updateSingle(name);
  };

  const handleFavorite = (artistId) => {
    console.log(currentUserInfo.id, artistId);
    const userId = currentUserInfo.id;
    console.log('update');
    axios.put('/api/favArtists/update', { params: { artist: artistId, user: userId } })
      .then(() => {
        setFavorite(!favorite);
      })
      .catch(err => {
        setFavorite(!favorite);
        console.error(err);
      }
      );
  };

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
      <IconButton aria-label="add to favorites" onClick={()=>{ handleFavorite(id); }}>
        {favorite ? <FavoriteIcon sx={{ color: '#AE66FF' }} /> : <FavoriteIcon sx={{ color: iconColors }} />}
      </IconButton>
    </Card>
  );
};

export default ArtistThumbnail;
