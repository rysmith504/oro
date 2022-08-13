import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import moment from 'moment';
import { Grid,	Paper,	Typography, MusicOffIcon, ButtonBase, PushPinIcon, LocalActivityIcon, CalendarMonthIcon, InfoIcon
} from '../styles/material';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


const EventCards = ({events}) => {

  let date = events.dates.start.dateTime;
  date = moment(date).add(1, 'day').format('MMMM Do YYYY');
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
          <ButtonBase>
            <PushPinIcon/>
          </ButtonBase>
        </Grid>
        <Grid item xs={12} container>
          <Grid item container direction="column" spacing={2}>
            <Grid item>
              <Img alt="alt tag" src={image} />
            </Grid>
            <Grid item>
              <Typography variant="h6">{name}</Typography>
            </Grid>
            <Grid item>
              <CalendarMonthIcon/>{date}
            </Grid>
            <Grid item>
              <InfoIcon/>{info}
            </Grid>
            <Grid item>
              <LocalActivityIcon/>{url}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EventCards;
