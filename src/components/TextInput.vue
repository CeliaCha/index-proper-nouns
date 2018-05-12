<template>
<div>
    <p>Texte :</p>
        <textarea v-model="submittedText" id="input-text" cols="120" rows="30"></textarea>
        <p>{{text_length}}</p>
        <!-- <p>{{properNouns}}</p> -->
        <div v-for="noun in properNouns" :key="noun" @click="addWordToIgnore(noun)">
            {{ noun }}
        </div>
</div>
</template>

<script>
/* eslint-disable */

import Analyser from "../utils/analyser"

export default {
    name: 'TextInput',
    data() {
        return {
            submittedText: "",
            storedNouns: [],
            wordsToIgnore: [],
        }
    },
    mounted: function () {
        if (localStorage.getItem('storedNouns')) this.storedNouns = JSON.parse(localStorage.getItem('storedNouns'))
        if (localStorage.getItem('wordsToIgnore')) this.wordsToIgnore = JSON.parse(localStorage.getItem('wordsToIgnore'))
    },
    watch: {
        storedNouns: {
            handler() {
                localStorage.setItem('storedNouns', JSON.stringify(this.storedNouns))
            }
        },
        wordsToIgnore: {
            handler() {
                localStorage.setItem('wordsToIgnore', JSON.stringify(this.wordsToIgnore))
            }
        },
    },
    computed: {
        text() {
            return new Analyser(this.submittedText)
        },
        text_length() {
            return this.text.getLength()
        },
        properNouns() {
            return this.text.getProperNouns(this.wordsToIgnore)
        }
    },
    methods: {
        addWordToIgnore(word) {
            this.wordsToIgnore.push(word.toLowerCase())
            console.log(this.wordsToIgnore)
        }
    },

}
</script>

<style scoped>

</style>
