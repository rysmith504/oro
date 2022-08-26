import prisma from '../database/db';
import axios from 'axios';
import { Router } from 'express';

const budgetRouter = Router();
budgetRouter.post('/events/budget/:_id', async (req, res) => {
  const { eventId, tickets, food, drinks, parking, merch, travel } = req.body;
  console.log(req.body);
  await prisma.budget
    .create({
      data: {
        Food: food,
        Tickets: tickets,
        Parking: parking,
        Merch: merch,
        Travel: travel,
        Drinks: drinks,
      },
    })
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

export default budgetRouter;
