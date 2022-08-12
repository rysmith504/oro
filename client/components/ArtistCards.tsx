import React, { useNavigate } from 'react';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import {
  Box,	Grid,	Paper,	Card,	CardHeader,	CardMedia,	CardContent,	CardActions,	Collapse,	Typography,	FavoriteIcon,	ExpandMoreIcon,	YouTubeIcon,	TwitterIcon,	MusicNoteIcon,	FacebookIcon,	QuizIcon,	InstagramIcon,	LanguageIcon, Item
} from '../styles/material';
import EventCards from './EventCards';

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
    youtube: [youtube, <YouTubeIcon/>],
    twitter: [twitter, <TwitterIcon/>],
    facebook: [facebook, <FacebookIcon/>],
    instagram: [instagram, <InstagramIcon/>],
    homepage: [homepage, <LanguageIcon/>],
    itunes: [itunes, <MusicNoteIcon/>],
    wiki: [wiki, <QuizIcon/>],
  };
  const [expanded, setExpanded] = React.useState(false);
  // console.log(artist);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={artistName}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={artistName}
      />
      <CardContent>
        <Typography noWrap variant="body2" color="text.secondary">
          {bio}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Bio:</Typography>
          <Typography paragraph>
            {bio}
          </Typography>
          <Typography paragraph>Socials:</Typography>
          <Typography paragraph>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {Object.keys(socials).map((social) => {
                  return (
                    <Grid item key={social}>
                      <Item>
                        <a href={socials[social][0]}>{socials[social][1]}</a>
                      </Item>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Typography>
          <Typography paragraph>Events:</Typography>
          <EventCards />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ArtistInfoCard;
