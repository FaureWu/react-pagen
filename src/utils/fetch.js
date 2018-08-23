import 'whatwg-fetch'
import { server } from 'env'

const env = process.env.BUILD_ENV

export default function(url, options) {
  const defaultOptions = { credentials: 'include' }

  const newOptions = { ...defaultOptions, ...options }

  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      }
      newOptions.body = JSON.stringify(newOptions.body)
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      }
    }
  }

  return fetch(`${server[env]}${url}`, newOptions)
}
