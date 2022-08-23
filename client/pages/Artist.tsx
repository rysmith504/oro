import React, { useEffect, useContext } from 'react';
import ArtistInfoCard from '../components/ArtistCards';
import ArtistThumbnail from '../components/ArtistThumbnail';
import { ArtistContext } from '../context/ArtistContext';
import { ThemeContext } from '../context/ThemeContext';
import {Box,	Grid} from '../styles/material';

const Artists = () => {
  const artistContext = useContext(ArtistContext);
  const themeContext = useContext(ThemeContext);
  // console.log(artistContext);
  // const {mode, setMode, toggleMode} = themeContext;
  const {artistData, getFaveArtists } = artistContext;
  const favorites = artistData;

  useEffect(() => {
    getFaveArtists();
  }, []);

  return (
    <div>
      <h1>Artists</h1>
      <Box sx={{
        flexGrow: 1,
        height: '100%' }}>
        <Grid container spacing={2}>
          {favorites.map((artObj, index) => {
            if (!artObj.image.length) {
              const musicImages = ['music', 'band', 'concert', 'music-festival', 'rock-concert', 'musical', 'guitar', 'singer', 'opera'];
              artObj.image = `https://source.unsplash.com/random/?${musicImages[Math.floor(Math.random() * musicImages.length + 1)]}`;
            }
            return (
              <Grid item key={`art${index}`} xs={12} sm={4} md={3}>
                <ArtistThumbnail artistProps={artObj} key={`artistObj${index}`}/>
              </Grid>
            );
          })
          }
        </Grid>
      </Box>
    </div>
  );
};

//   return (
//     <div>
//       <h1>Artists</h1>
//       <Box sx={{
//         flexGrow: 1,
//         height: '100%' }}>
//         <Grid container spacing={2}>
//           {favorites.map((artObj, index) => {
//             if (!artObj.image.length) {
//               const musicImages = ['music', 'band', 'concert', 'music-festival', 'rock-concert', 'musical', 'guitar', 'singer', 'opera'];
//               artObj.image = `https://source.unsplash.com/random/?${musicImages[Math.floor(Math.random() * musicImages.length + 1)]}`;
//             }
//             return (
//               <Grid item key={`art${index}`} xs={12} sm={4} md={3}>
//                 <ArtistInfoCard artistProps={artObj} key={`artistObj${index}`}/>
//               </Grid>
//             );
//           })
//           }
//         </Grid>
//       </Box>
//     </div>
//   );
// };

export default Artists;
