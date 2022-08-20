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
    console.error(ex);
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
    console.log('unsorted', messages)

    messages.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    console.log('SORTED MSGS', messages)
  const projectMessages = messages.map(msg => {
    return{
      fromSelf: msg.senderId === senderId,
      message: msg.text
    }
  })
    console.log(messages);
    console.log('PROJECT MESSAGES',projectMessages)
    return res.json(projectMessages);
  } catch (ex) {
      next(ex);
  }
}

messagesRouter.post('/addmsg', addMessage);
messagesRouter.post('/getmsg', getAllMessages);


export default messagesRouter;
