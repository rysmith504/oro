import { Router } from 'express';
import axios from 'axios';
import path from 'path';
// import dotenv from 'dotenv';
require('dotenv').config();
// import cloudinary from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';

// dotenv.config({path: path.resolve(__dirname, '../../.env')});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});




const songFinderRouter = Router();

songFinderRouter.post('/', async (req, res) => {
  try {
    // console.log(req.body.data);
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {resource_type: 'video', upload_preset: 'trailfeathers'})
      .then((data) => {
        console.log(data);
        res.status(200).send(data);
      })
      .catch((err) => res.sendStatus(500));
  } catch (error) {
    res.sendStatus(500);
  }
});
    // .then(() => res.status(200).send(uploadedResponse))
    // .catch(() => res.sendStatus(500));
  // console.log(req.body.data);
  // res.send(req.body);=


export default songFinderRouter;
