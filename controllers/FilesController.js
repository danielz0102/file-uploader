import { FileModel } from '#models/FileModel.js'

export function renderFiles(req, res) {
  res.render('files')
}

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

  res.redirect('/files')
}

export const FilesController = {
  renderFiles,
  uploadFile,
}
