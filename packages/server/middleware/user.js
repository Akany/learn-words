export default function(userDB) {
  return async (ctx) => {
    const {email} = ctx.session;

    ctx.user = await userDB.findOne({email});
  };
}