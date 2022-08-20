import React, { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import {
  ArrowForwardIosSharpIcon,
  MuiAccordion,
  MuiAccordionSummary,
  MuiAccordionDetails,
  Typography,
  List,
  ListItem,
  Button,
} from '../styles/material';
import BudgetItem from './BudgetItem';
import { useTheme } from '@mui/material/styles';
// const Accordion = styled((props) => (
//   <MuiAccordion children={''} disableGutters elevation={0} square {...props} />
// ))(({ theme }) => ({
//   border: `1px solid ${theme.palette.divider}`,
//   '&:not(:last-child)': {
//     borderBottom: 0,
//   },
//   '&:before': {
//     display: 'none',
//   },
// }));

// const AccordionSummary = styled((props) => (
//   <MuiAccordionSummary
//     expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
//     {...props}
//   />
// ))(({ theme }) => ({
//   backgroundColor:
//     theme.palette.mode === 'dark'
//       ? 'rgba(255, 255, 255, .05)'
//       : 'rgba(0, 0, 0, .03)',
//   flexDirection: 'row-reverse',
//   '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
//     transform: 'rotate(90deg)',
//   },
//   '& .MuiAccordionSummary-content': {
//     marginLeft: theme.spacing(1),
//   },
// }));

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//   padding: theme.spacing(2),
//   borderTop: '1px solid rgba(0, 0, 0, .125)',
// }));

const BackPack: React.FC = () => {
  const { userEvents, getUserEvents, currentUserInfo } =
    useContext(UserContext);
  const [expanded, setExpanded] = React.useState('panel1');

  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  // <YouTubeIcon key={'youtube'} sx={{ color: iconColors }} />
  // <CardContent sx={{ bgcolor: inverseMode }}></CardContent>
  // <Typography paragraph sx={{ bgcolor: inverseMode }}></Typography>
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  //console.log('currentUserInfo', currentUserInfo);
  useEffect(() => {
    getUserEvents();
  }, []);

  return (
    <Accordion
      // expanded={expanded === 'panel1'}
      onChange={handleChange('panel1')}
      sx={{ bgcolor: inverseMode, mt: '40px' }}
    >
      <AccordionSummary
        sx={{ bgcolor: inverseMode }}
        aria-controls='panel1d-content' id='panel1d-header'>
        <Typography>{userEvents.eventName}</Typography>
        <Typography>{userEvents.eventDate}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ color: inverseMode }}>
        <BudgetItem sx={{ color: inverseMode }} eventId={userEvents.eventId} label='Tickets' />
        <BudgetItem sx={{ color: inverseMode }} eventId={userEvents.eventId} label='Food' />
        <BudgetItem sx={{ color: inverseMode }} eventId={userEvents.eventId} label='Drinks' />
        <BudgetItem sx={{ color: inverseMode }} eventId={userEvents.eventId} label='Parking' />
        <BudgetItem sx={{ color: inverseMode }} eventId={userEvents.eventId} label='Merch' />
        <BudgetItem sx={{ color: inverseMode }} eventId={userEvents.eventId} label='Travel' />
      </AccordionDetails>
    </Accordion>
  );
};

export default BackPack;
