import React, { useState } from 'react';
import { ImageList, ImageListItem, Modal, Grid, Box } from '../styles/material';
import { useTheme } from '@mui/material/styles';
import Comments from '../components/Comments';
import { height } from '@mui/system';
import { useTheme } from '@mui/material/styles';

const UserPhotos: React.FC = ({ photos }) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;
  // <YouTubeIcon key={'youtube'} sx={{ color: iconColors }} />
  // <CardContent sx={{ bgcolor: inverseMode }}></CardContent>
  // <Typography paragraph sx={{ bgcolor: inverseMode }}></Typography>

  const [modalStatus, setModalStatus] = useState(false);
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const handleOpen = () => {
    setModalStatus(true);
  };

  const handleClose = () => {
    setModalStatus(false);
  };

  return (
    <div>
      <ImageList sx={{ width: 375 }} cols={3} rowHeight={164}>
        {photos.map((photo, index) => (
          <div key={index}>
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
            <ImageListItem onClick={handleOpen}>
              <img
                src={`${photo.photoUrl}?w=100&h=100&fit=crop&auto=format`}
                srcSet={`${photo.photoUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt=""
              />
            </ImageListItem>
          </div>
        ))}
      </ImageList>
    </div>
  );
};

export default UserPhotos;
