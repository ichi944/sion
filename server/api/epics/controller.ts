import { defineController } from './$relay'
import {
  createEpic,
  deleteEpic,
  closeEpic,
  getEpics,
  updateEpic
} from '$/service/epics'
import { Epic } from '$/types'

export default defineController(() => ({
  get: async () => ({ status: 200, body: await getEpics() }),
  post: async ({ body }) => {
    return {
      status: 200,
      body: await createEpic(body.title)
    }
  },
  delete: async ({ body }) => {
    return {
      status: 200,
      body: await deleteEpic(body.id)
    }
  },
  patch: async ({ body }) => {
    switch (body.type) {
      case 'close': {
        return {
          status: 200,
          body: await closeEpic(body.id)
        }
      }
      case 'update': {
        return {
          status: 200,
          body: await updateEpic({
            id: body.id,
            title: body.title || '',
            description: body.description || ''
          })
        }
      }
    }
  }
}))
