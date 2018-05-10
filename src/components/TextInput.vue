<template>
<div>
    <p>Texte :</p>
        <textarea v-model="submitted_text" id="input-text" cols="120" rows="30"></textarea>
        <p>{{text_length}}</p>
        <!-- <p>{{displayText}}</p> -->
        <div v-for="sentence in displayedText" :key="sentence">
            {{ sentence }}
        </div>
</div>
</template>

<script>
/* eslint-disable */

import Analyser from "../utils/analysis_class"

export default {
    name: 'TextInput',
    data() {
        return {
            submitted_text: ""
        }
    },
    computed: {
        text_length() {
            let test = new Analyser(this.submitted_text)
            return test.getLength()
        },
        displayedText() {
            let text = new Analyser(this.submitted_text)
            return text.clear()
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
