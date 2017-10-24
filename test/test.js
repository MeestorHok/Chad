'use strict'

var chai = require('chai'),
    should = chai.should(),
    chaiHttp = require('chai-http'),
    server = require('../bin/www')

chai.use(chaiHttp)

describe('Intro Tests', () => {
  it('Basic Test 1', () => {
    var num = 5
    num.should.equal(5)
  })
  it('Basic Test 2', (done) => {
    chai.request(server).get('/').end((err, res) => {
      res.should.have.status(200)
      done()
    })
  })
  it('Basic Test 3')
})
