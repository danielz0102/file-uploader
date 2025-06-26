import { Router } from 'express'
import FilesController from '#controllers/FilesController.js'
import { uploadFile } from '#middlewares/uploadFile.js'

export const filesRouter = Router()

filesRouter.get('/:userId', FilesController.renderFiles)
filesRouter.post('/:userId', uploadFile, FilesController.uploadFile)
