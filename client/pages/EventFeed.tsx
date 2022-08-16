import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comments from '../components/Comments';
import { Grid, ImageList, ImageListItem, OutlinedInput, Fab} from '@mui/material';

const EventFeed: React.FC = () => {

  const [previewSource, setPreviewSource] = useState();
  const [photo, setPhoto] = useState(null);
  const [feedPhotos, setFeedPhotos] = useState([]);

  useEffect(() => {
    updateFeed();
  }, []);

  const updateFeed = () => {
    axios.get('/eventFeed')
      .then((responseObj) => {
        console.log(responseObj);
        setFeedPhotos(responseObj.data);
      })
      .catch((err) => console.error(err));
  };


  const handleFileChange = (e) => {
    // console.log("photo changed");
    setPhoto(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (photo) {
      const formData = new FormData();
      formData.append("myFile", photo, photo.name);

      console.log(photo, photo.name);
      console.log('uploaded');
      axios.post('/eventFeed', {
        data: previewSource
      })
        .then(() => updateFeed())
        .catch((err) => console.error(err));

      // await axios
      //   .post('/api/gallery', {
      //     data: previewSource,
      //   })
      //   .then(() => {})
      //   .catch((err) => console.error(err));
      setPhoto(null);
    }
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



  return (
    <div>
      <div>Hello EventFeed</div>
      <div>
        {/* <ImageList cols={1} sx={{width: 300, height: 600}}> */}
        {feedPhotos.map((photo, i) => {
          return (
            <div key={i}>
              <div style={{textAlign: 'left'}}>
                {photo.userId}
              </div>
              {/* <ImageListItem> */}
              <img width='200px' height='auto' src={photo.photoUrl}/>
              {/* </ImageListItem> */}
              <div>
                <Comments eventId={photo.eventAPIid} />
              </div>
            </div>
          );
        })}
        {/* </ImageList> */}
      </div>

      <OutlinedInput accept="image/*" type='file' name='image' onChange={handleFileChange}/>
      <Fab variant='extended' size='small' onClick={handleFileUpload}>
              Upload
      </Fab>
    </div>
  );
};

export default EventFeed;


{/* <Grid container>
<Grid item xs={0} md={5}/>
<Grid item xs={1}>
  <div>
    {photo.userId}
  </div>
</Grid>

<Grid item xs={11} md={1}>
  <div>
    <img width='200px' height='auto' src={photo.photoUrl}/>
  </div>
  <div style={{textAlign: 'right'}} >see all comments</div>

</Grid>
<Grid item xs={0} md={5}/>
</Grid> */}