import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
  },
  mutations: {
    insertMessage (state, data) {
      state.data.push(data)
    }
  },
  actions: {
  },
  modules: {
  }
})
