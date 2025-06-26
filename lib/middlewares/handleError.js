/* eslint-disable no-unused-vars */
export function handleError(err, req, res, next) {
  console.error(err)
  return res
    .status(500)
    .render('error', {
      error: 'Internal Server Error',
      message: 'An unexpected error occurred.',
    })
}
