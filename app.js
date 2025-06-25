import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { PrismaClient } from '@prisma/client/extension'

import './config/auth.js'
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
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 1000 * 60 * 2,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
)
app.use(passport.session())

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
