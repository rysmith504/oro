import { Router } from 'express';
import axios from 'axios';
import prisma from '../database/db';

const userEventsRouter = Router();

userEventsRouter.get('/', (req, res) => {
  prisma.userEvents.findMany({ where: { userId: 1 }})
    .then((userEvents) => {
      // res.status(200).send(userEvents);
    })
    .catch((err) => {
      res.send(500);
    })
})

export default userEventsRouter;