import { PrismaClient } from '@prisma/client'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'

export const db = new PrismaClient()
export const sessionStore = new PrismaSessionStore(db, {
  checkPeriod: 1000 * 60 * 2,
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
})
