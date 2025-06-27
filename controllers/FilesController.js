import { FileModel } from '#models/FileModel.js'

export async function uploadFile(req, res) {
  const { filename, originalname, size, mimetype } = req.file
  const result = await FileModel.create({
    filename,
    originalName: originalname,
    userId: req.user.id,
    size,
    mimetype,
  })

  if (!result) {
    throw new Error('File was not created in the DB', req.file)
  }

  res.redirect(201, '/')
}

export const FilesController = {
  uploadFile,
}
