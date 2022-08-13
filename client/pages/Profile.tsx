import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Profile: React.FC = () => {
  const { userEvents, setUserEvents, getUserEvents } = useContext(UserContext);

  useEffect(() => {
    getUserEvents();
  }, []);

  console.log(userEvents.name);

  return (
    <div>Hello Profile</div>
  );
};

export default Profile;
