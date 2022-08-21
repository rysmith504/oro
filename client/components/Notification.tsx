import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Paper, Modal, Box, Grid} from '../styles/material';
import { useTheme } from '@mui/material/styles';
import Comments from './Comments';
import {Avatar} from '../styles/material';

const Notification: React.FC = (props) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const {notif} = props;
  const [person, setPerson] = useState('');
  const [text, setText] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [modalStatus, setModalStatus] = useState(false);
  const [photo, setPhoto] = useState({});
  const [userAvatar, setUserAvatar] = useState('');

  const getPhoto = () => {
    axios.get('/api/eventFeed/photo', {
      params: {
        photoUrl,
      }
    })
      .then((photoObj) => {
        // console.log(photoObj);
        setPhoto(photoObj.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getPhoto();
  }, [photoUrl]);


  const getPerson = () => {
    axios.get('/api/comments/comment', {
      params: {
        commentId: notif.commentId,
      }
    })
      .then((commentData) => {
        setPhotoUrl(commentData.data.photoUrl);
        axios.get(`/api/profile/${commentData.data.userId}`)
          .then((commenterData) => {
            console.log(commenterData.data.profileURL);
            setPerson(commenterData.data.fullName);
            setUserAvatar(commentData.data.profileURL);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  const getType = () => {
    if (notif.type === 'comment') {
      setText(' commented on your photo');
    }
  };

  useEffect(() => {
    getPerson();
    getType();
  }, []);

  const handleOpen = () => {
    // console.log('changed');
    setModalStatus(true);
  };

  const handleClose = () => {
    // console.log('closed');
    setModalStatus(false);
  };


  return (
    <div>
      <Modal
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'}}
        sx={{overflow: 'scroll', marginTop: '40px', paddingTop: '10px'}}
        open={modalStatus}
        onClose={handleClose}>
        <Box sx={{margin: 'auto', bgcolor: inverseMode, width: 350, alignItems: 'center', justifyContent: 'center', pt: '20px', outline: 'none'}}>

          <img width='300px' height='auto' src={photoUrl}/>
          <Grid container sx={{mt: '20px'}}>
            <Comments photo={photo}/>
          </Grid>
        </Box>
      </Modal>

      <Paper onClick={handleOpen} sx={{margin: 'auto', marginTop: '5px', bgcolor: inverseMode, color: iconColors}}>
        <Avatar src={userAvatar}/>
        {person}{text}
        <img height='30px' width='auto' src={photoUrl}/>
      </Paper>
    </div>
  );
};


export default Notification;
