import React, { useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import {
  Box,	Grid,	Card,	CardHeader,	CardMedia,	CardContent,	CardActions,	Collapse,	Typography,	FavoriteIcon,	ExpandMoreIcon,	YouTubeIcon,	TwitterIcon,	MusicNoteIcon,	FacebookIcon,	QuizIcon,	InstagramIcon,	LanguageIcon, Item
} from '../styles/material';
import EventCards from './EventCards';
import axios from 'axios';
import { ThemeContext } from '../context/ThemeContext';
import { useTheme } from '@mui/material/styles';

// import { StyledCard } from './Theme';
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
  // console.log(artistProps);
  const theme = useTheme();
  console.log(theme);
  const themeContext = useContext(ThemeContext);
  const {mode, setMode, toggleMode} = themeContext;
  console.log(mode);
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

  // console.log(image);
  // if (!image.length) {
  //   image = 'https://source.unsplash.com/random/?music-festival';
  // }

  const socials = {
    youtube: [youtube, <YouTubeIcon key={'youtube'}/>],
    twitter: [twitter, <TwitterIcon key={'twitter'}/>],
    facebook: [facebook, <FacebookIcon key={'fb'}/>],
    instagram: [instagram, <InstagramIcon key={'insta'}/>],
    homepage: [homepage, <LanguageIcon key={'homepage'}/>],
    itunes: [itunes, <MusicNoteIcon key={'music'}/>],
    wiki: [wiki, <QuizIcon key={'wiki'}/>],
  };
  // console.log(artist);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getArtistEvents = (artist) => {
    const noSpecialChars: string = artist
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    axios.get('/favArtists/events', { params: { keyword: noSpecialChars } })
      .then((responseObj) => {
        setEvents(responseObj.data.events);
      })
      .catch(err => console.error(err));
  };

  return (
    // <StyledCard>
    <Card sx={{ bgcolor: theme.palette.secondary.main }}>
      <CardHeader
        title={artistName}
        sx={{ bgcolor: theme.palette.secondary.main }}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={artistName}
        sx={{ bgcolor: theme.palette.secondary.main }}
      />
      <CardContent sx={{ bgcolor: theme.palette.secondary.main }}>
        <Typography noWrap variant="body2">
          {bio}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ bgcolor: theme.palette.secondary.main }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon sx={{ bgcolor: theme.palette.secondary.main }}/>
        </IconButton>
        <ExpandMore
          expand={expanded}
          sx={{ bgcolor: theme.palette.secondary.main }}
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
          <Typography paragraph sx={{ bgcolor: theme.palette.secondary.main }}>Bio:</Typography>
          <Typography paragraph sx={{ bgcolor: theme.palette.secondary.main }}>
            {bio}
          </Typography>
          <Typography paragraph sx={{ bgcolor: theme.palette.secondary.main }}>Socials:</Typography>
          <Typography paragraph sx={{ bgcolor: theme.palette.secondary.main }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {Object.keys(socials).map((social, index) => {
                  return (
                    <Grid item key={`social${index}`}>
                      <Item>
                        <a href={socials[social][0]}>{socials[social][1]}</a>
                      </Item>
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
                    <Typography paragraph sx={{ bgcolor: theme.palette.secondary.main }}>Events:</Typography>
                    { events.map((eventObj, index) => {
                      return <EventCards events={eventObj} key={`event${index}`}/>;
                    })}
                  </Grid>
                  : <Typography paragraph sx={{ bgcolor: theme.palette.secondary.main }}>No Upcoming Events</Typography>
              }
            </Grid>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
    // </StyledCard>
  );
};

export default ArtistInfoCard;
