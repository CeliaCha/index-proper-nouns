<template>
<div>
    <p>Texte :</p>
        <textarea v-model="submittedText" id="input-text" cols="120" rows="30"></textarea>
        <p>{{text_length}}</p>
        <p>{{textToDisplay}}</p>
        <!-- <div v-for="sentence in textToDisplay" :key="sentence">
            {{ sentence }}
        </div> -->
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
            properNouns: "",
            storedNouns: [],
            storedWords: [],
        }
    },
    mounted: function () {
        if (localStorage.getItem('storedNouns')) this.storedNouns = JSON.parse(localStorage.getItem('storedNouns'))
        if (localStorage.getItem('storedWords')) this.storedWords = JSON.parse(localStorage.getItem('storedWords'))
    },
    watch: {
        storedNouns: {
            handler() {
                localStorage.setItem('storedNouns', JSON.stringify(this.storedNouns))
                deep: true
            }
        },
        storedWords: {
            handler() {
                localStorage.setItem('storedWords', JSON.stringify(this.storedWords))
                deep: true
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
        textToDisplay() {
            return this.text.getProperNouns()
        }
    },
    methods: {
        name() {

        }
    },

}
</script>

<style scoped>

</style>
