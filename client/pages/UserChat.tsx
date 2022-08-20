import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
// import styled from 'styled-components';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Contacts from '../components/Contacts';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ChatContainer from '../components/ChatContainer';
import { useTheme } from '@mui/material/styles';

const UserChat: React.FC = () => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const userContext = useContext(UserContext);
  const { currentUserInfo, userContacts } = userContext;
  const currentUser = currentUserInfo;
  const [ currentChat, setCurrentChat ] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log('USERCNTACTS CHAT', userContacts);
    // console.log('currentuser chat', currentUserInfo)
  }, []);
  // useEffect(() => {
  //   if (!currentUserInfo.id) {
  //     navigate('/login');
  //   // } else if(currentUser) {
  //   //   setCurrentUser(currentUser);
  //   //   setContacts(userContacts)
  //   // }
  //   // if(currentUser){
  //   //   setUserImage(currentUser.profileURL)
  //   }
  // }, [currentUserInfo]);
  const obj = {googleId: '88'}

  //WORKING LOGIN REDIRECT
  useEffect(() => {
    if (!currentUserInfo.id) {
      navigate('/login');
      }
    }, [currentUserInfo]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ bgcolor: inverseMode }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                href='/profile'
                sx={{ mr: 2 }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {currentUser.fullName}
              </Typography>
              <Button sx={{ color: iconColors }}>< RateReviewIcon /></Button>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <React.Fragment>
        <Grid container columns={3} columnSpacing={0}>
          <Grid item xs={1} key='contactscontainer' maxWidth="sm">
            <Box sx={{ bgcolor: '#0D1013', height: 'auto', width: 'flex' }}>
              <Contacts key='contacts' changeChat={handleChatChange} />
            </Box>
          </Grid>
          <Grid item xs={2} key='chatcontainer' maxWidth='sm'>
            <Box sx={{ bgcolor: '#0D1013', height: 'auto', width: 'flex' }}>
              <ChatContainer currentChat={currentChat} />
            </Box>
          </Grid>
        </Grid>
      </React.Fragment>
    </div>
  );
};


export default UserChat;
