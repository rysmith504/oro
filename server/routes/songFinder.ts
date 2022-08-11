import { Router } from 'express';
import axios from 'axios';
const songFinderRouter = Router();

songFinderRouter.post('/', (req, res) => {
  // console.log(req.body);
  res.send(req.body);
});

export default songFinderRouter;
