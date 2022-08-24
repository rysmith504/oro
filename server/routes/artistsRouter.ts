import { Router } from 'express';
import axios from 'axios';
const artistsRouter = Router();
import prisma from '../database/db';

artistsRouter.get('/events', (req, res) => {
  const { keyword } = req.query;
  axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?size=10&keyword=${keyword}&apikey=${process.env.TICKETMASTER_API_KEY}`)
    .then((responseObj) => {

      if (responseObj.data._embedded) {
        res.status(200).send(responseObj.data._embedded);
      }
    })
    .catch(err => console.error(err));
});

artistsRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  prisma.users.findUnique({
    where: {
      googleId: id,
    }
  })
    .then((userInfo) => {
      prisma.artistFollowing.findMany({
        where: {
          userId: id,
        }
      })
        .then((data) => {
          if (!data.length) {
            prisma.artistFollowing.findMany()
              .then((data) => {
                res.status(200).send({allArtists: data, artists: null});
              });
          } else {
            res.status(200).send({allArtists: data, artists: true});
          }
        })
        .catch((err) => {
          prisma.artistFollowing.findMany()
            .then((data) => {
              res.status(200).send({allArtists: data, artists: null});
            });
        })
        .catch((err) => {
          res.sendStatus(500);
        });
    });
});

// artistsRouter.get('/update', (req, res) => {
//   const { artist, user } = req.params;
//   const { artistId } = artist;
//   const { userId } = user;
//   prisma.artistFollowing.findUnique({
//     where: {
//       id: artistId,
//     }
//   })
//     .then((userInfo) => {
//       prisma.artistFollowing.findMany({
//         where: {
//           userId: userInfo.id,
//         }
//       });
//     });
// });

artistsRouter.post('/', (req, res) => {
  const {artistName, userId} = req.body;
  console.log('req;', artistName, userId);

  const obj = {
    artistName,
    bio: '',
    ticketId: '',
    youtube: '',
    twitter: '',
    facebook: '',
    instagram: '',
    itunes: '',
    wiki: '',
    homepage: '',
    image: ''
  };
  axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${process.env.LASTFM_API_KEY}&format=json`)
    .then((artistData) => {
      if (artistData.data.artist.bio.summary) {
        obj.bio = artistData.data.artist.bio.summary;
      }

      axios.get(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=${process.env.TICKETMASTER_API_KEY}&keyword=${artistName}`)
        .then(async (attractionData) => {
          if (attractionData.data._embedded.attractions) {
            obj.ticketId = attractionData.data._embedded.attractions[0].id;
            obj.youtube = attractionData.data._embedded.attractions[0].externalLinks.youtube[0].url;
            obj.twitter = attractionData.data._embedded.attractions[0].externalLinks.twitter[0].url;
            obj.facebook = attractionData.data._embedded.attractions[0].externalLinks.facebook[0].url;
            obj.instagram = attractionData.data._embedded.attractions[0].externalLinks.instagram[0].url;
            obj.itunes = attractionData.data._embedded.attractions[0].externalLinks.itunes[0].url;
            obj.wiki = attractionData.data._embedded.attractions[0].externalLinks.wiki[0].url;
            obj.homepage = attractionData.data._embedded.attractions[0].externalLinks.homepage[0].url;
            obj.image = attractionData.data._embedded.attractions[0].images[0].url;
          }
          await prisma.artistFollowing.update({
            where: {artistName},
            data: {
              user: {
                connect: {
                  googleId: userId,
                },
              }
            }
          })
            .then((data) => {
              console.log('success:', data);
              res.status(200).send(data);
            })
            .catch((err) => {
              console.error('fail', err);
              prisma.artistFollowing.create({
                data: obj,
              })
                .then((data) => {
                  console.log(data);
                  prisma.artistFollowing.update({
                    where: artistName,
                    data: {
                      user: {
                        connect: {
                          googleId: userId,
                        },
                      }
                    }
                  });
                  res.status(200).send(data);
                })
                .catch(() => res.status(500));
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(500);
          res.end();
        });
    })
    .catch((err) => {
      res.status(500);
      res.end();
    });
});

artistsRouter.delete('/', (req, res) => {
  const {artistName, userId} = req.body;
  prisma.artistFollowing.update({
    where: artistName,
    data: {
      user: {
        disconnect: true,
      }
    }
  })
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});


export default artistsRouter;
