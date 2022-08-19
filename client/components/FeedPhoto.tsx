import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Comments from '../components/Comments';
import {Grid, Modal, Box, Button, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, Typography, IconButton } from '../styles/material';
import { styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const FeedPhoto: React.FC = (props) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const {photo} = props;
  const [profilePic, setProfilePic] = useState('');
  const [expanded, setExpanded] = React.useState(false);
  const [modalStatus, setModalStatus] = useState(false);



  useEffect(() => {
    // console.log(photo);
    getAvatar();
  }, []);

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    margin: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getAvatar = async () => {
    await axios.get('/api/eventFeed/avatar', {
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

  const handleOpen = () => {
    console.log('changed');
    setModalStatus(true);
  }

  const handleClose = () => {
    console.log('closed');
    setModalStatus(false);
  }


  return (
    <div>
      <Modal style={{alignItems: 'center', justifyContent: 'center'}} sx={{overflow: 'scroll'}} open={modalStatus} onClose={handleClose}>
        <Box sx={{margin: 'auto', bgcolor: 'black', width: 350, alignItems: 'center', justifyContent: 'center'}}>

          <img width='300px' height='auto' margin='auto' src={photo.photoUrl}/>
          <Grid container>
            <Comments photo={photo}/>
          </Grid>
        </Box>
      </Modal>
      <Card sx={{ maxWidth: 345, margin: 'auto'}}>
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
          onClick={handleOpen}
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
