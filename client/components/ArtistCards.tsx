import React, { useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import {
  Box,	Grid,	Card,	CardHeader,	CardMedia,	CardContent,	CardActions,	Collapse,	Typography,	FavoriteIcon,	ExpandMoreIcon,	YouTubeIcon,	TwitterIcon,	MusicNoteIcon,	FacebookIcon,	QuizIcon,	InstagramIcon,	LanguageIcon
} from '../styles/material';
import EventCards from './EventCards';
import axios from 'axios';
import { ThemeContext } from '../context/ThemeContext';
import { useTheme } from '@mui/material/styles';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const ArtistInfoCard = ({artistProps}) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const themeContext = useContext(ThemeContext);
  const {mode, setMode, toggleMode} = themeContext;
  const [expanded, setExpanded] = React.useState(false);
  const [events, setEvents] = useState(
    [{
      name: 'No events found',
      image: '/images/patrick-perkins-pay-artists.jpg',
      description: 'There are currently no events found for this artist.',
      id: 1001,
    }]
  );
  const {
    artistName,
    bio,
    facebook,
    homepage,
    image,
    instagram,
    itunes,
    twitter,
    wiki,
    youtube,
  } = artistProps;

  const socials = {
    youtube: [youtube, <YouTubeIcon key={'youtube'} sx={{ color: iconColors }} />],
    twitter: [twitter, <TwitterIcon key={'twitter'} sx={{ color: iconColors }}/>],
    facebook: [facebook, <FacebookIcon key={'fb'} sx={{ color: iconColors }}/>],
    instagram: [instagram, <InstagramIcon key={'insta'} sx={{ color: iconColors }}/>],
    homepage: [homepage, <LanguageIcon key={'homepage'} sx={{ color: iconColors }}/>],
    itunes: [itunes, <MusicNoteIcon key={'music'} sx={{ color: iconColors }}/>],
    wiki: [wiki, <QuizIcon key={'wiki'} sx={{ color: iconColors }}/>],
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getArtistEvents = (artist) => {
    const noSpecialChars: string = artist
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    axios.get('/api/favArtists/events', { params: { keyword: noSpecialChars } })
      .then((responseObj) => {
        setEvents(responseObj.data.events);
      })
      .catch(err => console.error(err));
  };

  return (
    <Card sx={{ bgcolor: inverseMode }}>
      <CardHeader
        title={artistName}
        sx={{ bgcolor: inverseMode }}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={artistName}
        sx={{ bgcolor: inverseMode }}
      />
      <CardContent sx={{ bgcolor: inverseMode }}>
        <Typography noWrap variant="body2">
          {bio}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ bgcolor: inverseMode }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon sx={{ color: iconColors }}/>
        </IconButton>
        <ExpandMore
          expand={expanded}
          sx={{ color: iconColors }}
          onClick={()=>{
            handleExpandClick();
            getArtistEvents(artistName);
          }}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent id={artistName}>
          <Typography paragraph sx={{ bgcolor: inverseMode }}>Bio:</Typography>
          <Typography paragraph sx={{ bgcolor: inverseMode }}>
            {bio}
          </Typography>
          <Typography paragraph sx={{ bgcolor: inverseMode }}>Socials:</Typography>
          <Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {Object.keys(socials).map((social, index) => {
                  return (
                    <Grid item key={`social${index}`}>
                      <IconButton>
                        <a href={socials[social][0]}>{socials[social][1]}</a>
                      </IconButton>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {
                events.length > 1
                  ? <Grid item id={artistName}>
                    <Typography paragraph sx={{ bgcolor: inverseMode }}>Events:</Typography>
                    { events.map((eventObj, index) => {
                      return <EventCards events={eventObj} key={`event${index}`}/>;
                    })}
                  </Grid>
                  : <Typography paragraph sx={{ bgcolor: inverseMode }}>No Upcoming Events</Typography>
              }
            </Grid>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ArtistInfoCard;
