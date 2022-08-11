import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const EventDetails: React.FC = () => {
  const { getEventDetails } = useContext(UserContext);

  return <div>Hello EventDetails</div>;
};

export default EventDetails;
