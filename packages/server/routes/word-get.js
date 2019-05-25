import route from 'koa-route';

import userMiddleware from '../middleware/user.js';
import sessionMiddleware from '../middleware/session.js';

export default function(wordDB, userDB, sessionDB) {
  const getWords = route.get('/api/word', async ctx => {
    await sessionMiddleware(sessionDB)(ctx);
    await userMiddleware(userDB)(ctx);

    const user = ctx.user;
    const {word} = ctx.request.body;

    const words = await wordDB
      .find({email: user.email})
      .toArray();

    ctx.body = words
      .map((row) => {
        const {email, word} = row;

        return  {email, word};
      });
  });

  return getWords;
}
