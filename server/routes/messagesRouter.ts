import axios from 'axios';
import { Router } from 'express';
import { inspect } from 'node:util';
import prisma from '../database/db';

const messagesRouter = Router();

const addMessage = async (req, res, next) => {
  try {
    console.log('REQ.BODY HEY ITS ME',req.body)
    const { senderId, receiverId, text } = req.body;
    const data = await prisma.messages.create({
      data: {
        text,
        senderId,
        receiverId
      }
    })
    if (data) return res.json({ msg: 'MSG POST SUCCESS'})
    return res.json({msg: 'POST FAILED TO ADD TO DB'})
  } catch (ex) {
    console.error(ex).status(500);
    next(ex);
  }
}

messagesRouter.post('/addmsg', addMessage);
// messagesRouter.post('getmsg', getAllMessages);


export default messagesRouter;
