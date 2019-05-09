import route from 'koa-route';
import md5 from 'md5';

export function authRoute(usersDb, sessionDb) {
  return route.post('/api/auth', ctx => {
    const {email, password} = ctx.request.body;
    const hashedPassword = md5(password);

    return findUser(email, hashedPassword)
      .then(async (user) => {
        const token = md5(new Date().valueOf());
        const {email} = user;

        await setSession(email, token);

        return {...user, token};
      })
      .then(userResponse(ctx))
      .catch(noUserResponse(ctx));
  });

  async function findUser(email, password) {
    const user = await getUser(email, password);

    if (!user) {
      return Promise.reject();
    }

    return user;
  }

  function getUser(email, password) {
    return usersDb.findOne({email, password});
  }

  function setSession(email, token) {
    return sessionDb.replaceOne(
      {email},
      {email, token},
      {upsert: true}
    );
  }
};

export function restoreRoute(usersDb, sessionDb) {
  return route.post('/api/auth/restore', async ctx => {
    const {email, token} = ctx.request.body;

    return restoreUser(email, token)
      .then(userResponse(ctx))
      .catch(noUserResponse(ctx));
  });

  async function restoreUser(email, token) {
    const sessionExist = await isSessionExist(email, token);

    if (!sessionExist) {
      return Promise.reject('No session');
    }

    const user = await getUser(email);

    if (!user) {
      return Promise.reject();
    }

    return {...user, token};
  }

  function isSessionExist(email, token) {
    return sessionDb.findOne({email, token});
  }

  function getUser(email) {
    return usersDb.findOne({email});
  }
}

function userResponse(ctx) {
  return (user) => {
    ctx.body = {
      email: user.email,
      token: user.token
    };
  };
}

function noUserResponse(ctx) {
  return (error) => {
    console.log(error);
    ctx.status = 401;
  };
}