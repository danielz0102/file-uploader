import { FileModel } from '#models/FileModel.js'
import { FolderModel } from '#models/FolderModel.js'

async function renderHome(req, res) {
  if (!req.isAuthenticated()) {
    return res.render('home')
  }

  const files = await FileModel.getFileItemsWithoutFolder(req.user.id)
  const fileItems = files.map((file) => ({
    id: file.id,
    name: file.originalName,
  }))
  const folders = await FolderModel.getFolderNames(req.user.id)

  res.render('home', { files: fileItems, folders })
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
