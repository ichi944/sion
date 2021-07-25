import { Epic } from '$/types'
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
}
