import React, { useState } from 'react';
import { Card,	CardHeader,	CardMedia, UseTheme } from '../styles/material';
import { useNavigate } from 'react-router-dom';

const ArtistThumbnail = ({artistProps, updateSingle}) => {
  const theme = UseTheme();
  const inverseMode = theme.palette.secondary.main;
  const navigate = useNavigate();
  const [singleArtist, setSingleArtist] = useState('');
  const {
    artistName,
    image,
  } = artistProps;

  const handleClick = (name) => {
    setSingleArtist(name);
    navigate(`/artists/${name}`);
    updateSingle(name);
  };


  return (
    <Card sx={{ bgcolor: inverseMode }} onClick={() => handleClick(artistName)}>
      <CardHeader
        title={artistName}
        sx={{ bgcolor: inverseMode }}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={artistName}
        sx={{ bgcolor: inverseMode }}
      />
    </Card>
  );
};

export default ArtistThumbnail;
