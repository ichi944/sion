import { Prisma } from '@prisma/client'
import { Epic } from '$/types'
import { getEpics } from '$/service/epics'

type EpicsWithStoryPoint = Prisma.PromiseReturnType<typeof getEpics>
export type Methods = {
  get: {
    query?: {
      limit: number
    }
    resBody: Epic[]
  }
  post: {
    reqBody: Pick<Epic, 'title'>
    resBody: Epic
  }
  delete: {
    reqBody: Pick<Epic, 'id'>
    resBody: Epic
  }
}
