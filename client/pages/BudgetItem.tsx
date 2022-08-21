/* eslint-disable func-style */
import { Checkbox, List, ListItem } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { CssTextField } from '../styles/material';
type BudgetItemProps = {
  label: string;
  value?: number;
  onChange?: () => void;
};

const fontColor = {
  style: { color: '#9B27B0' }
};

function BudgetItem({ label, value, onChange }: BudgetItemProps): JSX.Element {
  return (
    <>
      <List>
        <ListItem>
          <span>{label}</span>
          <CssTextField
            InputLabelProps={fontColor}
            inputProps={fontColor}
            color="secondary"
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
