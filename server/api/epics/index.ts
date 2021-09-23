import { Prisma } from '@prisma/client'
import { Epic, StoryPoint, EpicWithStoryPoint } from '$/types'
import { CloseEpicRequest, UpdateEpicContentRequest } from '$/validators'

export type Methods = {
  get: {
    query?: {
      limit: number
    }
    // resBody: Epic[]
    resBody: EpicWithStoryPoint[]
  }
  post: {
    reqBody: Pick<Epic, 'title'>
    resBody: Epic
  }
  delete: {
    // reqBody: Pick<Epic, 'id'>
    reqBody: any
    // resBody: Epic
    resBody: any
  }
  patch: {
    reqBody: CloseEpicRequest | UpdateEpicContentRequest
    resBody: Epic
  }
}
