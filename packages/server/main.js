const Koa = require('koa')
const route = require('koa-route')
const app = new Koa()
const bodyParse = require('koa-bodyparser')

const authRoute = route.post('/api/auth', ctx => {
  ctx.body = {
    name: ctx.request.body.email,
    token: ctx.request.body.email,
    playerId: ctx.request.body.email
  }
})

const restoreRoute = route.post('/api/auth/restore', async ctx => {
  ctx.body = {
    name: ctx.request.body.playerId,
    token: ctx.request.body.token,
    playerId: ctx.request.body.playerId
  }
})

app.use(bodyParse());

app.use(authRoute)
app.use(restoreRoute)

app.use(ctx => {
  ctx.body = 'Works'
});

app.listen(3010)
