import Vue from 'vue'
import Router from 'vue-router'

import home from './routes/home';
import login from './routes/login';
import preloader from './routes/preloader';
import {use as authHook} from './routes/auth-hook'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [home, login, preloader]
})

authHook(router)

export default router
