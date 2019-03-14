const config = require('../config')
const mongoose = require('mongoose')
const fs = require('fs')
const parse = require('csv-parse')
const {promisify} = require('util')
const parser = promisify(parse)
mongoose.connect(`mongodb://localhost:27017/${config.dbname}`, {useNewUrlParser: true})

const importCSV = (file) => {
    csv = fs.readFileSync(file, "utf8")
    return parser(csv, {delimiter: ';'})
}

const init = (Quote) => {
    Quote.deleteMany({}) //start by cleaning quotes collection
    .then(res => importCSV(config.csv))
    .then(quotes => quotes.map(quote => Quote.create({content: quote[0] + " - " + quote[1]})))
    .then(quotesPromises => Promise.all(quotesPromises))
    .then(res => console.log(`Imported ${res.length} quotes into db!`))
    .catch(err => console.error(err))
}

module.exports = {
    init: init
}