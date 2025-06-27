import { FolderModel } from '#models/FolderModel.js'

async function createParent(req, res) {
  const { name } = req.body

  await FolderModel.create({ name, userId: req.user.id, parentId: null })
  res.redirect('/')
}

export const FoldersController = {
  createParent,
}
