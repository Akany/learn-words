import Vue from 'vue'
import Router from 'vue-router'

import home from './routes/home';
import login from './routes/login';
import {use as authHook} from './routes/auth-hook'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [home, login]
})

authHook(router)

export default router
