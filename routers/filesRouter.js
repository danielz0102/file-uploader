import { Router } from 'express'

import { FilesController } from '#controllers/FilesController.js'
import { UserValidator } from '#validators/UserValidator.js'
import { FileValidator } from '#validators/FileValidator.js'
import { getFile } from '#middlewares/getFile.js'

export const filesRouter = Router()

filesRouter.use('/', UserValidator.checkAuth)
filesRouter.post('/', getFile, FileValidator.checkFile, FilesController.upload)
filesRouter.get('/:id', FilesController.renderFile)
filesRouter.post('/:id/delete', FilesController.delete)
filesRouter.get('/:id/download', FilesController.download)
