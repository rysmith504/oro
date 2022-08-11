import { Router } from 'express';
import axios from 'axios';
import path from 'path';
// import dotenv from 'dotenv';
require('dotenv').config();
// import cloudinary from 'cloudinary';
const cloudinary = require('cloudinary').v2;

// dotenv.config({path: path.resolve(__dirname, '../../.env')});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const songFinderRouter = Router();

songFinderRouter.post('/', async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.v2.uploader.upload(fileStr, {
      upload_preset: 'trailfeathers'
    })
      .then(() => res.status(200).send(uploadedResponse))
      .catch(() => res.sendStatus(500));
  // console.log(req.body.data);
  // res.send(req.body);=
  } catch (error) {
    res.sendStatus(500);
  }
});

export default songFinderRouter;
