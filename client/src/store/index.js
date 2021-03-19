import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // history jawaban tiap orang
    data: [],
    dataPlayer: [],
    // random questionnya
    dataWord: {word: '', clue: ''},
    enemyName:'',
    enemyScore: 0,
    score: 0,
    level : 1,
    // winnerName : ''
  },
  mutations: {
    // history jawaban tiap orang
    insertMessage (state, data) {
      state.data.push(data)
    },
    userPlayer (state, data) {
      state.dataPlayer.push(data)
    },
    //random questionnya
    word (state, data) {
      state.dataWord = data
    },
    newPlayer (state, data) {
      state.dataPlayer = data
    },
    enemyName(state, data){
      state.enemyName = data
    },
    enemyScore(state){
      state.enemyScore +=10
    },
    addScore(state){
      state.score += 10
    },
    nextRound(state){
      state.level++
    },
    resetAll(state){
      state.enemyName = ''
      state.enemyScore = 0
      state.score = 0
      state.level = 1
    },
    // resetWinnerScore(state){
    //   state.score = 0
    // }
    
    // winner(state, name){
    //   state.winnerName = name
    // }
  },
  actions: {
  },
  modules: {
  }
})
