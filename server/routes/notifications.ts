import { Router } from 'express';
import prisma from '../database/db';

const notificationsRouter = Router();

notificationsRouter.get('/', async (req, res) => {
  const {userId} = req.query;
  await prisma.notifications.findMany({
    where: {
      userId,
    }
  })
    .then((data) => {
      // console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });

});

notificationsRouter.post('/', async (req, res) => {
  const {commentId, ownerId} = req.body;
  await prisma.notifications.create({
    data: {
      userId: ownerId,
      commentId, 
      type: 'comment',
    }
  }).then((data) => {
    // console.log(data);
    res.status(200).send(data);
  }).catch(() => res.sendStatus(500));
});

export default notificationsRouter;
