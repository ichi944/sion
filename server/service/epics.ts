import { depend } from 'velona'
import { PrismaClient, Prisma } from '@prisma/client'
import type { Epic } from '$prisma/client'

const prisma = new PrismaClient()
const epicWithStoryPoint = Prisma.validator<Prisma.EpicArgs>()({
  include: { storyPoint: true }
})
export const getEpics = () => {
  return prisma.epic.findMany({
    where: {
      closed: false
    },
    include: {
      storyPoint: true
    }
  })
}
export const createEpic = (title: Epic['title']) =>
  prisma.epic.create({ data: { title } })
export const closeEpic = (id: Epic['id']) =>
  prisma.epic.update({
    where: { id },
    data: { closed: true }
  })
export const updateEpic = (query: Pick<Epic, 'id' | 'title' | 'description'>) =>
  prisma.epic.update({
    where: { id: query.id },
    data: { title: query.title, description: query.description }
  })
export const deleteEpic = (id: Epic['id']) =>
  prisma.epic.delete({ where: { id } })
