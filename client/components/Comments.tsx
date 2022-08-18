import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { Paper, Grid} from '@mui/material';

const Comments: React.FC = (props) => {

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
    await axios.get('/comments', {
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

  const handleSend = () => {
    axios.post('/comments', {
      comment: message,
      photoUrl: photo.photoUrl,
      userId: currentUserInfo.id


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
          <div key={i}>
            {comment.comment}
          </div>
        );
      })}

      <input onChange={(e) => handleComment(e)} value={message}></input>
      <button type='submit' onClick={handleSend}> Send </button>
    </div>
  );
};


export default Comments;
