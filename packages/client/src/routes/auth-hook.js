import store from '@/store';

export function use(router) {
  router.beforeEach((to, from, next) => {
    const {token} = store.state.session
    const authCheck = to.matched
      .some(authRoute)

    if (authCheck && !token) {
      return next('/login')
    }

    next()
  })
}

function authRoute(route) {
  return route.meta.auth === true;
}