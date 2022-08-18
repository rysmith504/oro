import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Modal,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Item } from '../styles/material';

type Location = {
  location_id: string;
  name: string;
  address_obj: {
    state: string;
    country: string;
    address_string: string;
  };
};

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TravelPlanner: React.FC = () => {
  const location = useLocation();
  const [locations, setLocations] = useState<Array<Location>>([]);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState<Location | null>(null);

  const handleOpen = (content) => {
    setModalContent(content);
    setOpen(true);
  };
  const handleClose = () => {
    setModalContent(null);
    setOpen(false);
  };

  const fetchLocations = async () => {
    const { city } = location.state as { city: string };
    const { data } = await axios.get(`/travelPlanner/locations/${city}`);
    console.log('data', data.data);
    setLocations(data.data);
  };

  useEffect(() => {
    fetchLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={2}>
      {locations.map((loc) => (
        <Grid xs={8} key={loc.location_id}>
          <Item>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant='h5' component='div'>
                  {loc.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' onClick={() => handleOpen(loc)}>
                  View
                </Button>
              </CardActions>
            </Card>
          </Item>
        </Grid>
      ))}
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
    </Grid>
  );
};

export default TravelPlanner;
