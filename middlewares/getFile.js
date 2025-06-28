import multer from 'multer'

export const getFile = multer({ storage: multer.memoryStorage() }).single(
  'file',
)
