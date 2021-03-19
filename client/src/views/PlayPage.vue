<template>
<div id="page">
            <div style="padding-top: 10px;">
            </div>
            <div class="text-center">
              <h2 style="text-align:center;vertical-align: middle" class="mb-5">Level {{ $store.state.level }}</h2>
              <h1 style="text-align:center;vertical-align: middle; font-size:80px" class="mb-2"> {{ dataWord }}</h1>
                <h3 style="text-align:center;vertical-align: middle" class="mt-4"> {{ $store.state.dataWord.clue }}</h3>
            </div>
            <div class="row d-flex justify-content-center;">
                <div style="text-align:center;vertical-align: middle;">
                    <div class="col" style="padding: 1em">
                        <label class="form-label form-rounded"  style="padding-top: 10px;">Put Your Answer Here</label><br>
                        <input class="form-control form-rounded border border-secondary  w-25 mx-auto" id="answer" placeholder="Your Answer" v-model="msg"><br>
                        <button type="button" class="btn btn-success" @click.prevent="input">Enter</button>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <div style="background-color: antiquewhite; padding: 30px; margin:20px" class="w-25 rounded text-center">
                    <h3>{{ name }} </h3>
                    <h2> {{ score }} </h2>
            </div>
            <div style="background-color: antiquewhite; padding: 30px; margin:20px" class="w-25 rounded text-center">
                <h3 >{{ $store.state.enemyName }}</h3>
                <h2> {{ enemyScore }}</h2>
        </div>
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
        const removeCount = Math.floor(0.6 * word.length);
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
      if(this.$store.state.score === 100){
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
        if(this.$store.state.score === 100 ){
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


<style scoped>
#page{
  background-size: cover;
  padding-top: 3em;
  min-height: 100vh;
  background-image:url('../assets/flat-4041617_1920.png');
}
</style>
