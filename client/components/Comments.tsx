import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import {Fab, OutlinedInput } from '../styles/material';
import SendIcon from '@mui/icons-material/Send';
import Comment from './Comment';
import { useTheme } from '@mui/material/styles';
import { CssTextField } from '../styles/material';
const Comments: React.FC = (props) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;


  const userContext = useContext(UserContext);
  const {currentUserInfo} = userContext;

  const {photo} = props;
  useEffect(() => {
  }, []);


  // const [commentsOpen, setCommentsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState([]);

  // const showComments = () => {
  //   if (commentsOpen) {
  //     setCommentsOpen(false);
  //     // console.log('hidden');
  //   } else {
  //     setCommentsOpen(true);
  //     // console.log('shown');
  //   }
  // };

  const fontColor = {
    style: { color: '#9B27B0' }
  };

  { /* <CssTextField InputLabelProps={fontColor} inputProps={fontColor} id="keywordSearch" color="secondary" label="search events" type='text' onChange={ handleChange } value={keyword} onKeyDown={enterClick} /> */ }

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    await axios.get('/api/comments', {
      params: {
        photoUrl: photo.photoUrl
      }
    })
      .then((commentData) => {
        setComments(commentData.data);
      })
      .catch((err) => console.error(err));
  };

  const handleComment = (e) => {
    // console.log(e.target.value);
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    await axios.post('/api/comments', {
      comment: message,
      photoUrl: photo.photoUrl,
      userId: currentUserInfo.id,
      ownerId: photo.userId,


    })
      .then((commentData) => {
        // console.log(commentData);
        setMessage('');
        getComments();
        axios.post('/api/notifications', {
          ownerId: photo.userId,
          commentId: commentData.data.id,
        })
          .then((notificationData) => {
            console.log('notif', notificationData);
          })
          .catch((err) => console.error(err));

      })
      .catch((err) => console.error(err));
  };


  return (
    <div>

      {comments.map((comment, i) => {
        return (
          <Comment key={i} comment={comment}/>
        );
      })}

      <CssTextField InputLabelProps={fontColor} inputProps={fontColor} sx={{ ml: '15px'}} color="secondary" size='small' onChange={(e) => handleComment(e)} value={message}/>
      <Fab variant='extended' type='submit' onClick={handleSend}
        sx={{bgcolor: inverseMode}}><SendIcon sx={{ color: iconColors}}/></Fab>
    </div>
  );
};


export default Comments;
