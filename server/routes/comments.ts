import { Router } from 'express';
import axios from 'axios';
import path from 'path';
require('dotenv').config();

const commentsRouter = Router();

commentsRouter.post('/', (req, res) => {
  const {comment} = req.body;
  res.send(comment);
});



export default commentsRouter;
