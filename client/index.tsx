import React from 'react';
import App from './components/App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { UserContextProvider } from './context/UserContext';
import { ArtistContextProvider, ArtistContext } from './context/ArtistContext';
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}
const root = createRoot(rootElement);

root.render(
  <UserContextProvider>
    <ArtistContextProvider value={ArtistContext}>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </ArtistContextProvider>
  </UserContextProvider>
);
