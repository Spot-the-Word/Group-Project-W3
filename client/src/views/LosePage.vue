<template>
<div class="text-center">
  <h1>YOU LOSE</h1>
  <label for="">Play Again ?</label>
  <button @click.prevent="playAgain">YES</button>
</div>
</template>

<script>
export default {
  name: "LosePage",
  methods: {
    playAgain(){
      localStorage.clear()
      this.$socket.emit('resetPlayerName')
      this.$store.commit('resetAll')
      this.$router.push('/')
    }
  }
  
};
</script>
