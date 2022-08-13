require('dotenv').config();
import { Router } from 'express';
import axios from 'axios';
import prisma from '../database/db';

const userEventsRouter = Router();
const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY;

userEventsRouter.get('/', (req, res) => {
  prisma.userEvents.findMany({ where: { userId: 1 }})
    .then((userEvents) => {
      // const eventId = userEvents[0]?.eventAPIid;

      const eventsArr: any[] = []

      userEvents.forEach(event => {
        const eventId = event.eventAPIid;

        axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&id=${eventId}`)
          .then(eventInfo => {
            
          })
          .catch(err => {
            console.error(err);
          })
      })

      res.status(200).send(eventsArr);
      
      // axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&id=${eventId}`)
      //   .then(resObj => {
      //     console.log(resObj.data._embedded.events);
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   })
      // res.status(200).send(userEvents);
    })
    .catch((err) => {
      res.send(500);
    })
})

export default userEventsRouter;