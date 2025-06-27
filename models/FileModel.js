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

export const FileModel = {
  create,
  getFileItemsWithoutFolder,
}
