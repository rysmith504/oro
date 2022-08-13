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
        })
      // const eventsArr = [];

      // for(let i = 0; i < userEvents.length; i++) {
      //   axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&id=${userEvents[i].eventAPIid}`)
      //     .then(event => {
      //       eventsArr.push(event.data._embedded.events[0]);
      //     })
      //     .catch(err => {
      //       console.error('FAILED')
      //     })
      // }

    })
    .catch((err) => {
      res.send(500);
    })
})

export default profileRouter;