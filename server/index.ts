import path from 'path';
import express from 'express';
import cors from 'cors'
import prisma from './database/db';
import passport from 'passport';
import session from 'express-session';
import { readFileSync } from "fs";
import { createServer } from "https";
import { Server } from "socket.io";
import api from './routes/index';
require('dotenv').config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());
app.use('/api', api);



//ROUTERS------------------------------


import googleStrategy from 'passport-google-oauth20';
const GoogleStrategy = googleStrategy.Strategy;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session()); // Why did you remove me Vincent?!

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  (async (req: any, accessToken: any, refreshToken: any, profile: { id: any; emails: { value: any; }[]; displayName: any; photos: { value: any; }[]; }, cb: (arg0: undefined, arg1: undefined) => any) => {
    await prisma.users.create(
      {
        data: {
          googleId: profile.id,
          email: profile.emails[0].value,
          fullName: profile.displayName,
          profileURL: profile.photos[0].value,
        }
      })
      .catch(async () => {
        return await prisma.users.findUnique({
          where: {
            googleId: profile.id,
          },
        });
      });

    cb(null, profile);
  }),
));

passport.serializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
  // The USER object is the "authenticated user" from the done() in authUser function.
  // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.
  done(null, user);
});

passport.deserializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
  // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
  // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.

  done(null, user);
});


const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

app.get('/hidden', isLoggedIn, (req, res) => {
  res.send(req.user);
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'], accessType: 'offline', prompt: 'consent' })
);
  
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/eventListings',
    failureRedirect: '/login',
  })
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
  
  
  app.listen(process.env(APP_PORT), () => {
    console.log(`App listening on port http://localhost:${PORT}`);
  });

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: `${process.env(SOCKET_URL)}:${process.env(SOCKET_PORT)}}`,
    credentials: true
  }
});

httpServer.listen(3000);

global.onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log(CONNECTED SOCKET)
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

io.on('send-msg', (data) => {
    console.log('sendmsg', data, 'ONLINEUSERS', onlineUsers, 'GLOBAL OU', global.onlineUsers,)
    const sendUserSocket = onlineUsers.get(data.receiverId);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-receive', data.text)
    }
  });
});

