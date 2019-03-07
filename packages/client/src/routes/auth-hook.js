let block = true

export function use(router) {
  router.beforeEach((to, from, next) => {
    const authCheck = to.matched
      .some(authRoute)

    if (authCheck && block) {
      next('/login')
      block = false;
    }

    next()
  })
}

function authRoute(route) {
  return route.meta.auth === true;
}