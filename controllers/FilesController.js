import { FileModel } from '#models/FileModel.js'

async function upload(req, res) {
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

  res.redirect('/')
}

export const FilesController = {
  upload,
}
