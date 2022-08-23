import React, { useState, createContext } from 'react';

interface themeTypeProps {
  mode: string;
  toggleMode: () => void;
  setMode: React.Dispatch<React.SetStateAction<string>>
}

const ThemeContext = createContext({} as themeTypeProps);

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
