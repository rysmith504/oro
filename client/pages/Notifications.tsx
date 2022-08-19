import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const Notifications: React.FC = () => {
  const userContext = useContext(UserContext);
  const {currentUserInfo} = userContext;

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications();

  }, []);


  const getNotifications = () => {
    axios.get('/api/notifications')
      .then((notificationsObj) => {
        console.log(notificationsObj.data);
        setNotifications(notificationsObj.data);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <div>
      <h1>Notifications</h1>
      <div>
        {notifications.map((notif, i) => {
          return (
            <div key={i}>
              {notif.commentId}
            </div>
          );
        })}
      </div>
    </div>

  );
};

export default Notifications;
