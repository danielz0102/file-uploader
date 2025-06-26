import FileModel from '#models/FileModel.js'

export function renderFiles(req, res) {
  res.render('files')
}

export async function uploadFile(req, res) {
  if (!req.file) {
    return res.status(400).send('No file uploaded.')
  }

  const { filename, size, mimetype } = req.file
  const result = await FileModel.create({
    filename,
    userId: req.user.id,
    size,
    mimetype,
  })

  if (!result) {
    throw new Error('File was not created in the DB', req.file)
  }

  res.status(200).send('File uploaded successfully.')
}

export default {
  renderFiles,
  uploadFile,
}
