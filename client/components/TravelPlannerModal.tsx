import { Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';

function TravelPlannerModal({ open?, handleClose? }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='Location modal'
      aria-describedby='Modal for viewing a location'
    >
      <Box sx={style}>
        <Typography id='location-modal-title' variant='h6' component='h2'>
          {modalContent?.name}
        </Typography>
      </Box>
    </Modal>
  );
}

export default TravelPlannerModal;
