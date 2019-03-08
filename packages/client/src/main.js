import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {get as getSession} from '@/services/storage'

Vue.config.productionTip = false

restoreSession()
  .then(() => router.push('/preloader'))
  .catch(() => router.push('/login'))
  .then(bootstrapView)

function bootstrapView() {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

function restoreSession() {
  return new Promise((resolve, reject) => {
    const session = getSession('session')

    if (!session) {
      return reject();
    }

    store
      .dispatch('session/restore', session)
      .then(() => router.push('/'))

    resolve()
  })
}
