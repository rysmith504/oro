import React, { useContext } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ThemeContext } from '../context/ThemeContext';
import { createTheme } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import { styled } from '@mui/system';

// MATERIAL UI-THEMES
interface PaletteColor {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}

// const dark = {
//   background: '#1A2027',
//   color: '#F3F3F3',
// };

// const light = {
//   background: '#FFF',
//   color: '#1A2027',
// };

const dark = createTheme({
  palette: {
    primary: {
      main: '#1A2027',
      contrastText: '#F3F3F3',
    },
    secondary: deepPurple,
  },
});

const light = createTheme({
  palette: {
    primary: {
      main: '#F3F3F3',
      contrastText: '#1A2027',
    },
    secondary: {
      main: '#1A2027',
    },
  },
});

export const StyledCard = styled('div')(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

const GlobalTheme = createGlobalStyle`

 body {
    font-family: Roboto;
    text-align: center;
    margin: 0;
    height: 100vh;
    background: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.primary.contrastText};
  }

@media only screen and (min-width: 600px){
body {
  font-family: Roboto;
  text-align: center;
  margin: 0;
  height: 100vh;
  padding-left: 20%;
  padding-right: 20%;
  background: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.primary.contrastText};
}
}

  h1 {
  }
  `;

// Global Theme Export
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
