import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import Notifications from '../pages/Notifications';
import EventListings from '../pages/EventListings';
import SongFinder from '../pages/SongFinder';
import Artists from '../pages/Artists';
import Login from '../pages/Login';
import EventDetails from '../pages/EventDetails';
import EventFeed from '../pages/EventFeed';
import OtherUser from '../pages/OtherUser';

import Navbar from '../components/Navbar';

import { ArtistContextProvider } from '../context/ArtistContext';
import { EventContextProvider } from '../context/EventContext';
import { UserContextProvider } from '../context/UserContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const themeDark = createTheme({
  palette: {
    background: {
      default: '#1A2027'
    },
    text: {
      primary: '#1A2027'
    }
  }
});

const App: React.FC = () => {
  // update React.FC, .FC deprecated?

  return (
    <ThemeProvider theme={themeDark}>
      <EventContextProvider>
        <UserContextProvider>
          <ArtistContextProvider>
            <div>
              <header>
                <Navbar/>
              </header>
              <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/notifications' element={<Notifications />} />
                <Route path='/eventListings' element={<EventListings />} />
                <Route path='/eventFeed' element={<EventFeed/>}/>
                <Route path='/songFinder' element={<SongFinder />} />
                <Route path='/artists' element={<Artists />} />
                <Route path='/details' element={<EventDetails />} />
                <Route path='/login' element={<Login />} />
                <Route path='/user' element={<OtherUser />} />
              </Routes>
            </div>
          </ArtistContextProvider>
        </UserContextProvider>
      </EventContextProvider>
    </ThemeProvider>
  );
};

export default App;
// <Link to='/eventDetails'>Event Details</Link>
