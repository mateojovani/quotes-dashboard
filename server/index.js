const createError = require('http-errors')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = require('./config').server.port || 8080
const cors = require('cors')

const {
    quotesRouter,
    categoriesRouter
} = require('./api/quotes')

app.use(cors())
app.use(bodyParser.json())
app.use('/api/quotes', quotesRouter)

// catch 404
app.use((req, res, next) => {
    next(createError(404))
})

//error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({message: err.message})
})

module.exports = app.listen(port, () =>
    console.log(`Api server listening on port ${port}!`
))