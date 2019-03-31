import {store} from '@/services/word';

export default {
  namespaced: true,

  state: {
    value: undefined,
    loading: false
  },

  getters: {
    value(state) {
      return state.value
    },
    loading(state) {
      return state.loading
    }
  },

  mutations: {
    set(state, value) {
      state.value = value
    },
    clear(state) {
      state.value = undefined
    },
    setLoading(state, value) {
      state.loading = value
    }
  },

  actions: {
    async store({commit}, word) {
      commit('setLoading', true)
      await store(word)
      commit('setLoading', false)
      commit('clear')
    }
  }
}