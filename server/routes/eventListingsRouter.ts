import path from 'path'
import expres from 'express'
import axios from 'axios'
import { Router } from 'express' 
import { inspect } from 'node:util'
require('dotenv').config();

const eventListingsRouter = Router();

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
      // console.log(responseObj.data._embedded.events.filter((event) => {
      //   return event._embedded;
      // }))
      console.log('RESPONSE OBJ GET', inspect(responseObj.data._embedded.events[9]._embedded, {depth: null}))
      let venueInfo;
      const events = responseObj.data._embedded.events.filter((event: any) => {
        return event._embedded
      }).map((event, count) => {
        let newDataObj: any = {
          eventDate: event.dates.start.dateTime,
          eventId: event.id,
        };
        const artistInfo = event._embedded.attractions.map(attraction => {
          const artistInfo = {
            artistName: attraction.name,
            artistId: attraction.id,
            artistImages: attraction.images
          }
          return artistInfo;
          })
        
          const venueInfo = event._embedded.venues.map(venue => {
            const venueInfo = {
              venueId: venue.id,
              venueName: venue.name,
              address: venue.address,
              city: venue.city.name,
              state: venue.state.name,
              country: venue.country.name,
              stateCode: venue.stateCode,
              postalCode: venue.postalCode,
              location: venue.location,
              venueImages: venue.images
            }
            return venueInfo;
          })

        console.log('EVENT LINE 31', event, count)
        // console.log('NAME', event._embedded.venues[count].name)
          newDataObj.venueInfo = venueInfo;
          newDataObj.artistInfo = artistInfo
    console.log('NEWDATAOBJ', inspect(newDataObj, {depth: null}));

    return newDataObj
      })
      console.log('DATES12' , events);
      res.send({
        events
      })
      res.status(200);
    })
    .catch(err => console.error(err));
})


export default eventListingsRouter;