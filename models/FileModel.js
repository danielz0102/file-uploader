import { db } from '#db'

export async function create({
  filename,
  originalName,
  userId,
  size,
  mimetype,
}) {
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

export default {
  create,
}
