'use strict'

var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    controller = require('./controllers/authentication'),
    requireLoggedIn = require('../../helpers').enforceLoggedIn,
    requireLoggedOut = require('../../helpers').enforceLoggedOut,

router.get('/login', requireLoggedOut, controller.login.get)

router.post('/login', requireLoggedOut, controller.login.post(passport))

router.get('/logout', requireLoggedIn, controller.logout)

module.exports = router
