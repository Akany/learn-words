import Koa from 'koa';
import route from 'koa-route';
import bodyParse from 'koa-bodyparser';
import mongodb from 'mongodb';

const app = new Koa();
const url = 'mongodb://localhost:27017';

import {authRoute, restoreRoute} from './routes/user.js';

const storeWord = route.post('/api/word', async ctx => {
  ctx.body = {};
});

connectDatabase(url, 'book-words')
  .then((database) => {
    app.use(bodyParse());

    app.use(async (ctx, next) => {
      ctx.db = database;

      return await next();
    });

    const userDB = database.collection('user');
    const sessionDB = database.collection('session');

    app.use(authRoute(userDB, sessionDB));
    app.use(restoreRoute(userDB, sessionDB));
    app.use(storeWord);

    app.use(ctx => {
      ctx.body = 'Works';
    });

    app.listen(3010);
  });

function connectDatabase(url, name) {
  return new Promise((resolve, reject) => {
    mongodb.MongoClient.connect(url, (err, db) => {
      if (err) {
        reject(err);
      }

      resolve(db.db(name));
    });
  });
}
