import UserModel from '#models/UserModel.js'
import passport from 'passport'

async function signUp(req, res) {
  const { username, password } = req.body

  const user = await UserModel.create({ username, password })

  if (!user) {
    return res
      .status(400)
      .render('sign-up', { errors: ['The user already exists'] })
  }

  req.login(user, (err) => {
    if (err) {
      return res.status(500).render('error', {
        error: 'Login failed',
        message: 'An error occurred while logging in.',
      })
    }

    return res.status(201).render('/')
  })
}

async function login(req, res) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Authentication failed' })
    }

    if (!user) {
      return res.status(401).json({ error: info.message })
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Login failed' })
      }

      return res.status(200).json({ message: 'Login successful' })
    })
  })(req, res)
}

function logout(req, res) {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' })
    }

    return res.redirect('/')
  })
}

export default {
  signUp,
  login,
  logout,
}
