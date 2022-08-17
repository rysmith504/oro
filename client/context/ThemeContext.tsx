// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// // import {darkMode, lightMode, GlobalTheme} from '../styles/themeStyles';
// import {ThemeProvider} from 'styled-components';
// export const ThemeContext = React.createContext({});

// const lightMode = {
//   colorBackground: '#FFFFFF',
//   colorText: '#1A2027',
// };

// const darkMode = {
//   colorBackground: '#1A2027',
//   colorText: '#FFFFFF',
// };

// export const ThemeContextProvider = ({ children }) => {

//   const [mode, setMode] = useState(darkMode);

//   // function to toggle the theme

//   const toggleMode = () => {
//     // mode === 'dark' ? setMode(dark) : setMode(light);
//     console.log('toggle mode');
//   };


//   return (
//     <ThemeContext.Provider
//       value={toggleMode}>
//       <ThemeProvider theme={mode}>
//         { children }
//       </ThemeProvider>
//     </ThemeContext.Provider>
//   );

// };
