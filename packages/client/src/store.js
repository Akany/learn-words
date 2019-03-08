import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/user'
import session from '@/store/session'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},

  modules: {
    user,
    session
  }
})
