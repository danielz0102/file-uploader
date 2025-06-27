import { FolderModel } from '#models/FolderModel.js'

async function createParent(req, res) {
  const { name } = req.body

  await FolderModel.create({ name, userId: req.user.id, parentId: null })
  res.redirect('/')
}

async function renderFolder(req, res) {
  const { id } = req.params
  const folder = await FolderModel.get(id)
  res.render('folder', { folder })
}

export const FoldersController = {
  createParent,
  renderFolder,
}
