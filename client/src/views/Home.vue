<template>
<div>
  <div class="home">
      <div class="container" style="padding-top: 6em;" >
        <div class="row">
            <div class="col col-6">
                <img src="https://image.freepik.com/free-vector/people-character-surrounded-with-gadgets-flat-design-concept-illustration_5379-225.jpg">
            </div>
            <div class="col col-3" style="padding-top:5em">
                <label class="form-label col-xs-4" style="vertical-align: middle;padding-bottom: 1em; text-align: center;">Player's Name</label>
                <input class="form-control form-rounded" id="player" placeholder="Player's name" style="margin-bottom:3em; size:5" v-model="name" required>
                <button type="button" class="btn btn-primary btn-md col-xs-4"  @click.prevent="registerName">Enter here</button>
            </div>
              <p v-if="displayReady">Please wait for the enemy to pick a name</p>
         </div>
    </div> 
  </div> 
</div> 
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      name: "",
      start: false,
      displayReady : false,
      playerCount : this.$store.state.dataPlayer
    };
  },
  methods: {
    registerName(){
      this.$socket.emit('playerName', this.name)
      //nambahin player ke store
      this.$store.commit('userPlayer', this.name)
      console.log(this.name);
      localStorage.setItem('name', this.name)
      this.displayReady = true
    }
  },
  sockets: {
    startGame(){
      this.start = true
    },
    enemyName(data){
      this.$store.commit('enemyName', data)
    }
  },
  watch: {
    start(){
      if(this.start){
        this.$router.push('/play')
      }
    }
  },
  created() {
      localStorage.clear()
      this.$socket.emit('resetPlayerName')
      this.$store.commit('resetAll')
  },
  
};
</script>
