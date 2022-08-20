import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Paper} from '../styles/material';
import { useTheme } from '@mui/material/styles';

const Notification: React.FC = (props) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;
  // <YouTubeIcon key={'youtube'} sx={{ color: iconColors }} />
  // <CardContent sx={{ bgcolor: inverseMode }}></CardContent>
  // <Typography paragraph sx={{ bgcolor: inverseMode }}></Typography>
  const {notif} = props;
  const [person, setPerson] = useState('');
  const [text, setText] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

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
