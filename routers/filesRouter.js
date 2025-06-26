import { Router } from 'express'

import FilesController from '#controllers/FilesController.js'
import { uploadFile } from '#middlewares/uploadFile.js'
import UserValidator from '#validators/UserValidator.js'

export const filesRouter = Router()

filesRouter.get(
  '/:userId',
  UserValidator.checkAuth,
  FilesController.renderFiles,
)
filesRouter.post(
  '/:userId',
  UserValidator.checkAuth,
  uploadFile,
  FilesController.uploadFile,
)
