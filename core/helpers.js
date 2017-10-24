'use strict'

exports.ejs = {
  slashBefore (str) { return (str.charAt(0) === '/') ? str : '/' + str },
  titleCase (str) { return this.slugify(str).replace(/[_-]+/g, ' ').replace(/\w\S*/g, (txt) => (txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())) },
  slugify (str) { return str.toLowerCase().replace(/[^\w_\- ]+/g, '').replace(/[_ ]+/g, '-') },
  link (str) { return '/admin' + this.slashBefore(str) },
  active (a, b) { return (a === b) ? ' active' : '' }
}

/**
 * Ensure a user is logged in middleware
 */
exports.enforceLoggedIn = (req, res, next) => {
  if(req.isAuthenticated())
    next()
  else
    res.redirect('/login')
}

/**
 * Ensure a user is logged out middleware
 */
exports.enforceLoggedOut = (req, res, next) => {
  if(!req.isAuthenticated())
    next()
  else
    res.redirect('/admin')
}

/**
 * Ensure an admin user exists
 */
var User = require('./models/user'),
    Role = require('./models/role'),
    settings = require('../settings')

exports.ensureAdminExists = () => {
  Role.findOne({ name: 'admin' }).exec()
    .then((role) => {
      if (role == null) {
        var newRole = new Role({ name: 'admin', permissions: ['globalAdmin'] })
        newRole.save().then(getAdminUser)
      } else {
        getAdminUser(role)
      }
    })

  function getAdminUser(role) {
    User.findOne({ roles: role._id }).exec()
      .then((user) => {
        if (user == null) {
          User.register(new User({
            username: settings.default_user.username,
            nickname: settings.default_user.nickname,
            email: settings.default_user.email,
            roles: [ role._id ]
          }), settings.default_user.password,
          (err) => { })
        }
      })
  }
}

/**
 * Create session cookie definition
 */
var crypto = require('crypto')
exports.sess = (app, production) => {
  var sess = {
    secret: crypto.randomBytes(48).toString('hex'), // secret hash
    key: 'session_id', // name of cookie
    resave: false, // don't save if unmodified
    saveUninitialized: false, // don't save until something is created
    cookie: {}
  }
  if (production) {
    app.set('trust proxy', 1) // trust first (nginx/apache) proxy (to allow secure cookies)
    sess.cookie = {
      httpOnly: true, // prevent session hijacking
      secure: true, // only serve cookies over HTTPS
      domain: process.env.DOMAIN, // domain cookie is readable on
      expires: new Date(Date.now() + 60 * 60 * 1000) // expire in 1 hour
    }
  }
  return sess
}
