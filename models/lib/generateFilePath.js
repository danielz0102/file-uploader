import crypto from 'node:crypto'

export function generateFilePath({ userId, originalName }) {
  const extension = originalName.split('.').pop()
  const filename = `${crypto.randomUUID()}.${extension}`
  const path = `${userId}/${filename}`

  return { filename, path }
}
