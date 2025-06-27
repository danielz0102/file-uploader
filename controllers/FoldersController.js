import { FolderModel } from '#models/FolderModel.js'

async function createParent(req, res) {
  const { name } = req.body

  await FolderModel.create({ name, userId: req.user.id, parentId: null })
  res.redirect('/')
}

async function renderFolder(req, res) {
  const { id } = req.params
  const folder = await FolderModel.get(id)

  res.render('folder', {
    folder: {
      id: folder.id,
      name: folder.name,
    },
    files: folder.files.map((file) => ({
      id: file.id,
      name: file.originalName,
    })),
    children: folder.children.map((child) => ({
      id: child.id,
      name: child.name,
    })),
  })
}

async function addFile(req, res) {
  const { id } = req.params
  const { filename, originalname, size, mimetype } = req.file

  await FolderModel.addFile(id, {
    filename,
    originalName: originalname,
    userId: req.user.id,
    size,
    mimetype,
  })

  res.redirect(`/folder/${id}`)
}

async function addChild(req, res) {
  const { id } = req.params
  const { name } = req.body

  await FolderModel.create({ name, userId: req.user.id, parentId: id })

  res.redirect(`/folder/${id}`)
}

async function deleteFolder(req, res) {
  const { id } = req.params

  await FolderModel.delete(id)

  res.redirect('/')
}

export const FoldersController = {
  createParent,
  renderFolder,
  addFile,
  addChild,
  delete: deleteFolder,
}
