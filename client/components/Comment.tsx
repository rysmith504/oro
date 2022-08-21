import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Paper, Grid } from '@mui/material';
import { Button, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, Typography, IconButton } from '../styles/material';
import { useTheme } from '@mui/material/styles';

const Comment: React.FC = (props) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const { comment } = props;
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    getAvatar();
  }, []);

  const getAvatar = async () => {
    await axios.get('/api/eventFeed/avatar', {
      params: {
        userId: comment.userId
      }
    })
      .then((userProfile) => {
        setProfilePic(userProfile.data);
      })
      .catch((err) => console.error(err));
  };


  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={2} sm={2} md={2}>
          <Link to={`/user/?id=${comment.userId}`}>
            <Avatar sx={{ height: '30px', width: '30px', ml: '15px', mb: '20px'}} src={profilePic}/>
          </Link>
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <Typography textAlign='left' sx={{ color: iconColors, mb: '20px' }}>{comment.comment}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Comment;
