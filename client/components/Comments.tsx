import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Paper, Grid} from '@mui/material';

const Comments: React.FC = (props) => {
  const {photo} = props;
  useEffect(() => {
    console.log(photo);
  }, []);
  

  const [commentsOpen, setCommentsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState([]);

  const showComments = () => {
    if (commentsOpen) {
      setCommentsOpen(false);
      // console.log('hidden');
    } else {
      setCommentsOpen(true);
      // console.log('shown');
    }
  };

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
        console.log(data)
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


    })
      .then(() => {
        setMessage('');
        getComments();
      })
      .catch((err) => console.error(err));
  };

  const commentsFeed = () => {
    // console.log('comments');
    if (commentsOpen) {
      return (
        <div>
          <Grid container>
            <Grid item xs={0} md={5}/>
            <Grid item xs={12} md={2}>
              <Paper>
                {comments.map((comment, i) => {
                  return (
                    <div key={i}>
                      {comment.comment}
                    </div>
                  );
                })}
              </Paper>
            </Grid>
            <Grid item xs={0} md={5}/>
          </Grid>
          <input onChange={(e) => handleComment(e)} value={message}></input>
          <button type='submit' onClick={handleSend}> Send </button>
        </div>
      );
    } else {
      return;
    }
  };

  return (
    <div>
      <div onClick={showComments}>
        {commentsOpen ? 'hide comments' : 'show comments'}
      </div>

      <div>
        {commentsOpen ? commentsFeed() : ''}
      </div>
    </div>
  );
};


export default Comments;
