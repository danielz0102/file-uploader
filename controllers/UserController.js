import UserModel from '#models/UserModel.js'
import passport from 'passport'

async function signUp(req, res, next) {
  const { username, password } = req.body

  const user = await UserModel.create({ username, password })

  if (!user) {
    return res
      .status(400)
      .render('sign-up', { errors: ['The user already exists'] })
  }

  req.login(user, (err) => {
    if (err) {
      next(err)
    }

    return res.status(201).redirect('/')
  })
}

async function login(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      next(err)
    }

    if (!user) {
      return res.status(401).render('login', { errors: [info.message] })
    }

    req.login(user, (err) => {
      if (err) {
        next(err)
      }

      return res.status(200).redirect('/')
    })
  })(req, res)
}

function logout(req, res, next) {
  req.logout((err) => {
    if (err) {
      next(err)
    }

    return res.redirect('/')
  })
}

export default {
  signUp,
  login,
  logout,
}
