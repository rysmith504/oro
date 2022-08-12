import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import axios from 'axios';

import { Grid,	Paper,	Typography, MusicOffIcon, ButtonBase, PushPinIcon
} from '../styles/material';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


const EventCards = (props) => {
  const { events } = props;
  const { name, image, description } = events;

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
                {description}
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
