import React, { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
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
import axios from 'axios';

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

const SAMPLE_BUDGET_LIST = [
  { id: 1, name: 'Tickets' },
  { id: 2, name: 'Food' },
  { id: 3, name: 'Drinks' },
  { id: 4, name: 'Parking' },
  { id: 5, name: 'Merch' },
  { id: 6, name: 'Travel' },
];

const formatCurrency = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const BackPack: React.FC = () => {
  const { userEvents, getUserEvents, currentUserInfo } =
    useContext(UserContext);
  const [expanded, setExpanded] = React.useState('panel1');

  const [budgetList, setBudgetList] = React.useState([...SAMPLE_BUDGET_LIST]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  //console.log('currentUserInfo', currentUserInfo);
  useEffect(() => {
    getUserEvents();
  }, []);

  const handleBudgetChange = (value, index) => {
    console.log({ value, index });
    let newList = [...budgetList];
    newList[index]['value'] = parseInt(value, 10);
    setBudgetList(newList);
  };

  let totalSum = budgetList.reduce((prev, curr) => ( prev + (curr?.value ?? 0) ),0));

  console.log({ userEvents, totalSum });

  const handleSubmit = async () => { 
    const url = `api/eventa/budgetsubmit`;

    try { 
      axios.post(
        url, budgetList 
      ).then(resp => console.log("Successful budget"))
      .catch(err => console.log(err))

    } catch(err){ console.log(err)}
  }

  return (
    <Accordion
      expanded={expanded === 'panel1'}
      onChange={handleChange('panel1')}
    >
      <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
        <Typography>{userEvents.eventName}</Typography>
        <Typography>{userEvents.eventDate}</Typography>
      </AccordionSummary>
      <AccordionDetails>

        {budgetList?.map((item, index) => {
          return (
            <BudgetItem
              key={index}
              label={item.name}
              eventId={item.id}
              value={item.value}
              onChange={(e) => handleBudgetChange(e.target.value, index)}
            />
          );
        })}

        <div>Total: ${totalSum ? formatCurrency(totalSum) : 0}</div>
        <Button onClick={handleSubmit}>Submit Budget</Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default BackPack;
