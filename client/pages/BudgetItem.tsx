/* eslint-disable func-style */
import { Checkbox, List, ListItem, TextField } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';

type BudgetItemProps = {
  label: string;
  value?: number;
  onChange?: () => void;
};

function BudgetItem({ label, value, onChange }: BudgetItemProps): JSX.Element {
  return (
    <>
      <List>
        <ListItem>
          <span>{label}</span>
          <TextField
            label={`Enter your budget ${label}?`}
            variant='outlined'
            value={value}
            onChange={onChange}
          />
          <span>: ${value ?? 0}</span>
        </ListItem>
      </List>
    </>
  );
}
export default BudgetItem;
