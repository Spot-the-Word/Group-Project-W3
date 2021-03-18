<template>
<div>
  <div class="home">
    <div v-for="(data, i) in namePlayer" :key="i">
      <h3>{{data.name}}</h3>
      <p>point: <span>{{ data.poin }}</span></p>
    </div>
    <button @click="start">Start</button>
    <div>
      <p>{{ dataWord.clue }}</p>

  <div style="padding: 10px;">
        <div class="mb-3" style="padding:1em">
            <label for="exampleFormControlInput1" class="form-label">Player's Name</label>
            <input class="form-control" id="player2" placeholder="Player two's name">
        </div>
        <button type="button" class="btn btn-success">Input Name</button>

    </div>
    <label for="">Name </label>
    <input type="text" v-model="name">
    <button @click="inputName">Submit</button>
    <div v-for="(message, i) in messages" :key="i">
      <p>{{ message.name }} : <span>{{ message.msg }}</span></p>
    </div>
    <input type="text" v-model="msg">
    <button @click="input">Submit</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      name: '',
      msg: ''
    }
  },
  sockets: {
    fetchMessage (data) {
      this.$store.commit('insertMessage', data)
    },
    userPlayer (data) {
      this.$store.commit('userPlayer', data)
    },
    spotWord (data) {
      this.$store.commit('word', data)
    },
    newPoin (data) {
      this.$store.commit('newPlayer', data)
    }
  },
  methods: {
    input () {
      this.$store.commit('insertMessage', {
        name: localStorage.username,
        msg: this.msg
      })
      this.$socket.emit('setMsg', {
        name: localStorage.username,
        msg: this.msg
      })
      if(this.msg == this.dataWord.word.toLowerCase()) {
        let data = []
        this.namePlayer.forEach(el => {
          if(el.name == localStorage.username){
            el.poin += 10
          }
          data.push(el)
        })
        alert(localStorage.username + " mendapat 10 poin")
        this.$socket.emit('upPoin', data)
        this.$socket.emit('fetchWord')
      }
      this.msg = ''
    },
    inputName () {
      localStorage.setItem('username', this.name)
      this.$socket.emit('player', {
        name: this.name,
        poin: 0
      })
      this.name = ''
    },
    start () {
      this.$socket.emit('fetchWord')
    }
  },
  computed: {
    messages () {
      return this.$store.state.data
    },
    namePlayer () {
      return this.$store.state.dataPlayer
    },
    dataWord () {
      return this.$store.state.dataWord
    }
  }
}
</script>
