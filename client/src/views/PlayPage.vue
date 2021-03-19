<template>
  <div>
    <div>
      <h2>Level {{ $store.state.level }}</h2>
      <h3>{{ name }} (you) VS {{ $store.state.enemyName }}</h3>
      <h3>{{ score }} | {{ enemyScore }}</h3>



      <!-- </div>
    <button @click="start">Start</button>
    <div> -->
      <!-- <h1>{{ dataWord.word }}</h1>
      <p>{{ dataWord.clue }}</p>
      <label for="">Name </label>
      <input type="text" v-model="name" />
      <button @click="inputName">Submit</button>
      <div v-for="(message, i) in messages" :key="i">
        <p>
          {{ message.name }} : <span>{{ message.msg }}</span>
        </p>
      </div>
      <input type="text" v-model="msg" />
      <button @click="input">Submit</button> -->
    </div>
    <div style="padding: 1em">
      <h2>SPOT THE WORD !</h2>
    </div>
    <div style="padding: 1em">
      <h1>{{ dataWord }}</h1>
      <h3>{{ $store.state.dataWord.clue }}}</h3>
    </div>
    <div class="mb-3" style="padding: 1em">
      <label
        for="exampleFormControlInput1"
        class="form-label"
        style="padding-top: 10px"
        >Put Your Anser Here</label
      ><br />
      <input class="form-control" id="answer" placeholder="Your Answer" v-model="msg" /><br />
      <button type="button" class="btn btn-success" @click.prevent="input">Enter</button>
    </div>
    <div style="padding: 1em">
      <h3>SCORE</h3>
      <h2>100</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayPage",
  data() {
    return {
      // testWord: "SEMANGAT",
      name: localStorage.name,
      msg: '',


    };
  },
  computed: {
      score(){
        return this.$store.state.score
      },
      enemyScore(){
        return this.$store.state.enemyScore
      },
      messages() {
        return this.$store.state.data;
      },
      namePlayer() {
        return this.$store.state.dataPlayer;
      },
      //random questionnya
      dataWord() {
        const word = this.$store.state.dataWord.word
        const removeCount = Math.floor(0.4 * word.length);
        const indexToRemove = [];
        let modifiedWord = "";
        for (let i = 0; i < removeCount; i++) {
          let createIndexToRemove = Math.floor(
            Math.random() * word.length
          );
          let flag = true;
          for (let j = 0; j < indexToRemove.length; j++) {
            // createIndexToRemove
            //checkIndex
            if (indexToRemove[j] === createIndexToRemove) {
              j = 0;
              createIndexToRemove = Math.floor(
                Math.random() * word.length
              );
            }
          }
          if (flag) {
            indexToRemove.push(createIndexToRemove);
          }
        }
        for (let k = 0; k < word.length; k++) {
          let flag = true;
          for (let l = 0; l < indexToRemove.length; l++) {
            if (k === indexToRemove[l]) {
              flag = false;
            }
          }
          if (k === word.length - 1) {
            if (flag) {
              modifiedWord += `${word[k]}`;
            } else {
              modifiedWord += "_";
            }
          } else {
            if (flag) {
              modifiedWord += `${word[k]} `;
            } else {
              modifiedWord += "_ ";
            }
          }
        }
        return modifiedWord;
      }
  },
  sockets: {
    fetchMessage(data) {
      this.$store.commit("insertMessage", data);
    },
    userPlayer(data) {
      this.$store.commit("userPlayer", data);
    },
    //balikan dari server kirim random question
    spotWord(data) {
      this.$store.commit("word", data);
    },
    newPoin(data) {
      this.$store.commit("newPlayer", data);
    },
    enemyName(data){
      this.$store.commit('enemyName', data)
    },
    enemyScore(data){
      this.$store.commit('enemyScore', data)
    },
    nextRound(){
      // this.$store.commit('nextRound')
      if(this.$store.state.score >= 30){
        console.log('masuk next round socket', localStorage.name);
        this.$router.push('/winpage')
      }
      else{
        this.$router.push('/losepage')
      }
    },
    // showWinner(playerName){
    //   this.$router.push('/gameover/:name')
    //   this.$store.commit('winner', playerName)
    // }
  },
  methods: {
    input() {
      // history jawaban tiap orang
      // this.$store.commit("insertMessage", {
      //   name: localStorage.username,
      //   msg: this.msg,
      // });
      // show jawaban org lain
      // this.$socket.emit("setMsg", {
      //   name: localStorage.username,c
      //   msg: this.msg,
      // });
      if (this.msg.toLowerCase() == this.$store.state.dataWord.word.toLowerCase()) {
        
        this.$store.commit('addScore')
        this.$socket.emit('enemyScore')
        if(this.$store.state.score === 30 ){
          // this.$store.commit('resetWinnerScore')

          // berhenti game show winner
          // if(this.$store.state.score > this.$store.state.score)
          this.$socket.emit('nextRound')
        }
        
        // let data = [];
        // this.namePlayer.forEach((el) => {
        //   if (el.name == localStorage.username) {
        //     el.poin += 10;
        //   }
        //   data.push(el);
        // });
        // alert(localStorage.username + " mendapat 10 poin");
        // this.$socket.emit("upPoin", data);
        //start fecthing again
        this.$socket.emit("fetchWord");
      }
      this.msg = "";
    },
    inputName() {
      localStorage.setItem("username", this.name);
      this.$socket.emit("player", {
        name: this.name,
        poin: 0,
      });
      this.name = "";
    },
    start() {
      this.$socket.emit("fetchWord");
    },
  },
  created() {
    console.log(localStorage.name)
    this.start()
    // let timer = setInterval(() => {
    //   this.start()
    //   console.log('tiap 5 detik');
    // }, 5000);
    // setTimeout(()=>{
    //   clearInterval(timer)
    //   console.log('sudah 10 soal');
    // }, 10*5000)
  }
};
</script>

<style>
</style>