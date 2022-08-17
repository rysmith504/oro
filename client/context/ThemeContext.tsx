import React, { useState, useEffect } from 'react';
// import {darkMode, lightMode, GlobalTheme} from '../styles/themeStyles';
import styled, { ThemeProvider } from 'styled-components';

const darkMode = {
  backgroundColor: '#1A2027',
  marginRight: 'auto',
  fontFamily: 'Roboto',
  textAlign: 'center',
  padding: '10px',
  color: 'white',
};

const lightMode = {
  backgroundColor: '#FFF',
  marginRight: 'auto',
  fontFamily: 'Roboto',
  textAlign: 'center',
  padding: '10px',
  color: '#1A2027',
};

const Styled = styled.div``;

const ThemeContext = React.createContext({});

const ThemeContextProvider = ({ children }) => {

  const [mode, setMode] = useState('dark');

  // function to toggle the theme

  const toggleMode = () => {
    mode === 'dark' ? setMode('dark') : setMode('light');
    console.log('toggle mode');
  };

  const themeProps = {
    mode,
    toggleMode,
    setMode,
  };

  return (
    <ThemeProvider theme={mode === 'dark' ? darkMode : lightMode}>
      <ThemeContext.Provider
        value={themeProps}>
        <Styled>{ children }</Styled>
      </ThemeContext.Provider>
    </ThemeProvider>
  );

};

export { ThemeContextProvider, ThemeContext };
