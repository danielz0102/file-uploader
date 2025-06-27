import { Router } from 'express'

import { FilesController } from '#controllers/FilesController.js'
import { UserValidator } from '#validators/UserValidator.js'
import { uploadFile } from '#middlewares/uploadFile.js'

export const filesRouter = Router()

filesRouter.use('/', UserValidator.checkAuth)
filesRouter.post('/', uploadFile, FilesController.upload)
