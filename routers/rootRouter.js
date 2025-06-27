import { Router } from 'express'
import { RootController } from '#controllers/RootController.js'

export const rootRouter = Router()

rootRouter.get('/', RootController.renderHome)
rootRouter.get('/login', RootController.renderLogin)
rootRouter.get('/sign-up', RootController.renderSignUp)
