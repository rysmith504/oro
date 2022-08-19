import React, {useState, useContext} from 'react';
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

import { ArtistContextProvider } from '../context/ArtistContext';
import { EventContextProvider } from '../context/EventContext';
import { UserContextProvider } from '../context/UserContext';
import { ThemeContextProvider, ThemeContext } from '../context/ThemeContext';
import { Container } from '../components/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';




// https://styled-components.com/docs/api#createglobalstyle

const App: React.FC = () => {
  // update React.FC, .FC deprecated?
  const themeContext = useContext(ThemeContext);
  const [isDarkMode, setDarkMode] = useState(true);

  return (
    <Container>
      <EventContextProvider >
        <UserContextProvider>
          <ArtistContextProvider>
            <Navbar/>
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/notifications' element={<NotificationsFeed />} />
              <Route path='/eventListings' element={<EventListings />} />
              <Route path='/eventFeed' element={<EventFeed/>}/>
              <Route path='/songFinder' element={<SongFinder />} />
              <Route path='/artists' element={<Artists />} />
              <Route path='/details' element={<EventDetails />} />
              <Route path='/login' element={<Login />} />
              <Route path='/user' element={<OtherUser />} />
              <Route path='/travel-planner' element={<TravelPlanner />} />
            </Routes>
          </ArtistContextProvider>
        </UserContextProvider>
      </EventContextProvider>
    </Container>
  );
};

export default App;
