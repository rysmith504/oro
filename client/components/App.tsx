import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import NotificationsFeed from '../pages/NotificationsFeed';
import EventListings from '../pages/EventListings';
import SongFinder from '../pages/SongFinder';
import Artists from '../pages/Artists';
import Login from '../pages/Login';
import EventDetails from '../pages/EventDetails';
import EventFeed from '../pages/EventFeed';
import OtherUser from '../pages/OtherUser';
import TravelPlanner from '../pages/TravelPlanner';
import Navbar from '../components/Navbar';

import UserChat from '../pages/UserChat';
import { ArtistContextProvider } from '../context/ArtistContext';
import { EventContextProvider } from '../context/EventContext';
import { UserContextProvider } from '../context/UserContext';
import { ThemeContextProvider, ThemeContext } from '../context/ThemeContext';
import { Container } from '../components/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import BackPack from '../pages/BackPack';
import { io } from 'socket.io-client';
import {UserContext} from '../context/UserContext';

// https://styled-components.com/docs/api#createglobalstyle

const App: React.FC = () => {
  // update React.FC, .FC deprecated?
  const userContext = useContext(UserContext);
  const themeContext = useContext(ThemeContext);
  const [isDarkMode, setDarkMode] = useState(true);
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const {currentUserInfo} = userContext;

  // useEffect(() => {
  //   console.log(currentUserInfo.id);
  // }, [])

  useEffect(() => {
    setSocket(io('http://localhost:3000'));
  }, [currentUser]);

  // useEffect(() => {
  //   if (currentUserInfo.id) {
  //     socket.emit('newUser', userId);
  //   }

  // }, [socket]);

  return (
    <Container>
      <EventContextProvider>
        {/* <UserContextProvider> */}
          <ArtistContextProvider>
            <Navbar socket={socket}/>
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/notifications' element={<NotificationsFeed socket={socket}/>} />
              <Route path='/backpack' element={<BackPack />} />
              <Route path='/eventListings' element={<EventListings />} />
              <Route path='/eventFeed' element={<EventFeed socket={socket}/>} />
              <Route path='/songFinder' element={<SongFinder />} />
              <Route path='/artists' element={<Artists />} />
              <Route path='/details' element={<EventDetails />} />
              <Route path='/login' element={<Login />} />
              <Route path='/user' element={<OtherUser />} />
              <Route path='/travel-planner' element={<TravelPlanner />} />
              <Route path='/chat' element={<UserChat />} />
            </Routes>
          </ArtistContextProvider>
        {/* </UserContextProvider> */}
      </EventContextProvider>
    </Container>
  );
};

export default App;
