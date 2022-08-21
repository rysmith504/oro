import React, { useState } from 'react';
import Comments from './Comments';
import { Grid, Modal, Box, ImageListItem } from '../styles/material';
import { useTheme } from '@mui/material/styles';

const UserPicture: React.FC = ({ photo }) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;
  const [modalStatus, setModalStatus] = useState(false);

  const handleOpen = () => {
    setModalStatus(true);
  };

  const handleClose = () => {
    setModalStatus(false);
  };

  return (
    <div>
      <Modal
        style={{ alignItems: 'center', justifyContent: 'center' }}
        sx={{ overflow: 'scroll' }}
        open={modalStatus}
        onClose={handleClose}
      >
        <Box sx={{ margin: 'auto', bgcolor: inverseMode, width: 350, alignItems: 'center', justifyContent: 'center' }}>
          <img width='300px' height='auto' margin='auto' src={photo.photoUrl} />
          <Grid container>
            <Comments photo={photo} />
          </Grid>
        </Box>
      </Modal>
      <ImageListItem>
        <img
          src={`${photo.photoUrl}?w=100&h=100&fit=crop&auto=format`}
          srcSet={`${photo.photoUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt=""
          onClick={handleOpen}
        />
      </ImageListItem>
    </div>
  )
}

export default UserPicture;