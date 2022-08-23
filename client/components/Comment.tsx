import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Paper, Grid, Fab, Button, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, Typography, IconButton } from '../styles/material';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';

const Comment: React.FC = (props) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const { comment } = props;
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    console.log(comment)
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
          <Paper>
            <Typography textAlign='left' sx={{ color: inverseMode, mb: '20px', ml: '5px'}}>{comment.comment}</Typography>
            <Typography textAlign='right' sx={{ color: inverseMode, mb: '20px' }}>{moment(comment.created_at).calendar()}</Typography>
          </Paper>
          <Typography textAlign='right' sx={{ color: iconColors, mb: '20px' }}>
            <span>
              edit
            </span>
            <span>
              |
            </span>
            <span>
              delete
            </span>
          </Typography>
        </Grid>
      </Grid>
      <div>
        {/* <Fab href='edit' variant='extended' size='small'>edit</Fab>
        <Fab href='delete' variant='extended' size='small'>delete</Fab> */}
      </div>
    </div>
  );
};

export default Comment;
