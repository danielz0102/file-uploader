import { FileModel } from '#models/FileModel.js'

async function renderHome(req, res) {
  const files = await FileModel.getFileItemsWithoutFolder(req.user.id)
  const fileItems = files.map((file) => ({
    id: file.id,
    name: file.originalName,
  }))

  res.render('home', { files: fileItems })
}

function renderLogin(req, res) {
  res.render('login')
}

function renderSignUp(req, res) {
  res.render('sign-up')
}

export const RootController = {
  renderHome,
  renderLogin,
  renderSignUp,
}
