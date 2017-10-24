'use strict'

/**
 * Handle Login routes.
 * Get returns login page,
 * POST returns a passport function (receives the passport object)
 */
exports.login = {
  get: (req, res) => {
    res.render('backend/login', { url: req.path, csrfToken: req.csrfToken(), error: req.flash('error') })
  },
  post: (passport) => {
    return passport.authenticate('local',
      { successRedirect: '/admin', failureRedirect: '/login', failureFlash: true })
  }
}

/**
 * Handle Logout route and logic
 */
exports.logout = (req, res) => {
  req.logout()
  res.redirect('/login')
}
