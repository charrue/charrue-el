import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    auth: "user"
  },
  mutations: {
    SET_AUTH (state, auth) {
      state.auth = auth
    }
  }
})

export default store
