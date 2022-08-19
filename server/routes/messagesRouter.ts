import axios from 'axios';
import { Router } from 'express';
import { inspect } from 'node:util';
import prisma from '../database/db';

const messagesRouter = Router();


// messagesRouter.post('/addmsg', addMessage);
// messagesRouter.post('getmsg', getAllMessages);


export default messagesRouter;
