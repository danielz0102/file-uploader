import { db } from '#db'
import { FileStorage } from './lib/FileStorage.js'
import { generateFilePath } from './lib/generateFilePath.js'

async function create({ name, userId, parentId }) {
  return await db.folder.create({ data: { name, userId, parentId } })
}

async function get(id) {
  return await db.folder.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      children: {
        select: {
          id: true,
          name: true,
        },
      },
      files: {
        select: {
          id: true,
          originalName: true,
        },
      },
    },
  })
}

async function getParentFoldersNames(userId) {
  return await db.folder.findMany({
    where: { userId, parentId: null },
    select: {
      id: true,
      name: true,
    },
  })
}

async function update({ id, name, parentId }) {
  const exists = await db.folder.findUnique({ where: { id } })

  if (!exists) return false

  return await db.folder.update({
    where: { id },
    data: { name, parentId },
  })
}

async function deleteFolder(id) {
  const files = await db.file.findMany({
    where: { folderId: id },
    select: { filename: true, userId: true },
  })

  await db.file.deleteMany({ where: { folderId: id } })
  await db.folder.delete({ where: { id } })

  const paths = files.map((file) => `${file.userId}/${file.filename}`)
  const { error } = await FileStorage.deleteFiles(paths)

  if (error) {
    console.error('Error deleting files from storage:', error)
  }
}

async function addFile(folderId, { originalName, size, mimetype, buffer }) {
  const folder = await db.folder.findUnique({
    where: { id: folderId },
    select: { userId: true },
  })
  const { filename, path } = generateFilePath({
    userId: folder.userId,
    originalName,
  })
  const { error } = await FileStorage.uploadFile(path, buffer)

  if (error) {
    throw new Error('File upload failed', { cause: error })
  }

  return await db.folder.update({
    where: { id: folderId },
    data: {
      files: {
        create: {
          filename,
          originalName,
          userId: folder.userId,
          size,
          mimetype,
        },
      },
    },
  })
}

export const FolderModel = {
  create,
  get,
  getParentFoldersNames,
  update,
  delete: deleteFolder,
  addFile,
}
