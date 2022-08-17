import React from 'react';
import App from './components/App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Box, Grid, Paper, Container } from './styles/material';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const themeLight = createTheme({
  palette: {
    background: {
      default: '#e4f0e2'
    }
  }
});

const themeDark = createTheme({
  palette: {
    background: {
      default: '#1A2027'
    },
    text: {
      primary: '#1A2027'
    }
  }
});
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}
const root = createRoot(rootElement);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1A2027',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

root.render(
  <ThemeProvider theme={themeDark}>
    <CssBaseline />
    <Box>
      <Grid container>
        <Grid item xs={12} md={12}>
          <BrowserRouter>
            <Routes>
              <Route path='*' element={<App />} />
            </Routes>
          </BrowserRouter>
        </Grid>
      </Grid>
    </Box>
  </ThemeProvider>
);
