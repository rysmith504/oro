import axios from 'axios';
import { Router } from 'express';
import { inspect } from 'node:util';
import prisma from '../database/db';

const messagesRouter = Router();

const addMessage = async (req, res, next) => {
  try {
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
    next(ex);
  }
}

const getAllMessages = async (req, res, next) => {
  try {
    const { senderId, receiverId } = req.body;
    const messages = await prisma.messages.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                senderId: {
                  equals: senderId
                }
              },
              {
                senderId: {
                  equals: receiverId
                }
              }
            ]
          },
          {
            OR: [
              {
                receiverId: {
                  equals: receiverId
                }
              },
              {
                receiverId: {
                  equals: senderId
                }
              }
            ]
          }
        ]
      }
    })

  messages.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
  const projectMessages = messages.map(msg => {
    return{
      fromSelf: msg.senderId === senderId,
      message: msg.text
    }
  })

    return res.json(projectMessages);
  } catch (ex) {
      next(ex);
  }
}

messagesRouter.post('/addmsg', addMessage);
messagesRouter.post('/getmsg', getAllMessages);


export default messagesRouter;
