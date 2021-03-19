<template>
<div>
  <div class="home">
    
    <div style="padding: 10px;">
      <div class="mb-3" style="padding:1em">
          <label for="exampleFormControlInput1" class="form-label" >Player's Name</label>
          <input class="form-control" id="playerName" placeholder="Acong" v-model="name" required>
      </div>
      <button type="button" class="btn btn-success" @click.prevent="registerName">Input Name</button>
    </div>
    <p v-if="displayReady">Please wait for the enemy to pick a name</p>
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
  }
  
};
</script>
