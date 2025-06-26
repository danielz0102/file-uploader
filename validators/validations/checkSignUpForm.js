import { checkSchema } from 'express-validator'

export const checkSignUpForm = checkSchema(
  {
    username: {
      trim: true,
      notEmpty: {
        errorMessage: 'Username is required',
      },
      isString: true,
    },
    password: {
      trim: true,
      notEmpty: {
        errorMessage: 'Password is required',
      },
      isStrongPassword: {
        errorMessage:
          'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      },
    },
    ['confirm-password']: {
      trim: true,
      notEmpty: {
        errorMessage: 'Confirm Password is required',
      },
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Confirm Password does not match Password')
          }
          return true
        },
      },
    },
  },
  ['body'],
)
