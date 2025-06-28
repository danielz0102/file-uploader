import fs from 'node:fs/promises'
import crypto from 'node:crypto'

import { FileStorage } from '../FileStorage.js'
import { db } from '#db'

async function create({ userId, originalName, size, mimetype, buffer }) {
  const userExists = await db.user.findUnique({
    where: { id: userId },
  })

  if (!userExists) return false

  const extension = originalName.split('.').pop()
  const filename = `${crypto.randomUUID()}.${extension}`
  const path = `${userId}/${filename}`
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
  select,
  getFileItemsWithoutFolder,
  delete: deleteFile,
}
