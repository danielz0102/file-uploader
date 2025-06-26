import { matchedData, validationResult } from 'express-validator'
import { checkSignUpForm } from './validations/checkSignUpForm.js'

const validateSignUp = [
  checkSignUpForm,
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render('sign-up', { errors: errors.array().map((err) => err.msg) })
    }

    const { username, password } = matchedData(req)

    req.body = {
      username,
      password,
    }
    next()
  },
]

export default {
  validateSignUp,
}
