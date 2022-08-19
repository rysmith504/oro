import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Comments from '../components/Comments';
import {Grid, Modal, Box, Button, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, Typography, IconButton } from '../styles/material';
import { styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const FeedPhoto: React.FC = (props) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;
  // <YouTubeIcon key={'youtube'} sx={{ color: iconColors }} />
  // <CardContent sx={{ bgcolor: inverseMode }}></CardContent>
  // <Typography paragraph sx={{ bgcolor: inverseMode }}></Typography>

  const {photo} = props;
  const [profilePic, setProfilePic] = useState('');
  const [expanded, setExpanded] = React.useState(false);
  const [modalStatus, setModalStatus] = useState(false);



  useEffect(() => {
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
  };

  const handleClose = () => {
    console.log('closed');
    setModalStatus(false);
  };


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
            <Link to={`/user/?id=${photo.userId}`}>
              <Avatar src={profilePic} />
            </Link>
          }
          subheader={<Typography sx={{ bgcolor: inverseMode }}>{photo.created_at}</Typography>}
          sx={{ bgcolor: inverseMode }}
        />
        <CardMedia
          component="img"
          height="194"
          image={photo.photoUrl}
          onClick={handleOpen}
          sx={{ bgcolor: inverseMode }}
        />
        <CardContent sx={{ bgcolor: inverseMode }}>
          <Typography variant='body2' sx={{ bgcolor: inverseMode }}>
            This festival was dope!
          </Typography>
        </CardContent>
        <CardActions
          sx={{ bgcolor: inverseMode }}
          disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <Button sx={{ color: iconColors }}>Comments</Button>
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ bgcolor: inverseMode }}>
            <Typography sx={{ bgcolor: inverseMode }}>
              <Comments photo={photo}/>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default FeedPhoto;
