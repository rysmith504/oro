import { Router } from 'express';
import axios from 'axios';
import path from 'path';
import prisma from '../database/db';
require('dotenv').config();


const commentsRouter = Router();

commentsRouter.get('/', async (req, res) => {
  const {photoUrl} = req.query;

  await prisma.comments.findMany({
    where: {
      photoUrl: photoUrl
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

commentsRouter.post('/', async (req, res) => {
  const {comment, photoUrl, userId} = req.body;

  await prisma.comments.create({
    data: {
      userId,
      comment,
      photoUrl,
    }
  })
    .then(async (data) => {
      // console.log(data);
      res.status(200).send(data);

    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500)
    });
  // prisma.comments.create({
  //   data: {
  //     userId: 1,
  //     comment,
  //     photoId: 1,
  //   }
  // })
  //   .then((data) => res.status(200).send(data))
  //   .catch(() => res.sendStatus(500));
});



export default commentsRouter;
