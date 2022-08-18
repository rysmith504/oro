import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { Paper, Grid} from '@mui/material';
import {Button, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, Typography, IconButton } from '../styles/material';

const Comment: React.FC = (props) => {
  const {comment} = props;
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    getAvatar();
  }, []);

  const getAvatar = async () => {
    await axios.get('/eventFeed/avatar', {
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
      <span>
        <Avatar sx={{ height: '30px', width: '30px'}} src={profilePic}/>
        {comment.comment}
      </span>

    </div>
  );
};

export default Comment;