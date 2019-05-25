import route from 'koa-route';
import md5 from 'md5';

export default function(userDb, sessionDb) {
  return route.post('/api/user', async ctx => {
    const {email, password} = ctx.request.body;
    const token = md5(new Date().valueOf());

    const currentUser = await userDb
      .findOne({email});

    if (currentUser) {
      ctx.status = 400;
      ctx.body = {message: 'User exist'};

      return;
    }

    await userDb
      .insertOne({email, password: md5(password)});

    await sessionDb
      .insertOne({email, token});

    ctx.body = {email, token};
  });
};