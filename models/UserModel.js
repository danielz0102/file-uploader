import { db } from '#db'
import bcrypt from 'bcryptjs'

async function create({ username, password }) {
  const exists = await db.user.findUnique({
    where: { username },
  })

  if (exists) return false

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await db.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  })

  return {
    id: user.id,
    username: user.username,
  }
}

export const UserModel = {
  create,
}
