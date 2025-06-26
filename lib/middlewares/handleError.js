/* eslint-disable no-unused-vars */
export function handleError(err, req, res, next) {
  console.error(err)
  return res.status(500).json({ error: 'An unexpected error occurred' })
}
