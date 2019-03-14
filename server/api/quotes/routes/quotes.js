const express = require('express')
const router = express.Router()

module.exports = ({ get, insert, update, remove }) => {
    /**
     * CRUD on a quote
     */
    router
        .get('/random', (req, res, next) => {
            get({random: true})
            .then(quote => res.status(200).json(quote))
            .catch(err => res.status(500).json({message: "Bad request!"}))
        })
        .get('/:id', (req, res) => {
            get({id: req.params.id})
            .then(quote => {
                if (quote)  res.status(200).json(quote)
                else res.status(404).json({message: "No quote found"})
            })
            .catch(err => res.status(500).json({message: "Bad request!"}))
        })
        .put('/:id', (req, res) => {
            update(req.params.id, req.body.quote)
            .then(updatedQuote => res.status(200).json(updatedQuote))
            .catch(err => res.status(500).json({message: "Bad request!"}))
        })
        .delete('/:id', (req, res) => {
            remove(req.params.id)
            .then(result => res.status(200).json({message: "Quote removed successfully"}))
            .catch(err => res.status(500).json({message: "Bad request!"}))
        })
        .post('/', (req, res) => {
            insert(req.body.quote)
            .then(insertedQuote => res.status(200).json(insertedQuote))
            .catch(err => res.status(500).json({message: "Bad request!"}))
        })

    /**
     * Quotes filtering
     */
    router
        .get('/', (req, res) => {
            let params = {
                page: req.query.page || 1, //default pagination
                sortBy: req.query.sortBy || 'created_at',
                sort: req.query.sort || 'DESC',
                filterBy: req.query.filterBy || 'content',
                filter: req.query.filter || ''
            }

            get(params).then(response => {
                res.status(200).json(response)
            })
            .catch(err => res.status(500).json({message: err}))
        })

    return router
}