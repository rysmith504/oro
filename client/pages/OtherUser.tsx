import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

const OtherUser: React.FC = () => {
  const [userInfo, setUserInfo] = useState([]);
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const getUserInfo = () => {
    let params = (new URL(document.location)).searchParams;
    let id = params.get('id');

    axios.get(`/api/profile/${id}`)
      .then(({ data }) => {
        setUserInfo(data);
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <h1>{userInfo.fullName}</h1>
  );
};

export default OtherUser;
