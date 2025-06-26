function renderHome(req, res) {
  const username = req.user ? req.user.username : 'Guest'
  res.send(`Hello, ${username}`)
}

function renderLogin(req, res) {
  res.render('login')
}

function renderSignUp(req, res) {
  res.render('sign-up')
}

export default {
  renderHome,
  renderLogin,
  renderSignUp,
}
