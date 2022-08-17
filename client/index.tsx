import React from 'react';
import App from './components/App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Box, Grid, Container } from './styles/material';
import CssBaseline from '@mui/material/CssBaseline';
import {Theme} from './components/Theme';
import { ThemeContextProvider, ThemeContext } from './context/ThemeContext';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='*' element={<ThemeContextProvider>
        <Theme>
          <App />
        </Theme>
      </ThemeContextProvider>} />
    </Routes>
  </BrowserRouter>

);
