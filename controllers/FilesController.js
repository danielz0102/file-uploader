import { FileModel } from '#models/FileModel.js'

async function upload(req, res) {
  const { originalname, size, mimetype, buffer } = req.file
  await FileModel.create({
    userId: req.user.id,
    originalName: originalname,
    size,
    mimetype,
    buffer,
  })
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
