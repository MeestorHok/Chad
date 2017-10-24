'use strict'

var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose')

var User = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  nickname: String,
  email: String,
  roles: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Role' } ]
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)
