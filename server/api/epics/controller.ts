import { defineController } from './$relay'
import { createEpic, getEpics } from '$/service/epics'
import { Epic } from '$/types'

export default defineController(() => ({
  get: async () => ({ status: 200, body: await getEpics() }),
  post: async ({ body }) => {
    return {
      status: 200,
      body: await createEpic(body.title)
    }
  }
}))
