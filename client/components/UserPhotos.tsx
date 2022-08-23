import React, { useState } from 'react';
import { ImageList, ImageListItem, Modal, Grid, Box } from '../styles/material';
import { useTheme } from '@mui/material/styles';
import UserPicture from './UserPicture';

const UserPhotos: React.FC = ({ photos }) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;
  // <YouTubeIcon key={'youtube'} sx={{ color: iconColors }} />
  // <CardContent sx={{ bgcolor: inverseMode }}></CardContent>
  // <Typography paragraph sx={{ bgcolor: inverseMode }}></Typography>

  return (
    <div>
      <ImageList sx={{ width: 375 height: 500 }} cols={3} rowHeight={164}>
        {photos.map((photo, index) => (
          <div key={index}>
            <UserPicture photo={photo} />
          </div>
        ))}
      </ImageList>
    </div>
  );
};

export default UserPhotos;
