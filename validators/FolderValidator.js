import { matchedData, validationResult } from 'express-validator'
import { checkFolderName } from './validations/checkFolderName.js'

const validateCreateForm = [
  checkFolderName,
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).render('error', {
        error: 'Validation failed',
        message: 'The form could not be validated properly. Please try again.',
      })
    }

    const { name } = matchedData(req)

    req.body = {
      name,
    }
    next()
  },
]

export const FolderValidator = {
  validateCreateForm,
}
