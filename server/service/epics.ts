import { depend } from 'velona'
import { PrismaClient } from '@prisma/client'
import type { Epic, Prisma } from '$prisma/client'

const prisma = new PrismaClient()

export const getEpics = () => {
  return prisma.epic.findMany()
}
export const createEpic = (title: Epic['title']) =>
  prisma.epic.create({ data: { title } })
