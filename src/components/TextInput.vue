<template>
<div>
    <div class="wrapper">
        <div class="input-text">
            <h2>Texte à analyser :</h2>
            <textarea v-model="submittedText" id="input-text" cols="100" rows="30"></textarea>
            <p><i>{{text_length}} caractères</i></p>
        </div>
     
        <div class="proper-nouns">
            <div class="proper-noun" v-for="item in properNouns" :key="item[0]" @click="addWordToIgnore(item[0])">
                {{ item[0] }} : {{ item[1]}}
            </div>
        </div>
    </div>
</div>
</template>

<script>
/* eslint-disable */

import Analyser from "../utils/Analyser";

export default {
  data() {
    return {
      submittedText: "",
      storedNouns: [],
      wordsToIgnore: []
    };
  },
  mounted: function() {
    if (localStorage.getItem("storedNouns"))
      this.storedNouns = JSON.parse(localStorage.getItem("storedNouns"));
    if (localStorage.getItem("wordsToIgnore"))
      this.wordsToIgnore = JSON.parse(localStorage.getItem("wordsToIgnore"));
  },
  watch: {
    storedNouns: {
      handler() {
        localStorage.setItem("storedNouns", JSON.stringify(this.storedNouns));
      }
    },
    wordsToIgnore: {
      handler() {
        localStorage.setItem(
          "wordsToIgnore",
          JSON.stringify(this.wordsToIgnore)
        );
      }
    }
  },
  computed: {
    text() {
      return new Analyser(this.submittedText);
    },
    text_length() {
      return this.text.getLength();
    },
    properNouns() {
      return this.text.getProperNouns(this.wordsToIgnore);
    }
  },
  methods: {
    addWordToIgnore(word) {
      this.wordsToIgnore.push(word.toLowerCase());
      console.log(this.wordsToIgnore);
    }
  }
};
</script>

<style scoped>

.wrapper {
    display: flex;
}

.proper-nouns {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    cursor: pointer;
}

.proper-noun {
    width: 150px;
    height: 30px;
    line-height: 30px;
    margin: 5px;
    padding: 5px;
    color: white;
    background-color: black;
}
 .proper-noun:hover {
    color: black;
    background-color: lightgray;

 }

</style>
