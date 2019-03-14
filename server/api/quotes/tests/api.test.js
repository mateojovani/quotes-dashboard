const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../../index')
chai.use(chaiHttp)
const expect = chai.expect
const should = chai.should()
const Quote = require('../models/quote')

describe('Api Endpoints', () => {

    describe('/GET quotes', () => {
        it('it should get quotes', (done) => {
            chai.request(app)
                .get('/api/quotes/')
                .end((err, res) => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.quotes).to.be.an('array')
                    expect(res).to.have.status(200)
                    done()
                })
        })
    })
})
