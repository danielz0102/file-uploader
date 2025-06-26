import UserModel from '#models/UserModel.js'

async function signUp(req, res) {
  const { username, password } = req.body

  const user = await UserModel.create({ username, password })

  if (!user) {
    return res.status(400).json({ error: 'Username already exists' })
  }

  req.login(user, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Login failed' })
    }

    return res.status(201).json({ message: 'User created successfully', user })
  })
}

export default {
  signUp,
}
