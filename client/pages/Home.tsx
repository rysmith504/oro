import * as React from 'react';
import React, { useState, useEffect, useContext } from 'react';
import {Box, Grid, Item} from '../styles/material';
import { UserContext } from '../context/UserContext';
import { io } from 'socket.io-client';


const Home: React.FC = () => {


  
  const [socket, setSocket] = useState(null);
  const userContext = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(null);
  const {currentUserInfo} = userContext;
      
  const {value} = userContext;

  // const getUser = () => {
  //   setCurrentUser(currentUserInfo.id);
  // };
  useEffect(() => {
    console.log(currentUserInfo);
    // getUser();
  }, [])

  // useEffect(() => {
  //   console.log(currentUser);
  //   setSocket(io('http://localhost:3000'));
  // }, [currentUser]);

  // useEffect(() => {
  //   if (currentUserInfo.userId) {
  //     socket.emit('newUser', userId);
  //   }
  // }, [socket]);



  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12} md={12} item>
          <img src="/images/concert.jpg" width="50%"/>
        </Grid>
      </Grid>
    </Box>
  );
}


export default Home;
