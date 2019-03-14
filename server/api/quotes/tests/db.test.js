const db = require('../../../core/db')
const mongoose = require('mongoose')
const chai = require('chai')
const expect = chai.expect

describe('DB', () => {

    describe('Connection', () => {
        it('it should connect to the db', (done) => {
            expect(mongoose.connection.readyState).to.be.eq(1)
            done()
        })
    })
})
