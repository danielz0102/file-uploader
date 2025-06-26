import express from 'express'
import session from 'express-session'
import passport from 'passport'

import './config/auth.js'
import { sessionStore } from '#db'
import { PORT, COOKIE_SECRET, NODE_ENV } from '#config/config.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')
app.set('trust proxy', 1)

app.use(
  session({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: NODE_ENV === 'production',
      httpOnly: true,
    },
    store: sessionStore,
  }),
)
app.use(passport.session())

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
