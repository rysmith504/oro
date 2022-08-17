import React, {useState, useContext} from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import Notifications from '../pages/Notifications';
import EventListings from '../pages/EventListings';
import SongFinder from '../pages/SongFinder';
import Artists from '../pages/Artists';
import Login from '../pages/Login';

import { ArtistContextProvider } from '../context/ArtistContext';
import { EventContextProvider } from '../context/EventContext';
import { UserContextProvider } from '../context/UserContext';
import { ThemeContextProvider, ThemeContext } from '../context/ThemeContext';
import EventDetails from '../pages/EventDetails';
import EventFeed from '../pages/EventFeed';
import Navbar from '../components/Navbar';
import { Container } from '../components/Container';




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
            <Navbar />
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/notifications' element={<Notifications />} />
              <Route path='/eventListings' element={<EventListings />} />
              <Route path='/eventFeed' element={<EventFeed />} />
              <Route path='/songFinder' element={<SongFinder />} />
              <Route path='/artists' element={<Artists />} />
              <Route path='/details' element={<EventDetails />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </ArtistContextProvider>
        </UserContextProvider>
      </EventContextProvider>
    </Container>
  );
};

export default App;
