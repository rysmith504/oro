/* eslint-disable func-style */
import { Button, Checkbox, List, ListItem, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
function BudgetItem(props: any) {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  // <YouTubeIcon key={'youtube'} sx={{ color: iconColors }} />
  // <CardContent sx={{ bgcolor: inverseMode }}></CardContent>
  // <Typography paragraph sx={{ bgcolor: inverseMode }}></Typography>

  const [formData, setFormData] = useState({
    itemName: props.label,
    budget: 0,
    event_id: 0,
    customer_id: 0,
  });

  const handleBudgetSubmit = async () => {
    formData.event_id = props.eventId;
    axios
      .post('/api/events/budgetsubmit', formData)
      .then((events) => {
        console.log('Successfully submitted budget');
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <List>
        <ListItem>
          <TextField
            sx={{ bgcolor: iconColors, color: iconColors, mr: '20px' }}
            label={`Enter your ${props.label} budget`}
            onChange={(e) =>
              setFormData({ ...formData, budget: e.target.value })
            }
          />
          <Button
            sx={{ bgcolor: iconColors, color: inverseMode }}
            onClick={handleBudgetSubmit}>Submit Budget</Button>
        </ListItem>
      </List>
    </>
  );
}
export default BudgetItem;
