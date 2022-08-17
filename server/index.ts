import path from 'path';
import express from 'express';

import eventListingsRouter from './routes/eventListingsRouter';
import artistsRouter from './routes/artistsRouter';
import songFinderRouter from './routes/songFinder';
import eventDetailsRouter from './routes/eventDetail';
import eventFeedRouter from './routes/eventFeed';
// import app from './routes/auth';
import profileRouter from './routes/profile';
import commentsRouter from './routes/comments';
import prisma from './database/db';
import passport from 'passport';
// import passportAuth from '../passport';
import session from 'express-session';

// console.log('index server');
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

//ROUTERS------------------------------
app.use('/events', eventListingsRouter);
app.use('/favArtists', artistsRouter);
app.use('/songs', songFinderRouter);
app.use('/eventDetails', eventDetailsRouter);
// app.use('/auth', app);
app.use('/profile', profileRouter);
app.use('/comments', commentsRouter);
app.use('/eventFeed', eventFeedRouter);

// AUTH-----------------
require('dotenv').config();

import googleStrategy from 'passport-google-oauth20';
const GoogleStrategy = googleStrategy.Strategy;

// console.log('passport file');
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
    // userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
  },
  (async (req, accessToken, refreshToken, profile, cb ) => {
    // console.log('profile here----', profile);
    const user = await prisma.users.create(
      { data: {
        googleId: profile.id,
        email: profile.emails[0].value,
        fullName: profile.displayName,
      }})
      .catch(async () => {
        return await prisma.users.findUnique({
          where: {
            googleId: profile.id,
          },
        });
      });

    const passUser = (err, user) => {
      return cb(err, user);
    };
    passUser(null, user);
  }),
));

passport.serializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
  done(null, user);
});

passport.deserializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
  done(null, user);
});

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req: { user: any; }, res: { sendStatus: (arg0: number) => any; }, next: () => any) => {
  req.user ? next() : res.sendStatus(401);
};

app.get('/auth/success', (req, res) => {
  // console.log('auth success');
  if (req.user) {
    // console.log(req.user);
    res.status(200).json({
      user: req.user,
      message: 'success',
      success: true,
    });
  }
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
  (req, res) => {
    console.log('auth get', req, res);
  }
);
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login',
    successRedirect: '/',
  }),
  (req, res) => {
    // Successful authentication, redirect secrets.
    console.log('auth redirect', req, res);
    res.redirect('/');
    res.end();
  },
);


app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});



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
