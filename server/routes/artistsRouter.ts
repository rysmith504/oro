import { Router } from 'express';
import axios from 'axios';
const artistsRouter = Router();
import prisma from '../database/db';

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


artistsRouter.post('/', (req, res) => {
  const {artistName} = req.body;
  const obj = {
    userId: 1,
    artistName: artistName, //
    bio: '', //
    ticketId: '',
    youtube: '',
    twitter: '',
    facebook: '',
    instagram: '',
    itunes: '',
    wiki: '',
    homepage: '',
    image: '',

  };
  axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${process.env.LASTFM_API_KEY}&format=json`)
    .then((artistData) => {
      obj.bio = artistData.data.artist.bio.summary;
      // console.info(artistData.data.artist.bio.summary);
      axios.get(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=${process.env.TICKETMASTER_API_KEY}&keyword=${artistName}`)
        .then((attractionData) => {
          obj.ticketId = attractionData.data._embedded.attractions[0].id;
          obj.youtube = attractionData.data._embedded.attractions[0].externalLinks.youtube[0].url;
          obj.twitter = attractionData.data._embedded.attractions[0].externalLinks.twitter[0].url;
          obj.facebook = attractionData.data._embedded.attractions[0].externalLinks.facebook[0].url;
          obj.instagram = attractionData.data._embedded.attractions[0].externalLinks.instagram[0].url;
          obj.itunes = attractionData.data._embedded.attractions[0].externalLinks.itunes[0].url;
          obj.wiki = attractionData.data._embedded.attractions[0].externalLinks.wiki[0].url;
          obj.homepage = attractionData.data._embedded.attractions[0].externalLinks.homepage[0].url;
          obj.image = attractionData.data._embedded.attractions[0].images[0].url;
          console.info(obj);
          res.status(200).send(obj);
        })
        .catch((err) => {
          console.error(err);
          res.status(500);
          res.end();
        });
      // res.status(200).send(artistData.data.artist.bio);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.end();
    });
})

export default artistsRouter;
