//Glues together the api parts
const db = require('./../../core/db')
const Quote = require('./models/quote')
const Category = require('./models/category')
db.init(Quote) //import initial quotes

const quotesRouter = require('./routes/quotes')({
    get: (params) => {
        if (params.id)
            return Quote.findById(params.id)
            .populate('category')
        else if (params.random)
            return Quote.getRandom()
        else //paginate quotes
            return Quote.getPage(params)
    },
    insert: (payload) => Quote.create(payload),
    update: (id, payload) => {
        return Quote.findById(id)
        .then(quote => Object.assign(quote, payload))
        .then(quote => quote.save())
    },
    remove: (id) => Quote.findOneAndRemove({_id: id})
})

//TODO
const categoriesRouter = require('./routes/categories')({
    get: (id) => {},
    update: (id) => {},
    remove: (id) => {}
})

module.exports = {
    quotesRouter: quotesRouter,
    categoriesRouter: categoriesRouter
}