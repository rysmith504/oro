import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Comments from '../components/Comments';
import {Button, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, Typography, IconButton } from '../styles/material';
import { styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';

const FeedPhoto: React.FC = (props) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const {photo} = props;
  const [profilePic, setProfilePic] = useState('');
  const [expanded, setExpanded] = React.useState(false);
  const [captionText, setCaptionText] = useState('');
  const [editor, setEditor] = useState(false);

  useEffect(() => {
    getAvatar();
  }, []);

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    margin: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getAvatar = async () => {
    await axios.get('/api/eventFeed/avatar', {
      params: {
        userId: photo.userId
      }
    })
      .then((userProfile) => {
        setProfilePic(userProfile.data);
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (e) => {
    setCaptionText(e.target.value);
  };
  const handleSubmitEdit = () => {
    axios.put('/api/eventFeed', {
      photoUrl: photo.photoUrl,
      caption: captionText,
    })
      .then(() => {
        setCaptionText('');
        setEditor(false);
      })
      .catch((err) => console.error(err));
  }

  const openEditor = () => {
    setEditor(true);
  };

  const closeEditor = () => {
    setEditor(false);
    setCaptionText('');
  };


  return (
    <div>
      {/* <Modal style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} sx={{overflow: 'scroll'}} open={modalStatus} onClose={handleClose}>
        <Box sx={{margin: 'auto', bgcolor: inverseMode, width: 400, alignItems: 'left', justifyContent: 'left', pt: '20px', outline: 'none'}}>

          <img width='350px' height='auto' src={photo.photoUrl}/>
          <Grid container sx={{mt: '20px'}}>
            <Comments photo={photo}/>
          </Grid>
        </Box>
      </Modal> */}
      <Card sx={{ maxWidth: 400, margin: 'auto', mt: '20px'}}>
        <CardHeader
          avatar={
            <Link to={`/user/?id=${photo.userId}`}>
              <Avatar src={profilePic} />
            </Link>
          }
          subheader={<Typography textAlign='right' sx={{ bgcolor: inverseMode }}>{moment(photo.created_at).calendar()}</Typography>}
          sx={{ bgcolor: inverseMode }}
        />
        <CardMedia
          component="img"
          height="194"
          image={photo.photoUrl}
          sx={{ bgcolor: inverseMode }}
        />
        <CardContent sx={{ bgcolor: inverseMode }}>
          <Typography variant='body2' sx={{ bgcolor: inverseMode }}>
            <span>
              {!editor && photo.caption}
            </span>
            {editor && <input placeholder={photo.caption} value={captionText} onChange={handleEdit}/>}
            {editor && <button onClick={handleSubmitEdit}>confirm changes</button>}
            {editor && <button onClick={closeEditor}>cancel</button>}
            <span onClick={openEditor}>
              <Typography textAlign='right' sx={{ color: iconColors, mb: '20px', ml: '5px'}}>edit</Typography>
            </span>
          </Typography>
        </CardContent>
        <CardActions
          sx={{ bgcolor: inverseMode }}
          disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <Button sx={{ color: iconColors }}>see all comments</Button>
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ bgcolor: inverseMode }}>
            <Typography sx={{ bgcolor: inverseMode }}>
              <Comments photo={photo}/>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default FeedPhoto;
