import axios from 'axios';
import { Router } from 'express';

const eventDetailsRouter = Router();
eventDetailsRouter.get('/', (req, res) => {
  const { id } = req.query;
  console.log('in eventDetails');
  axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=${process.env.TICKETMASTER_API_KEY}&id=${id}`
    )
    .then((results) => {
      const { data } = results;
      console.log(data);
      res.status(200).send(data);
    })
    .catch((error) => console.error(error));
});

export default eventDetailsRouter;
