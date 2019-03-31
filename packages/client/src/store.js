import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/user'
import session from '@/store/session'
import word from '@/store/word'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},

  modules: {
    user,
    session,
    word
  }
})
