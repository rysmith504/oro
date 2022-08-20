import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserPhotos from '../components/UserPhotos';
import { UserContext } from '../context/UserContext';
import { styled } from '@mui/material/styles';
import { ArrowForwardIosSharpIcon, MuiAccordion, MuiAccordionSummary, MuiAccordionDetails, Typography, List, ListItem, Button, Avatar } from '../styles/material';
import { useTheme } from '@mui/material/styles';

const Accordion = styled((props) => (
  <MuiAccordion children={''} disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const Profile: React.FC = () => {
  const { userEvents, getUserEvents, currentUserInfo } = useContext(UserContext);
  const [userPhotos, setUserPhotos] = useState([]);
  const [expanded, setExpanded] = React.useState('panel1');
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  // <YouTubeIcon key={'youtube'} sx={{ color: iconColors }} />
  // <CardContent sx={{ bgcolor: inverseMode }}></CardContent>
  // <Typography paragraph sx={{ bgcolor: inverseMode }}></Typography>
  const getUserPhotos = () => {
    axios.get(`/api/profile/event_photos/${currentUserInfo.id}`)
      .then(({ data }) => {
        setUserPhotos(data);
      })
      .catch(err => console.error(err));
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    getUserEvents();
    getUserPhotos();
  }, []);

  if (currentUserInfo.id) {
    return (
      <div>
        <h1>Hello {currentUserInfo.name.givenName}</h1>
        <Avatar
          alt={currentUserInfo.displayName}
          src={currentUserInfo.photos[0].value}
          sx={{ width: 56, height: 56 }}
        />
        <div>
          <Accordion sx={{ bgcolor: inverseMode }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary sx={{ bgcolor: inverseMode }} aria-controls="panel1d-content" id="panel1d-header">
              <Typography>{userEvents.eventName}</Typography>
              <Typography>{userEvents.eventDate}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: inverseMode }}>
              <List>
                <ListItem>Venue: {userEvents.venue}</ListItem>
                <ListItem>
                Location: {userEvents.address}, {userEvents.city}, {userEvents.state}, {userEvents.postalCode}
                </ListItem>
                <ListItem>Ticket sale starts: {userEvents.saleStart}</ListItem>
                <ListItem>Ticket sale ends: {userEvents.saleEnd}</ListItem>
                <Button sx={{ bgcolor: iconColors, color: inverseMode }} onClick={() => { location.href = userEvents.link; }}>Purchase Tickets</Button>
              </List>
            </AccordionDetails>
          </Accordion>
        </div>
        <UserPhotos photos={userPhotos}/>
      </div>
    );
  } else if (!currentUserInfo.length) {
    return (
      <h1>Please Sign In To View Profile</h1>
    );
  }
};

export default Profile;
