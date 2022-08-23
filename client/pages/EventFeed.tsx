import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Comments from '../components/Comments';
import {OutlinedInput, Fab, Box, SpeedDial} from '../styles/material';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { styled } from '@mui/material';
import { EventContext } from '../context/EventContext';
import { UserContext } from '../context/UserContext';
import { useSearchParams } from 'react-router-dom';
import FeedPhoto from '../components/FeedPhoto';
import { useTheme } from '@mui/material/styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';



const EventFeed: React.FC = () => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const userContext = useContext(UserContext);
  const {currentUserInfo} = userContext;
  const { getEventDetails, eventDetails } = useContext(EventContext);
  const [expanded, setExpanded] = React.useState(false);
  const [previewSource, setPreviewSource] = useState();
  const [photo, setPhoto] = useState(null);
  const [feedPhotos, setFeedPhotos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [eventName, setEventName] = useState('');

  const eventId = searchParams.get('id');


  useEffect(() => {
    if (photo) {
      const reader = new FileReader();
      reader.readAsDataURL(photo);

      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
    }
  }, [photo]);

  const updateFeed = () => {
    axios.get('/api/eventFeed', {
      params: {
        eventId,
      }
    })
      .then((responseObj) => {
        setFeedPhotos(responseObj.data.reverse());
      })
      .catch((err) => console.error(err));
  };
  const getEvent = () => {
    axios.get('/api/eventDetails', {
      params: {
        id: eventId
      }
    })
      .then((eventData) => {
        console.log(eventData)
        setEventName(eventData.data.name);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getEvent();
    updateFeed();
  }, []);

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setPhoto(e.target.files[0]);
  };

  useEffect(() => {
    handleFileUpload();
  }, [previewSource])
  const handleFileUpload = () => {
    if (photo) {
      const formData = new FormData();
      formData.append('myFile', photo, photo.name);

      // console.log(photo, photo.name);
      // console.log('uploaded');
      axios.post('/api/eventFeed', {
        imageData: previewSource,
        eventId,
        userId: currentUserInfo.id
      })
        .then(() => updateFeed())
        .catch((err) => console.error(err));
      setPhoto(null);
    }
  };

  const uploadPhoto = async () => {
    await document.getElementById('fileUpload')?.click();
    
  }
  return (
    <div>

      <h1>
        {eventName}
      </h1>


      {feedPhotos.map((photo, i) => {
        return (
          <div key={i} margin-top="30px">
            <FeedPhoto photo={photo}/>
          </div>
        );
      })}
      <Box sx={{position: 'sticky'}}>
        <OutlinedInput sx={{mt: '20px', display: 'none'}} accept="image/*" type='file' id='fileUpload' name='image' onChange={handleFileChange}/>
        <Fab
          size='small'
          onClick={uploadPhoto}
          sx={{
            ml: '20px',
            bgcolor: inverseMode,
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed'}}>
          <AddPhotoAlternateIcon/>
        </Fab>
      </Box>
    </div>
  );

  // } else {
  //   return (
  //     <div>
  //       Please Log in to use the app
  //     </div>
  //   )
  // }
};

export default EventFeed;
