export function setUsers(req, res, next) {
  res.locals.user = req.user
  next()
}
