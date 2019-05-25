export default (sessionDB) => {
  return async (ctx) => {
    const token = ctx.request.body.token ||
      ctx.request.query.token;

    ctx.session = await sessionDB.findOne({token});
  };
};