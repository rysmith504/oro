import React, { useState } from 'react';
import { ImageList, ImageListItem, Modal, Grid, Box } from '../styles/material';
import { useTheme } from '@mui/material/styles';
import Comments from '../components/Comments';

const UserPhotos: React.FC = ({ photos }) => {
  const [modalStatus, setModalStatus] = useState(false);
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const handleOpen = () => {
    setModalStatus(true);
  }

  const handleClose = () => {
    setModalStatus(false);
  }

  return (
    <div>
      <ImageList sx={{ width: 375, height: 667 }} cols={2} rowHeight={164}>
        {photos.map((photo, index) => (
          <ImageListItem key={index}>
            <img
              src={`${photo.photoUrl}?w=100&h=100&fit=crop&auto=format`}
              srcSet={`${photo.photoUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt="" />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default UserPhotos;