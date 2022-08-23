import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Comments from '../components/Comments';
import {Grid, Modal, Box, Button, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, Typography, IconButton } from '../styles/material';
import { styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';

const FeedPhoto: React.FC = (props) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

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
    setModalStatus(true);
  };

  const handleClose = () => {
    setModalStatus(false);
  };


  return (
    <div>
      {/* <Modal style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} sx={{overflow: 'scroll'}} open={modalStatus} onClose={handleClose}>
        <Box sx={{margin: 'auto', bgcolor: inverseMode, width: 400, alignItems: 'left', justifyContent: 'left', pt: '20px', outline: 'none'}}>

          <img width='350px' height='auto' src={photo.photoUrl}/>
          <Grid container sx={{mt: '20px'}}>
            <Comments photo={photo}/>
          </Grid>
        </Box>
      </Modal> */}
      <Card sx={{ maxWidth: 400, margin: 'auto', mt: '20px'}}>
        <CardHeader
          avatar={
            <Link to={`/user/?id=${photo.userId}`}>
              <Avatar src={profilePic} />
            </Link>
          }
          subheader={<Typography sx={{ bgcolor: inverseMode }}>{moment(photo.created_at).calendar()}</Typography>}
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
