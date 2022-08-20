require('dotenv').config();
import { Router } from 'express';
import axios from 'axios';
import prisma from '../database/db';

const profileRouter = Router();
const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY;

profileRouter.get('/events', (req, res) => {
  prisma.userEvents.findMany({ where: { userId: 1 }})
    .then((userEvents) => {
      const eventId = userEvents[0]?.eventAPIid;

      axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&id=${eventId}`)
        .then(event => {
          res.status(200).send(event.data._embedded.events[0]);
        })
        .catch(err => {
          console.error(err);
        });

    })
    .catch((err) => {
      res.send(500);
    });
});

profileRouter.get('/:_id', (req, res) => {
  const { _id } = req.params;

  prisma.users.findUnique({
    where: {
      googleId: _id,
    }
  })
    .then((userInfo) => {
      res.status(200).send(userInfo);
    })
    .catch((err) => {
      console.error(err);
    })
})

profileRouter.get('/event_photos/:_id', (req, res) => {
  const { _id } = req.params;
  
  prisma.eventPhotos.findMany({
    where: { userId: _id},
  })
    .then(userPhotos => {
      res.status(200).send(userPhotos);
    })
    .catch(err => {
      console.error(err);
    })
})

export default profileRouter;
