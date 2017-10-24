'use strict'

/**
 * Handle Index/Dashboard route
 */
exports.index = (req, res) => {
  res.render('index', { title: 'A Blue Site' })
}
