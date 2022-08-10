import React, { useState, useEffect, useRef, useContext } from 'react';
import { ArtistContext } from '../index'; // imports context

const Artists = () => {
  const aristContext = useContext(ArtistContext);
  return (
    <div>
      <div>Hello ARtists</div>
      {aristContext}
    </div>
  );
};

export default Artists;
