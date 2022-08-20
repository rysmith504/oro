import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Notification from '../components/Notification';

const NotificationsFeed: React.FC = () => {
  const userContext = useContext(UserContext);
  const {currentUserInfo} = userContext;

  const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    getNotifications();

  }, []);


  const getNotifications = () => {
    axios.get('/api/notifications', {
      params: {
        userId: currentUserInfo.id
      }
    })
      .then((notificationsObj) => {
        // console.log(notificationsObj.data);
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
              
              <Notification notif={notif}/>
            </div>
          );
        })}
      </div>
    </div>

  );
};

export default NotificationsFeed;
