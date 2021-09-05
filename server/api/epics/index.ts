import { Prisma } from '@prisma/client'
import { Epic, StoryPoint } from '$/types'

export type Methods = {
  get: {
    query?: {
      limit: number
    }
    // resBody: Epic[]
    resBody: (Epic & { storyPoint: StoryPoint | null })[]
  }
  post: {
    reqBody: Pick<Epic, 'title'>
    // reqBody: any
    resBody: Epic
    // resBody: any
  }
  delete: {
    // reqBody: Pick<Epic, 'id'>
    reqBody: any
    // resBody: Epic
    resBody: any
  }
}
