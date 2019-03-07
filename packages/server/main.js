const Koa = require('koa')
const route = require('koa-route')
const app = new Koa()
const bodyParse = require('koa-bodyparser')

const authRoute = route.post('/api/auth', ctx => {
  ctx.body = {name: ctx.request.body.email}
})

app.use(bodyParse());

app.use(authRoute)

app.use(ctx => {
  ctx.body = 'Works'
});

app.listen(3010)
