import { Router } from 'express';
import axios from 'axios';
const artistsRouter = Router();
import prisma from '../database/db';

artistsRouter.get('/events', (req, res) => {
  const { keyword } = req.query;
  console.log(keyword);
  axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?size=10&keyword=${keyword}&apikey=${process.env.TICKETMASTER_API_KEY}`)
    .then((responseObj) => {
      console.log('responseObj 22:', responseObj);
      // const events = responseObj.data._embedded.events.filter((event) => {
      //   const date = new Date();
      //   date.setMonth(date.getMonth() + 6);
      //   console.log(date);
      //   if (event.dates.start.dateTime <= date) {
      //     return event;
      //   }
      // });
      // console.log(events);
      res.status(200).send(responseObj.data._embedded);
    })
    .catch(err => console.error(err));
});

artistsRouter.get('/', (req, res) => {
  prisma.artistFollowing.findMany()
    .then((artistData) => {
      console.info(artistData);
      res.status(200).send(artistData);
    })
    .catch((err) => {
      // console.error(err);
      res.status(500);
      res.end();
    });


  // axios.get(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=SptQUng7VWQQ0BVM0uspyhpoyHGkNSq4&keyword=${artistName}`)
  //   .then((artistData) => {
  //     console.info(artistData);
  //     res.status(200).send(artistData.data._embedded);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     res.status(500);
  //     res.end();
  //   });
});

export default artistsRouter;
