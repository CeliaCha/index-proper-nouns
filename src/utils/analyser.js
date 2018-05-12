/* eslint-disable */
import commonWords from '../data/commonWords'

class Analyser {
    constructor (text) {
        this.input = text
    }
    display () {
        return this._formatText()
    }
    _formatText () {
        // Remove special chars
        let text = this.input.replace(/\n|\t|\r/g, ' ')

        // Remove double spaces
        text = text.replace(/\s+/g,' ').trim()

        // Use Sbd library to check sentences
        let tokenizer = require('sbd')
        text = tokenizer.sentences(text)
        text = text.join(" §s§")

        // Remove ponctuation
        text = text.replace(/[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=—]/g," ")
        text = text.replace(/“|”/g, " ")

        // Remove double spaces again
        text = text.replace(/\s+/g,' ').trim()

        // Split result
        text = text.split(' ')
 
        return text
    }
    getLength () {
        return this.input.length
    }
    getProperNouns (wordsToIgnore) {
        /**
         * nettoyer ponctuation
         * get uniques
         * chercher mots en capitale parmi uniques
         * compter occurences des mots uniques
         * classer en fonction des résulats
         */

        // Get uniques words
        let uniqueWords = _.uniq(this._formatText())

        // Find uppercase words
        let regexp = /^[A-Z]/
        let uppercaseWords = []
        for (let word of uniqueWords)  {
            if (regexp.test(word.charAt(0))) {
                if (
                    word.length > 2 && !commonWords.includes(word.toLowerCase()) 
                    && !wordsToIgnore.includes(word.toLowerCase())
                ) uppercaseWords.push(word)
            }
        }

        return uppercaseWords
    }

}

export default Analyser