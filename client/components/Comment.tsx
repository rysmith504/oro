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
  // <YouTubeIcon key={'youtube'} sx={{ color: iconColors }} />
  // <CardContent sx={{ bgcolor: inverseMode }}></CardContent>
  // <Typography paragraph sx={{ bgcolor: inverseMode }}></Typography>

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
      <Link to={`/user/?id=${comment.userId}`}>
        <Avatar sx={{ height: '30px', width: '30px' }} src={profilePic} />
      </Link>
      {comment.comment}
    </div>
  );
};

export default Comment;
