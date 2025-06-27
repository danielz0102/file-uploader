import { Router } from 'express'
import { FoldersController } from '#controllers/FoldersController.js'
import { UserValidator } from '#validators/UserValidator.js'
import { FolderValidator } from '#validators/FolderValidator.js'

export const foldersRouter = Router()

foldersRouter.use(UserValidator.checkAuth)
foldersRouter.post(
  '/',
  FolderValidator.validateCreateForm,
  FoldersController.createParent,
)
