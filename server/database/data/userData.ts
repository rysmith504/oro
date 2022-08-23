import prisma from '../db';

const createMany = await prisma.users.createMany({
  data: [{
    fullName: 'Bethany Jones',
    email: 'betpetjones@gmail.com',
    googleId: '324234131',
    fbId: 'https://www.facebook.com/bethany.ann.jones',
    instaId: 'https://www.instagram.com/plucky.puck/',
  },
  ]
});
 