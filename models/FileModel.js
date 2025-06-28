import { FileStorage } from '../FileStorage.js'
import { db } from '#db'
import { generateFilePath } from './lib/generateFilePath.js'

async function create({ userId, originalName, size, mimetype, buffer }) {
  const userExists = await db.user.findUnique({
    where: { id: userId },
  })

  if (!userExists) return false

  const { filename, path } = generateFilePath({ userId, originalName })
  const { error } = await FileStorage.uploadFile(path, buffer)

  if (error) {
    throw new Error('File upload failed', { cause: error })
  }

  const result = db.file.create({
    data: {
      filename,
      originalName,
      userId,
      size,
      mimetype,
    },
  })

  return result
}

const getFileItemsWithoutFolder = async (userId) =>
  await db.file.findMany({
    where: { userId, folderId: null },
    select: {
      id: true,
      originalName: true,
    },
    orderBy: { createdAt: 'desc' },
  })

const getInfo = async (id) =>
  await db.file.findUnique({
    where: { id },
    select: {
      id: true,
      filename: true,
      originalName: true,
      size: true,
      mimetype: true,
      createdAt: true,
    },
  })

const select = async (id, fields) =>
  await db.file.findUnique({
    where: { id },
    select: Object.fromEntries(fields.map((field) => [field, true])),
  })

async function deleteFile(id) {
  const file = await db.file.findUnique({
    where: { id },
    select: { filename: true, userId: true },
  })

  await db.file.delete({
    where: { id },
  })

  const path = `${file.userId}/${file.filename}`
  const { error } = await FileStorage.deleteFiles([path])

  if (error) {
    console.error('Error deleting file from storage:', error)
  }
}

export const FileModel = {
  create,
  getInfo,
  select,
  getFileItemsWithoutFolder,
  delete: deleteFile,
}
