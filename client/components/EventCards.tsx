import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import moment from 'moment';
import { Grid,	Paper,	Typography, MusicOffIcon, ButtonBase, PushPinIcon
} from '../styles/material';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


const EventCards = ({events}) => {

  let date = events.dates.start.dateTime;
  date = moment(date).add(1, 'day').format('MMMM Do YYYY')}
  const image = events.images[0].url;

  console.log(events);

  const {
    name,
    url,
    info,
  } = events;

  // useEffect(() => {
  // }, []);

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="alt tag" src={image} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              {
                name === 'No events found'
                  ? <Typography variant="h6"><MusicOffIcon/>{name}</Typography>
                  : <Typography variant="h6">{name}</Typography>
              }
              <Typography variant="body2" gutterBottom>
                {date}
                {info}
                {url}
                {/* {venues.map((venue) => {
                  return (
                    <p key={venue.id}>{venue.name} {venue.address} {venue.city.name}, {venue.state.name}</p>
                  );
                })} */}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <PushPinIcon/>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EventCards;
