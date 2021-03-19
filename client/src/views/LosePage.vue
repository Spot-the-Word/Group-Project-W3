<template>
<div class="text-center">
  <div id="lose" class="text-center">
  <div class="mb-5 d-flex justify-content-center" >
            <h1 style="font-size: 100px;color: white; text-shadow: grey;" >YOU LOSE</h1>
        </div>
        <div class="mt-5 d-flex justify-content-center">
            <button @click.prevent="playAgain" type="button" class="btn btn-primary btn-lg">Play Again</button>
        </div>
</div>
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

<style scoped>
#lose{
  background-image: url('../assets/space-rocket-minimal_1541970810.jpg');
  background-size: cover;
  padding-top: 3em;
  min-height: 100vh;
}
</style>

