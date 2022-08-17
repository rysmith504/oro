import React, { useState, createContext } from 'react';

const ThemeContext = createContext('light');

const ThemeContextProvider = ({ children }) => {

  const [mode, setMode] = useState('dark');

  // function to toggle the theme

  const toggleMode = () => {
    mode === 'dark' ? setMode('light') : setMode('dark');
  };

  return (
    <ThemeContext.Provider
      value={{ mode, toggleMode, setMode}}>
      {children}
    </ThemeContext.Provider>
  );

};

export {ThemeContext, ThemeContextProvider};
