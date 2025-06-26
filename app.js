import express from 'express'
import session from 'express-session'
import passport from 'passport'

import './config/auth.js'
import { sessionStore } from '#db'
import { PORT, COOKIE_SECRET, NODE_ENV } from '#config/config.js'

import { rootRouter } from '#routers/rootRouter.js'
import { usersRouter } from '#routers/usersRouter.js'
import { filesRouter } from '#routers/filesRouter.js'

import { handle404 } from '#middlewares/handle404.js'
import { handleError } from '#middlewares/handleError.js'
import { setUsers } from '#middlewares/setUsers.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')
app.set('trust proxy', 1)

app.use(express.urlencoded({ extended: true }))
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

app.use(setUsers)
app.use('/', rootRouter)
app.use('/', usersRouter)
app.use('/files', filesRouter)
app.use(handle404)
app.use(handleError)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
