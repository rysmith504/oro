import React, { useContext } from "react";
import { ThemeProvider, createGlobalStyle, styled } from "styled-components";
import { ThemeContext } from "../context/ThemeContext";

const darkMode = {
  background: '#1A2027',
  color: 'white',
};

const lightMode = {
  backgroundColor: '#FFF',
  color: '#1A2027',
};

export const GlobalTheme = createGlobalStyle`
* {
  margin-right: auto;
  font-family: Roboto;
  text-align: center;
  padding: 10px;
  transition: all 0.5s;
}
`;

export const LightTheme = createGlobalStyle`
body {
  margin-right: auto;
  background: #FFFFFF;
  font-family: Roboto;
  text-align: center;
  padding: 10px;
  color: #1A2027;
}
`;

//GenerateGlobalTheme?
// Theme Provider?
// ALL----
// background
// nav bar
// hamburger
// logo(?)
// text
// headings
// body
// Buttons
// cards

// EVENT LISTINGS----
// Search / input form
// icons
//Info Icon
// Pin

// EVENT FEED----
// text

// SONG FINDER----
// accordian
// music icon
// person icon
// lyrics icons
// album icons
// button

// ARTISTS---
// cards
// title
// description
// follow icon
// arrow icon

// social icons

// event details
// heading
// icons
// text


// DETAILS---
// N/A

//LOGIN--
// text

// MY ACCOUNT / PROFILE

// accordian
// text

// NOTIFICATIONS

