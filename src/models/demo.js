import { get } from 'utils/fetch'

export default {
  namespace: 'demo',

  effects: {
    async getInfo() {
      const { data = {} } = await get('/demo/info')

      return data
    },
  },
}
