'use strict'

var express = require('express'),
    router = express.Router(),
    controller = require('./controllers/frontend')

/* GET frontend */
router.get('/', controller.index)

module.exports = router
