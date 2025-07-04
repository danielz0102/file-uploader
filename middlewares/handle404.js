export function handle404(req, res) {
  res.status(404).render('error', {
    error: 'Page not found',
    message: 'The page you are looking for does not exist.',
  })
}
