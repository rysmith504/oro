import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comments from '../components/Comments';
import { Grid, ImageList, ImageListItem, OutlinedInput, Fab} from '@mui/material';

const EventFeed: React.FC = () => {

  const [previewSource, setPreviewSource] = useState();
  const [photo, setPhoto] = useState(null);
  let dummyData = [
    {
      userId: 1,
      photoUrl: 'https://cdn.britannica.com/92/100692-050-5B69B59B/Mallard.jpg',
      eventApiID: 'test',
      createdAt: '2022-08-15'
    },
    {
      userId: 2,
      photoUrl: 'https://www.thespruce.com/thmb/t13CIs9CH0HfuggdQ-DU9zk_QHo=/3780x2126/smart/filters:no_upscale()/do-ducks-have-teeth-4153828-hero-9614a7e9f4a049b48e8a35a9296c562c.jpg',
      eventApiID: 'test',
      createdAt: '2022-08-14'
    },
    {
      userId: 1,
      photoUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/how-to-keep-ducks-call-ducks-1615457181.jpg',
      eventApiID: 'test',
      createdAt: '2022-08-13'
    },
  ];

  const handleFileChange = (e) => {
    // console.log("photo changed");
    setPhoto(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (photo) {
      const formData = new FormData();
      formData.append("myFile", photo, photo.name);

      console.log(photo, photo.name);
      console.log('uploaded');
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
        {dummyData.map((photo, i) => {
          return (
            <div key={i}>
              <div style={{textAlign: 'left'}}>
                {photo.userId}
              </div>
              {/* <ImageListItem> */}
              <img width='200px' height='auto' src={photo.photoUrl}/>
              {/* </ImageListItem> */}
              <div>
                <Comments eventId={photo.eventApiID} />
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