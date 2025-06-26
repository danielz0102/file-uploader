import passport from 'passport'
import { Strategy } from 'passport-local'
import bcrypt from 'bcryptjs'
import { db } from '#db'

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await db.user.findUnique({
        where: { username },
      })

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' })
      }

      return done(null, user)
    } catch (error) {
      return done(error)
    }
  }),
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    })
    done(null, {
      id: user.id,
      username: user.username,
    })
  } catch (error) {
    done(error)
  }
})
