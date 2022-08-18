import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Comments from '../components/Comments';
import {Button, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, Typography, IconButton } from '../styles/material';
import { styled } from '@mui/material';

const FeedPhoto: React.FC = (props) => {
  const {photo} = props;
  const [profilePic, setProfilePic] = useState('');
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    // console.log(photo);
    getAvatar();
  }, []);

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getAvatar = async () => {
    await axios.get('/eventFeed/avatar', {
      params: {
        userId: photo.userId
      }
    })
      .then((userProfile) => {
        // console.log(userProfile);
        setProfilePic(userProfile.data);
      })
      .catch((err) => console.error(err));
    
  };


  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar src={profilePic}/>
          }
          subheader={photo.created_at}
        />
        <CardMedia
          component="img"
          height="194"
          image={photo.photoUrl}
        />
        <CardContent>
          <Typography variant='body2'>
            This festival was dope!
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <Button>Comments</Button>
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>
              <Comments photo={photo} />
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default FeedPhoto;
