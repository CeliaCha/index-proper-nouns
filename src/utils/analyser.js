/* eslint-disable */
import commonWords from '../data/commonWords'
import { WSAECONNABORTED } from 'constants';

class Analyser {
    constructor (text) {
        this.input = text
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
         * @TODO
         * compter occurences des mots uniques
         * classer en fonction des résulats
         */

        // Get unique words (Lodash)
        let uniqueWords = _.uniq(this._formatText())

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
        let allProperNouns = this._formatText().filter(word => uppercaseWords.includes(word))

        // Count occurrences
        let  countOccurrences = {};
        allProperNouns.forEach(word => countOccurrences[word] = (countOccurrences[word]||0) + 1)



        // You can't "sort" the keys of an object, because they do not have a defined order. Think of objects as a set of key-value pairs, rather than a list of them.

        // You can, however, turn your JSON into a sorted list (array) of key-value pairs, yielding an object that looks like this:

        // [ ['X', 0.42498], ['B', 0.38408], ['A', 0.34891], ['C', 0.22523] ]

        // Demo:

        var result = {X: 0.42498, A: 0.34891, B: 0.38408, C: 0.22523}

        var sorted = Object.keys(countOccurrences).map(function (key) {
            return [key, this[key]]
        }, countOccurrences).sort(function (a, b) {
            return b[1] - a[1]
        })
        // console.log(sorted)



        return sorted
    }

}

export default Analyser