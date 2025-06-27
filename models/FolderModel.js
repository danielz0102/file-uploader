import { db } from '#db'

async function create({ name, userId, parentId }) {
  return await db.folder.create({ data: { name, userId, parentId } })
}

async function get(userId) {
  return await db.folder.findMany({
    where: { userId },
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
  return await db.folder.delete({ where: { id } })
}

export const FolderModel = {
  create,
  get,
  getFolderNames,
  update,
  delete: deleteFolder,
}
