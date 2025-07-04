import { Router } from 'express'

import { getFile } from '#middlewares/getFile.js'
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
foldersRouter.get('/:id', FoldersController.renderFolder)
foldersRouter.post('/:id/files', getFile, FoldersController.addFile)
foldersRouter.post(
  '/:id/folders',
  FolderValidator.validateCreateForm,
  FoldersController.addChild,
)
foldersRouter.post('/:id/delete', FoldersController.delete)
