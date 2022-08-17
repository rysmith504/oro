import React, { useContext } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ThemeContext } from '../context/ThemeContext';

const darkMode = {
  background: '#1A2027',
  color: 'white',
};

const lightMode = {
  backgroundColor: '#FFF',
  color: '#1A2027',
};

const GlobalTheme = createGlobalStyle`
  * {
    font-family: Roboto;
    text-align: center;
    padding: 10px;
  }
  `;

export const Theme = ({ children }) => {
  const { theme } = useContext(ThemeContext); // get the current theme ('light' or 'dark')
  return (
    <ThemeProvider theme={darkMode}>
      <GlobalTheme />
      {children}
    </ThemeProvider>
  );
};

