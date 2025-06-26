import { Router } from 'express'
import UserController from '#controllers/UserController.js'

export const usersRouter = Router()

usersRouter.post('/sign-up', UserController.signUp)
