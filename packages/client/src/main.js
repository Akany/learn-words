import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {get as getSession} from '@/services/storage'

Vue.config.productionTip = false

restoreSession()
  .then(bootstrapView)

function bootstrapView() {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

function restoreSession() {
  return new Promise(resolve => {
    const session = getSession('session')

    if (!session) {
      return resolve();
    }

    store
      .dispatch('session/restore', session)
      .then(resolve)

  })
}
