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

// profileRouter.get('/events/:_id', (req, res) => {
//   const { _id } = req.params;
//   let userEvents = [];
//   prisma.users.findUnique({ where: { googleId: _id }})
//     .then((user) => {
//       const { id } = user;
//       return id;
//     })
//     .then((id => {
//       prisma.userEvents.findMany({ where: { userId: id }})
//         .then((events) => {
//           events.forEach(event => {
//             axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&id=${event.eventAPIid}`)
//               .then(({data}) => {
//                 const { _embedded } = data;
//                 userEvents.push(_embedded.events);
//               })
//               .catch(err => console.error(err));
//           })
//         })
//         .then(() => {
//           console.log(userEvents);
//         })
//         .catch(err => console.error(err));
//     }))
//     .catch(err => console.error(err));
// });

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
    });
});

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
    });
});

profileRouter.put('/:_id', (req, res) => {
  const { _id } = req.params;
  const { socialMedia } = req.body;
  const {facebook, instagram, twitter} = socialMedia;

  prisma.users.update({
    where: { googleId: _id },
    data: { fbId: facebook, instaId: instagram, twitterId: twitter },
  })
    .catch(err => console.error(err));
});

export default profileRouter;
