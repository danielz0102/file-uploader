function checkFile(req, res, next) {
  const { size } = req.file

  if (size > 50 * 1024 * 1024) {
    return res.status(400).render('error', {
      error: 'File too large',
      message: 'The file must be smaller than 50MB.',
    })
  }

  next()
}

export const FileValidator = {
  checkFile,
}
