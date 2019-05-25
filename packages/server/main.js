import Koa from 'koa';
import bodyParse from 'koa-bodyparser';
import mongodb from 'mongodb';

const app = new Koa();
const url = 'mongodb://localhost:27017';

import {authRoute, restoreRoute} from './routes/user.js';
import storeWord from './routes/word.js';
import getWords from './routes/word-get.js';

connectDatabase(url, 'book-words')
  .then((database) => {
    app.use(bodyParse());

    app.use(async (ctx, next) => {
      ctx.db = database;

      return await next();
    });

    const userDB = database.collection('user');
    const sessionDB = database.collection('session');
    const wordDB = database.collection('word');

    app.use(authRoute(userDB, sessionDB));
    app.use(restoreRoute(userDB, sessionDB));
    app.use(storeWord(wordDB, userDB, sessionDB));
    app.use(getWords(wordDB, userDB, sessionDB));

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
