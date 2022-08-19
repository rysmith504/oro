import { Button, Checkbox, List, ListItem, TextField } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
function BudgetItem(props: any) {
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
    //console.log('Customer Submitted Budget', formData);
  };
  return (
    <>
      <List>
        <ListItem>
          <TextField
            label={`Enter your budget ${props.label}?`}
            variant='outlined'
            onChange={(e) =>
              setFormData({ ...formData, budget: e.target.value })
            }
          />
          <Button onClick={handleBudgetSubmit}>Submit Budget</Button>
        </ListItem>
      </List>
    </>
  );
}
export default BudgetItem;
