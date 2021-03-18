<template>
  <div class="home">
    <label for="">Name </label>
    <input type="text" v-model="name">
    <button>Submit</button>
    <img alt="Vue logo" src="../assets/logo.png">
    <div v-for="(message, i) in messages" :key="i">
      <p>{{ message.name }} : <span>{{ message.msg }}</span></p>
    </div>
    <input type="text" v-model="msg">
    <button @click="input">Submit</button>
  </div>
</template>

<script>
// @ is an alias to /src

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
    }
  },
  methods: {
    input () {
      this.$store.commit('insertMessage', {
        name: this.name,
        msg: this.msg
      })
      this.$socket.emit('setMsg', {
        name: this.name,
        msg: this.msg
      })
      this.msg = ''
    },
  },
  computed: {
    messages () {
      return this.$store.state.data
    },
    namePlayer () {
      return this.$store.state.namePlayer
    }
  },
  components: {
  }
}
</script>
