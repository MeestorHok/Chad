'use strict'

var express = require('express'),
    path = require('path'),
    helmet = require('helmet'),
    csrf = require('csurf'),
    favicon = require('serve-favicon'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    passport = require('passport')

var frontend = require('../content/routes/frontend'),
    backend = require('./backend/routes/backend'),
    loginLogout = require('./backend/routes/authentication'),
    db = require('./db'),
    settings = require('../settings'), // replace with db?
    helpers = require('./helpers')

var app = express()

// view engine setup
app.set('views', [ path.join(__dirname, 'backend', 'views'), path.join(__dirname, '..', 'content', 'views')])
app.set('view engine', 'ejs')

app.use(favicon(path.join(__dirname, '..', 'content', 'public', 'favicon.ico')))

// set up logging if in a development environment
if (app.get('env') === 'development') {
  app.use(require('morgan')('dev', { stream:  process.stdout }))
}

// set up security and sessions
app.use(helmet())
app.use(session(helpers.sess(app, app.get('env') === 'production')))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

// read request body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Connect to the Database
db.connect()

// start serving files and urls for frontend
app.use(express.static(path.join(__dirname, '..', 'content', 'public')))
app.use('/', frontend)

// Set up local variables & helpers for templating
Object.assign(app.locals, settings)
Object.assign(app.locals, helpers.ejs)

// Define Passport protocol
var User = require('../models/user')
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Ensure there is at least 1 admin user (Create admin account if none exists)
helpers.ensureAdminExists()

// validate CSRF token
app.use(csrf({ cookie: false }))

// handle backend urls
app.use(express.static(path.join(__dirname, 'backend', 'public')))
app.use('/', loginLogout)
app.use('/admin', helpers.enforceLoggedIn, backend, (req, res) => { res.sendStatus(401) })

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = (req.app.get('env') === 'development') ? err : {}

  // render the error page
  res.status(err.status || 500).render('error')
})

module.exports = app
