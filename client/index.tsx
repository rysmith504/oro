import React from 'react';
import App from './components/App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Box, Grid, Container } from './styles/material';
import CssBaseline from '@mui/material/CssBaseline';
import {GlobalTheme} from '../client/styles/themeStyles';


const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}
const root = createRoot(rootElement);

root.render(
  // <ThemeProvider theme={themeDark}>
  <>
    <CssBaseline /><Box>
      <Grid container>
        <Grid item xs={12} md={12}>
          <BrowserRouter>
            <Routes>
              <Route path='*' element={<>
                <GlobalTheme />
                <App />
              </>} />
            </Routes>
          </BrowserRouter>
        </Grid>
      </Grid>
    </Box></>
  // </ThemeProvider>
);
