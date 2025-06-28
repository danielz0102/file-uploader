import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split('.').pop()
    cb(null, `${crypto.randomUUID()}.${fileExtension}`)
  },
})

export const uploadFile = multer({ storage }).single('file')
export const getFile = multer({ storage: multer.memoryStorage() }).single(
  'file',
)
