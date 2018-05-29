/* eslint-disable */
import commonWords from '../data/commonWords'

class Analyser {
    constructor (text) {
        this.input = text
    }
    clearText () {
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
         * @TODO
         * détecter noms propres multiples
         */
        let clearedText = this.clearText()

        // Get unique words (Lodash)
        let uniqueWords = _.uniq(clearedText)

        // Find uppercase words
        let regexp = /^[A-Z]/
        let uppercaseWords = []
        for (let word of uniqueWords)  {
            if (regexp.test(word.charAt(0))) {
                if (
                    word.length > 2 
                    && !commonWords.includes(word.toLowerCase()) 
                    && !wordsToIgnore.includes(word.toLowerCase())
                ) uppercaseWords.push(word)
            }
        }
        
        // Clear common words from text
        let allProperNouns = clearedText.filter(word => uppercaseWords.includes(word))

        // Count occurrences
        let  countOccurrences = {};
        allProperNouns.forEach(word => countOccurrences[word] = (countOccurrences[word]||0) + 1)
        let sorted = Object.keys(countOccurrences).map(function (key) {
            return [key, this[key]]
        }, countOccurrences).sort(function (a, b) {
            return b[1] - a[1]
        })

        // Find multiples
        for (let word of uniqueWords) {
            /** 
             * find index of word in clearedText
             * let sequence = clearedText[index] + clearedText[index+1]
             * if (countOccurences(clearedText, sequence)) > n { multiples.push(sequence) }
             */
        }

        return sorted
    }

}

export default Analyser