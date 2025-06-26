export function handle404(req, res) {
  return res.status(404).json({ error: 'Not Found' })
}
