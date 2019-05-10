import 'whatwg-fetch'
import qs from 'qs'
import { isSuccess } from 'utils/tools'
import env from 'env'

const HTTP_ERROR = {
  '400': '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  '401': '用户没有权限（令牌、用户名、密码错误）。',
  '403': '用户得到授权，但是访问是被禁止的。',
  '404': '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  '406': '请求的格式不可得。',
  '410': '请求的资源被永久删除，且不会再得到的。',
  '422': '当创建一个对象时，发生一个验证错误。',
  '500': '服务器发生错误，请检查服务器。',
  '502': '网关错误。',
  '503': '服务不可用，服务器暂时过载或维护。',
  '504': '网关超时。',
}

// eslint-disable-next-line
function resolveParams(url, params) {
  const reg = /\/:(\w+)/
  let match = reg.exec(url)
  while (match && match[1]) {
    const param = params[match[1]]
    if (typeof param === 'string') {
      // eslint-disable-next-line
      url = url.replace(match[0], `/${param}`)
      // eslint-disable-next-line
      delete params[match[1]]
    }

    match = reg.exec(url)
  }

  return { url, body: params }
}

function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300 && response.ok) {
    return response
  }

  if (response.status === 401) {
    // TODO 登录过期需要跳转登录
  }

  const message = HTTP_ERROR[response.status] || response.statusText
  const error = new Error(message)
  error.response = response
  // eslint-disable-next-line
  console.error(message)
  throw error
}

function checkSuccess(response) {
  if (isSuccess(response)) {
    return response
  }

  const error = new Error(response.message)
  error.response = response
  // eslint-disable-next-line
  console.error(response.message)
  throw error
}

function throwError(e) {
  if (e.response) throw e

  const error = new Error('网络异常，请检查网络情况!')
  // eslint-disable-next-line
  console.error(e)
  throw error
}

function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
    headers: {
      // TODO 获取服务器token
      // Authorization: `Bearer ${getToken()}`,
    },
  }
  const newOptions = { ...defaultOptions, ...options }

  newOptions.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    ...newOptions.headers,
  }
  newOptions.body = JSON.stringify(newOptions.body)

  let host = url
  if (!/^http/.test(host)) {
    host = `${env.SERVER}${host}`
  }
  return fetch(host, newOptions)
    .then(checkHttpStatus)
    .then(response => {
      return response.json()
    })
    .then(checkSuccess)
    .catch(throwError)
}

export function get(url, params = {}, options = {}) {
  const result = resolveParams(url, params)
  return request(`${result.url}?${qs.stringify(result.body)}`, {
    ...options,
    method: 'GET',
  })
}

export function post(url, params = {}, options = {}) {
  const result = resolveParams(url, params)
  return request(result.url, {
    ...options,
    method: 'POST',
    body: result.body,
  })
}
