import multer from 'multer'
import { FileModel } from '#models/FileModel.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split('.').pop()
    cb(null, `${crypto.randomUUID()}.${fileExtension}`)
  },
})
const uploadFile = multer({ storage }).single('file')

export const upload = [
  uploadFile,
  async (req, res) => {
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
  },
]

export const FilesController = {
  upload,
}
