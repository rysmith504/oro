import React, { useContext } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ThemeContext } from '../context/ThemeContext';

const dark = {
  background: '#1A2027',
  color: 'white',
};

const light = {
  background: '#FFF',
  color: '#1A2027',
};

const GlobalTheme = createGlobalStyle`
 body {
    font-family: Roboto;
    text-align: center;
    margin: 0;
    height: 100vh;
    background: ${(props) => props.theme.background};
  }
  `;

export const Theme = ({ children }) => {
  const themeContext = useContext(ThemeContext);
  const {mode, setMode, toggleMode} = themeContext;
  return (
    <ThemeProvider theme={mode == 'dark' ? dark : light}>
      <GlobalTheme />
      {children}
    </ThemeProvider>
  );
};

