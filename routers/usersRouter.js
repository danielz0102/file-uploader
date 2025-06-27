import { Router } from 'express'
import { UserController } from '#controllers/UserController.js'
import { UserValidator } from '#validators/UserValidator.js'

export const usersRouter = Router()

usersRouter.post(
  '/sign-up',
  UserValidator.validateSignUp,
  UserController.signUp,
)
usersRouter.post('/login', UserController.login)
usersRouter.get('/logout', UserController.logout)
