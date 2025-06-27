import { checkSchema } from 'express-validator'

export const checkFolderName = checkSchema(
  {
    name: {
      trim: true,
      notEmpty: {
        errorMessage: 'Folder name is required',
      },
      isString: true,
    },
  },
  ['body'],
)
