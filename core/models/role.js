'use strict'

var mongoose = require('mongoose')

var Role = new mongoose.Schema({
  name: { type: String, unique: true },
  permissions: [ { type: String, unique: true } ]
})

module.exports = mongoose.model('Role', Role)
