import {Router} from 'express';
import eventListingsRouter from './eventListingsRouter';
import artistsRouter from './artistsRouter';
import songFinderRouter from './songFinder';
import eventDetailsRouter from './eventDetail';
import travelPlannerRouter from './travelPlanner';
import profileRouter from './profile';
import eventFeedRouter from './eventFeed';
import commentsRouter from './comments';
import notificationsRouter from './notifications';
import usersRouter from './usersRouter'


const api = Router();

api.use('/events', eventListingsRouter);
api.use('/favArtists', artistsRouter);
api.use('/songs', songFinderRouter);
api.use('/eventDetails', eventDetailsRouter);
api.use('/profile', profileRouter);
api.use('/comments', commentsRouter);
api.use('/eventFeed', eventFeedRouter);
api.use('/travelPlanner', travelPlannerRouter);
api.use('/users', usersRouter);
api.use('/notifications', notificationsRouter);


export default api;
