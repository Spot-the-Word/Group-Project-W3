<template>
  <div>
    <div>
      <h2>Level {{ level }}</h2>
      <h3>{{ name }} (you) VS {{ $store.state.enemyName }}</h3>
      <h3>{{ poin }} | {{ enemyPoin }}</h3>
      <!-- </div>
    <button @click="start">Start</button>
    <div> -->
      <h2>SPOT THE WORD !</h2>
      <h1>{{ dataWord.word }}</h1>
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
      <button @click="input">Submit</button>
    </div>
    <div style="padding: 1em">
      <h2>Kata</h2>
    </div>
    <div style="padding: 1em">
      <h1>{{ randomRemoveAlphabetByLevel }}</h1>
      <h3>clue disini</h3>
    </div>
    <div class="mb-3" style="padding: 1em">
      <label
        for="exampleFormControlInput1"
        class="form-label"
        style="padding-top: 10px"
        >Put Your Anser Here</label
      ><br />
      <input class="form-control" id="answer" placeholder="Your Answer" /><br />
      <button type="button" class="btn btn-success">Enter</button>
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
      testWord: "SEMANGAT",
      name: localStorage.name,
      level: 0
      // level: 1
    };
  },
  computed: {
    randomRemoveAlphabetByLevel() {
      const removeCount = Math.floor(0.4 * this.testWord.length);
      const indexToRemove = [];
      let modifiedWord = "";
      for (let i = 0; i < removeCount; i++) {
        let createIndexToRemove = Math.floor(
          Math.random() * this.testWord.length
        );
        let flag = true;
        for (let j = 0; j < indexToRemove.length; j++) {
          // createIndexToRemove
          //checkIndex
          if (indexToRemove[j] === createIndexToRemove) {
            j = 0;
            createIndexToRemove = Math.floor(
              Math.random() * this.testWord.length
            );
          }
        }
        if (flag) {
          indexToRemove.push(createIndexToRemove);
        }
      }
      for (let k = 0; k < this.testWord.length; k++) {
        let flag = true;
        for (let l = 0; l < indexToRemove.length; l++) {
          if (k === indexToRemove[l]) {
            flag = false;
          }
        }
        if (k === this.testWord.length - 1) {
          if (flag) {
            modifiedWord += `${this.testWord[k]}`;
          } else {
            modifiedWord += "_";
          }
        } else {
          if (flag) {
            modifiedWord += `${this.testWord[k]} `;
          } else {
            modifiedWord += "_ ";
          }
        }
      }
      return modifiedWord;

      // future feature<<<
      // const removeCount = 0
      // if(this.level >= 5){
      //     while (this.level>= 5){
      //         removeCount++
      //     }

      // }else{
      //     removeCount
      // }

      },
      messages() {
        return this.$store.state.data;
      },
      namePlayer() {
        return this.$store.state.dataPlayer;
      },
      dataWord() {
        return this.$store.state.dataWord;
      }
  },
  sockets: {
    fetchMessage(data) {
      this.$store.commit("insertMessage", data);
    },
    userPlayer(data) {
      this.$store.commit("userPlayer", data);
    },
    spotWord(data) {
      this.$store.commit("word", data);
    },
    newPoin(data) {
      this.$store.commit("newPlayer", data);
    },
    enemyName(data){
      this.$store.commit('enemyName', data)
    }
  },
  methods: {
    input() {
      this.$store.commit("insertMessage", {
        name: localStorage.username,
        msg: this.msg,
      });
      this.$socket.emit("setMsg", {
        name: localStorage.username,
        msg: this.msg,
      });
      if (this.msg == this.dataWord.word.toLowerCase()) {
        let data = [];
        this.namePlayer.forEach((el) => {
          if (el.name == localStorage.username) {
            el.poin += 10;
          }
          data.push(el);
        });
        alert(localStorage.username + " mendapat 10 poin");
        this.$socket.emit("upPoin", data);
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
  }
};
</script>

<style>
</style>