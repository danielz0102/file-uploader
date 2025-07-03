export function handle404(req, res) {
  console.error(`404 Not Found: ${req.method} ${req.originalUrl}`)

  return res.status(404).render('error', {
    error: 'Page not found',
    message: 'The page you are looking for does not exist.',
  })
}
