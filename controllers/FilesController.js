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

async function renderFile(req, res) {
  const file = await FileModel.getInfo(req.params.id)

  res.render('file', {
    file: {
      id: file.id,
      name: file.originalName,
      size: Number(file.size),
      uploadTime: file.createdAt.toLocaleString(),
      type: file.mimetype,
    },
  })
}

async function deleteFile(req, res) {
  await FileModel.delete(req.params.id)
  res.redirect('/')
}

async function download(req, res) {
  const file = await FileModel.select(req.params.id, [
    'filename',
    'originalName',
  ])
  const filePath = `./uploads/${file.filename}`

  res.download(filePath, file.originalName)
}

export const FilesController = {
  upload,
  renderFile,
  delete: deleteFile,
  download,
}
