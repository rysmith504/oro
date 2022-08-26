import React from 'react';
import App from './components/App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Theme } from './components/Theme';
import { ThemeContextProvider } from './context/ThemeContext';
import { UserContextProvider } from './context/UserContext';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}
const root = createRoot(rootElement);

root.render(
  <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path='*'
          element={
            <ThemeContextProvider>
              <Theme>
                <App />
              </Theme>
            </ThemeContextProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </UserContextProvider>
);
