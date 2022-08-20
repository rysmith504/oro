import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Paper, Modal, Box, Grid} from '../styles/material';
import { useTheme } from '@mui/material/styles';
import Comments from './Comments';

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

  const getPhoto = () => {
    axios.get('/api/eventFeed/photo', {
      params: {
        photoUrl,
      }
    })
      .then((photoObj) => {
        // console.log(photoObj);
        setPhoto(photoObj.data)
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getPhoto();
  }, [photoUrl]);


  const getPerson = () => {
    // console.log(notif.userId);
    axios.get('/api/comments/comment', {
      params: {
        commentId: notif.commentId,
      }
    })
      .then((commentData) => {
        setPhotoUrl(commentData.data.photoUrl);
        // console.log(data)
        axios.get(`/api/profile/${commentData.data.userId}`)
          .then((commenterData) => {
            // console.log(commenterData)
            setPerson(commenterData.data.fullName);
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
    // console.log(notif);
  }, []);

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
      <Paper sx={{margin: 'auto', marginTop: '5px', bgcolor: inverseMode, color: iconColors}}>
        {person}{text}
        <img height='30px' width='auto' src={photoUrl}/>
      </Paper>
    </div>
  );
};


export default Notification;
