import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Comments from '../components/Comments';
import { OutlinedInput, Fab, styled, Button, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, Typography, IconButton } from '@mui/material';
import { EventContext } from '../context/EventContext';
import { useSearchParams } from 'react-router-dom';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const EventFeed: React.FC = () => {
  const { getEventDetails, eventDetails } = useContext(EventContext)
  const [expanded, setExpanded] = React.useState(false);
  const [previewSource, setPreviewSource] = useState();
  const [photo, setPhoto] = useState(null);
  const [feedPhotos, setFeedPhotos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const eventId = searchParams.get('id');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
    axios.get('/eventFeed', {
      params: {
        eventId,
      }
    })
      .then((responseObj) => {
        setFeedPhotos(responseObj.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    console.log(eventId);
    updateFeed();
  }, []);

  const handleFileChange = (e) => {
    // console.log("photo changed");
    setPhoto(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (photo) {
      const formData = new FormData();
      formData.append('myFile', photo, photo.name);

      // console.log(photo, photo.name);
      // console.log('uploaded');
      axios.post('/eventFeed', {
        imageData: previewSource,
        eventId,
      })
        .then(() => updateFeed())
        .catch((err) => console.error(err));
      setPhoto(null);
    }
  };


  return (
    <div>
      <div>Hello EventFeed</div>

      {feedPhotos.map((photo, i) => {
        return (
          <div key={i}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar alt={photo.userId}/>
                }
                subheader={photo.createdAt}
              />
              <CardMedia
                component="img"
                height="194"
                image={photo.photoUrl}
              />
              <CardContent>
                <Typography variant='body2'>
                  This festival was dope!
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <Button>Comments</Button>
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography>
                    <Comments photo={photo} />
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </div>
        );
      })}

      <OutlinedInput accept="image/*" type='file' name='image' onChange={handleFileChange}/>
      <Fab variant='extended' size='small' onClick={handleFileUpload}>
              Upload
      </Fab>
    </div>
  );
};

export default EventFeed;
