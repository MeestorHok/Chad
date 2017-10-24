'use strict'

var mongoose = require('mongoose')

var Page = new mongoose.Schema({
  username: String,
  password: String
})

module.exports = mongoose.model('Page', Page)
