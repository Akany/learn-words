import {login, restoreSession} from '@/services/auth';
import {set as saveCredentials} from '@/services/storage';

export default {
  namespaced: true,

  state: {
    token: null,
    playerId: null
  },

  mutations: {
    setToken(state, {token, playerId}) {
      state.token = token
      state.playerId = playerId
    }
  },

  actions: {
    login(context, credentials) {
      return login(credentials)
        .then(onLogin(context))
    },

    restore(context, session) {
      return restoreSession(session)
        .then(onLogin(context))
    },
  }
}

function onLogin({commit}) {
  return ({token, playerId, ...userDetails}) => {
    const session = {token, playerId}

    commit('setToken', session)
    saveCredentials('session', session)
    commit('user/setUser', userDetails, {root: true})
  }
}
