'use strict'

/**
 * Local Data initialization helper function
 */
exports.buildData = (req, csrf) => {
  var data = {
    user: req.user,
    url: req.path
  }
  if (csrf)
    data.csrfToken = req.csrfToken()
  return data
}

/**
 * Handle Index/Dashboard route
 */
exports.index = (req, res) => {
  res.render('backend/index', exports.buildData(req, true))
}

/**
 * Handle Global Settings routes
 */
exports.settings = {
  get: (req, res) => {
    res.render('backend/settings', exports.buildData(req, true))
  },
  post: (req, res) => {
    res.status(200).send('Your site preferences have been updated successfully!')
  }
}

/**
 * Handle Theme Management routes
 */
exports.themes = {
  get: (req, res) => {
    res.render('backend/themes', exports.buildData(req, true))
  },
  post: (req, res) => {
    res.status(200).send('File has been uploaded to ' + req.file.path)
  }
}
