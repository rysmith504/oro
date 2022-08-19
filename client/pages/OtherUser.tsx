import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useTheme } from '@mui/material/styles';

const OtherUser: React.FC = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [userPhotos, setUserPhotos] = useState([]);
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const params = (new URL(document.location)).searchParams;
  const id = params.get('id');

  const getUserInfo = () => {
    axios.get(`/api/profile/${id}`)
      .then(({ data }) => {
        setUserInfo(data);
      })
      .catch(err => console.error(err));
  }

  const getUserPhotos = () => {
    axios.get(`/api/profile/event_photos/${id}`)
      .then(({ data }) => {
        setUserPhotos(data);
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    getUserInfo();
    getUserPhotos();
  }, []);

  return (
    <div>
      <h1>{userInfo.fullName}</h1>
      {userPhotos.map(photo => {
        return (
          <img src={photo.photoUrl} alt="" />
        )
      })}
    </div>

  );
};

export default OtherUser;
