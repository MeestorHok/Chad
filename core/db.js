'use strict'

var bluebird = require('bluebird'),
    mongoose = require('mongoose')

var uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blue'

exports.connect = () => {
  mongoose.Promise = bluebird
  mongoose.connect(uri, {
    config: { autoIndex: process.env.NODE_ENV === 'development' },
    promiseLibrary: bluebird,
    useMongoClient: true
  })
}
