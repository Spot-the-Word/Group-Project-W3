import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    dataPlayer: [],
    dataWord: {},
    enemyName:''
  },
  mutations: {
    insertMessage (state, data) {
      state.data.push(data)
    },
    userPlayer (state, data) {
      state.dataPlayer.push(data)
    },
    word (state, data) {
      state.dataWord = data
    },
    newPlayer (state, data) {
      state.dataPlayer = data
    },
    enemyName(state, data){
      state.enemyName = data
    }
  },
  actions: {
  },
  modules: {
  }
})
