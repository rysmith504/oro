import { Router } from 'express';
import axios from 'axios';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import prisma from '../database/db';
require('dotenv').config();

const eventFeedRouter = Router();


eventFeedRouter.post('/', async (req, res) => {
  const {imageData, eventId, userId, caption} = req.body;
  try {
    const fileStr = imageData;
    await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'vibeSocietyImages',
    })
      .then(async(uploadedResponse) => {
        console.log(eventId, userId, caption);
        await prisma.eventPhotos.create({
          data: {
            userId,
            photoUrl: uploadedResponse.secure_url,
            eventAPIid: eventId,
            caption,
          }

        })
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.sendStatus(500);
          });
      })
      .catch(() => res.sendStatus(500));

  } catch (error) {
    res.sendStatus(500);
  }
});

eventFeedRouter.get('/avatar', async (req, res) => {
  const {userId} = req.query;
  await prisma.users.findUnique({
    where: {
      googleId: userId,
    }
  })
    .then((data) => res.status(200).send(data.profileURL))
    .catch(() => res.sendStatus(500));
});

eventFeedRouter.get('/', async (req, res) => {
  const {eventId} = req.query;
  await prisma.eventPhotos.findMany({
    where: {
      eventAPIid: eventId,
    },
    orderBy: [
      {
        created_at: 'asc'
      }
    ]
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.sendStatus(500);
    });

});

eventFeedRouter.get('/photo', async (req, res) => {
  const {photoUrl} = req.query;
  await prisma.eventPhotos.findFirst({
    where: {
      photoUrl,
    },
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.sendStatus(500);
    });

});

export default eventFeedRouter;
