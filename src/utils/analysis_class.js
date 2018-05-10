/* eslint-disable */

class Analyser {
    constructor (input) {
        this.text = input
    }
    getLength () {
        return this.text.length
    }
    _formatText () {

        // Remove special chars
        let temp = this.text.replace(/\n|\t|\r/g, ' ')

        // Remove double spaces
        temp = temp.replace(/ {2,}/g, ' ')

        // Use Sbd library to check sentences
        let tokenizer = require('sbd')
        temp = tokenizer.sentences(temp)

        return temp
    }
    clear () {
        let test = _.uniq(this._formatText())
        return this._formatText()
    }
}

export default Analyser