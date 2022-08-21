import React, { useEffect, useContext, useState } from 'react';
import ArtistInfoCard from './ArtistCards';
import { ArtistContext } from '../context/ArtistContext';
import { ThemeContext } from '../context/ThemeContext';
import {
  Grid,	Card,	CardHeader,	CardMedia
} from '../styles/material';
import { useTheme } from '@mui/material/styles';

import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

const ArtistThumbnail = ({artistProps, updateSingle}) => {
  const artistContext = useContext(ArtistContext);
  const themeContext = useContext(ThemeContext);
  // console.log(artistContext);

  const {artistData, getFaveArtists } = artistContext;
  const favorites = artistData;
  const theme = useTheme();
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
