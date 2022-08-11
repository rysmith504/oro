import path from 'path'
import expres from 'express'
import axios from 'axios'
import { Router } from 'express' 

require('dotenv').config();

const eventListingsRouter = Router();

// console.log('hello');

eventListingsRouter.get('/list', (req, res) => {
  // console.log(req.query)
  // const punctuationless = req.query.keyword
  // .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
  // .replace(/\s{1,}/g, "+")
  // .toLowerCase();
  const { keyword } = req.query;
  // console.log('KEYWROD',keyword);
  axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?size=10&keyword=${keyword}&apikey=${process.env.TICKETMASTER_API_KEY}`)
    .then((responseObj) => {
      const dates = responseObj.data._embedded.events.filter((event) => {
        return event.dates.start
      }).map(event => {
        return ([event.id, event.dates.start])
      })
      // console.log('DATES12' , dates);
      // console.log('RESPONSE OBJ GET', responseObj.data._embedded)
      res.send({

      })
      res.sendStatus(200);
    })
    .catch(err => console.error(err));
})


export default eventListingsRouter;