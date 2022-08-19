import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

const Notification: React.FC = (props) => {
  const {notif} = props;
  const [person, setPerson] = useState('');
  const [text, setText] =  useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const getPerson = () => {
    // console.log(notif.userId);
    axios.get(`/api/profile/${notif.userId}`)
      .then((commenterData) => {
        // console.log(commenterData);
        setPerson(commenterData.data.fullName);
        axios.get('/api/comments/comment', {
          params: {
            commentId: notif.commentId,
          }
        })
          .then((commentData) => {
            console.log(commentData);
            setPhotoUrl(commentData.data.photoUrl);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getType = () => {
    if (notif.type === 'comment') {
      setText(' commented on your photo');
    }
  };

  useEffect(() => {
    getPerson();
    getType();
    console.log(notif);
  }, []);

  return (
    <div>
      {person}{text}
      <img height='30px' width='auto' src={photoUrl}/>
    </div>
  );
};


export default Notification;
