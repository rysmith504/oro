import React, { useNavigate } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FacebookIcon from '@mui/icons-material/Facebook';
import QuizIcon from '@mui/icons-material/Quiz';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import {Box, Grid, Paper } from '../styles/material';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#212121',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

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

const ArtistInfoCard = ({artistProps: { favArtist }}) => {
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
  } = favArtist;
  
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
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
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
                <Grid item>
                  <Item>
                    <a href={youtube}><YouTubeIcon/></a>
                  </Item>
                </Grid>
                <Grid item>
                  <Item>
                    <a href={twitter}><TwitterIcon/></a>
                  </Item>
                </Grid>
                <Grid item>
                  <Item>
                    <a href={facebook}><FacebookIcon/></a>
                  </Item>
                </Grid>
                <Grid item>
                  <Item>
                    <a href={instagram}><InstagramIcon/></a>
                  </Item>
                </Grid>
                <Grid item>
                  <Item>
                    <a href={homepage}><LanguageIcon/></a>
                  </Item>
                </Grid>
                <Grid item>
                  <Item>
                    <a href={itunes}><MusicNoteIcon/></a>
                  </Item>
                </Grid>
                <Grid item>
                  <Item>
                    <a href={wiki}><QuizIcon/></a>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ArtistInfoCard;
