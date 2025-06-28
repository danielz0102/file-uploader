import fs from 'node:fs/promises'
import crypto from 'node:crypto'

import { db } from '#db'
import { FileStorage } from '../FileStorage.js'

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

async function getFolderNames(userId) {
  return await db.folder.findMany({
    where: { userId },
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
  const filenames = await db.file.findMany({
    where: { folderId: id },
    select: { filename: true },
  })

  await db.file.deleteMany({ where: { folderId: id } })
  await db.folder.delete({ where: { id } })

  await Promise.all(
    filenames.map(({ filename }) => fs.unlink(`uploads/${filename}`)),
  )
}

async function addFile(
  folderId,
  userId,
  { originalName, size, mimetype, buffer },
) {
  const extension = originalName.split('.').pop()
  const filename = `${crypto.randomUUID()}.${extension}`
  const path = `${userId}/${filename}`

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
          userId,
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
  getFolderNames,
  update,
  delete: deleteFolder,
  addFile,
}
