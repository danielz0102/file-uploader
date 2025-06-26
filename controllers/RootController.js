function renderHome(req, res) {
  res.send('Hello, World!')
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
