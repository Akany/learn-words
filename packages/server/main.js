import Koa from 'koa';
import bodyParse from 'koa-bodyparser';
import mongodb from 'mongodb';

import dotenv from 'dotenv';

dotenv.config();

const app = new Koa();
const PORT = process.env.PORT;
const url = process.env.DB;

import {authRoute, restoreRoute} from './routes/user.js';
import userRegister from './routes/user-register.js';
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
    app.use(userRegister(userDB, sessionDB));
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
    mongodb.MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
      if (err) {
        reject(err);
      }

      resolve(db.db(name));
    });
  });
}
