import path from 'path';
import express from 'express';

import eventListingsRouter from './routes/eventListingsRouter';
import artistsRouter from './routes/artistsRouter';
import songFinderRouter from './routes/songFinder';
import eventDetailsRouter from './routes/eventDetail';

import prisma from './database/db';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));


//ROUTERS------------------------------
app.use('/events', eventListingsRouter);
app.use('/faveArtists', artistsRouter);
app.use('/songs', songFinderRouter);
app.use('/eventDetails', eventDetailsRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
});
