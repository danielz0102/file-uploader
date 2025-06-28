import fs from 'node:fs/promises'
import { db } from '#db'

async function create({ filename, originalName, userId, size, mimetype }) {
  const userExists = await db.user.findUnique({
    where: { id: userId },
  })

  if (!userExists) return false

  return db.file.create({
    data: {
      filename,
      originalName,
      userId,
      size,
      mimetype,
    },
  })
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

async function deleteFile(id) {
  const filename = await db.file.findUnique({
    where: { id },
    select: { filename: true },
  })

  await db.file.delete({
    where: { id },
  })

  fs.unlink(`./uploads/${filename.filename}`).catch((err) => {
    console.error('Error deleting file:', err)
  })
}

export const FileModel = {
  create,
  getInfo,
  getFileItemsWithoutFolder,
  delete: deleteFile,
}
