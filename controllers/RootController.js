function renderHome(req, res) {
  res.render('home')
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
