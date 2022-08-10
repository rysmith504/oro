import artistsRouter from './artists';
import eventListingsRouter from './eventListingsRouter';
import { Express } from 'express';

export default (app: Express) => {
  app.use('/routes/artists/', artistsRouter),
    app.use('/routes/events/', eventListingsRouter);
};
