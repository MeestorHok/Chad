'use strict'

var express = require('express'),
    path = require('path'),
    router = express.Router(),
    multer = require('multer'),
    controller = require('./controllers/backend')

/* GET Dashboard */
router.get('/', controller.index)

/* GET Site Management Tools */
router.get('/settings', controller.settings.get)
/* POST Site Management Tools */
router.post('/settings', controller.settings.post)

/* GET Themes Page */
router.get('/themes', controller.themes.get)
/* POST Upload Theme */
router.post('/themes', multer({ dest: path.join(__dirname, '..', '..', 'temp/'),
fileFilter: (req, file, cb) => {
  if (file.mimetype != 'zip') cb(null, false)
  else cb(null, true)
}, limits: { fileSize: 1024*1024*2 } // 2MB
}).single('new_theme'), controller.themes.post)

// catch 404 and forward to error handler
router.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
router.use((err, req, res) => {
  res.locals.message = err.message
  res.locals.error = err

  // render the error page
  res.status(err.status || 500).render('backend/error', controller.buildData(req))
})

module.exports = router
