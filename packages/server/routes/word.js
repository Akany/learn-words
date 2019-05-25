import route from 'koa-route';

import userMiddleware from '../middleware/user.js';
import sessionMiddleware from '../middleware/session.js';

export default function(wordDB, userDB, sessionDB) {
  const storeWord = route.post('/api/word', async ctx => {
    await sessionMiddleware(sessionDB)(ctx);
    await userMiddleware(userDB)(ctx);

    const user = ctx.user;
    const {word} = ctx.request.body;

    await wordDB.insert({email: user.email, word});

    ctx.body = {word};
  });

  return storeWord;
}
