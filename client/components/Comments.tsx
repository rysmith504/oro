import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import {Fab, OutlinedInput } from '../styles/material';
import SendIcon from '@mui/icons-material/Send';
import Comment from './Comment';
import { useTheme } from '@mui/material/styles';

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

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    await axios.get('/api/comments', {
      params: {
        photoUrl: photo.photoUrl
      }
    })
      .then((data) => {
        // console.log(data)
        setComments(data.data);
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
      .then(() => {
        setMessage('');
        getComments();
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

      <OutlinedInput size='small' onChange={(e) => handleComment(e)} value={message}></OutlinedInput>
      <Fab variant='extended' type='submit' onClick={handleSend}><SendIcon/></Fab>
    </div>
  );
};


export default Comments;
