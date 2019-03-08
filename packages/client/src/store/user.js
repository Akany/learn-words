export default {
  namespaced: true,

  state: {
    details: null
  },

  mutations: {
    setUser(state, details) {
      state.details = details
    }
  }
}
