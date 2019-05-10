export function noop() {}

export function isIos() {
  return window.navigator.appVersion.match(/(iphone|ipad|ipod)/gi)
}

export function isWechat() {
  return /MicroMessenger/i.test(window.navigator.userAgent)
}

export function isSuccess(data) {
  if (typeof data !== 'object') return false

  return (
    `${data.code}`.toUpperCase() === 'SUCCESS' ||
    data.code === '200' ||
    data.stat === 'ok'
  )
}

export function throttle(handler, time) {
  let can = true
  return function fn(...params) {
    if (can) {
      can = false
      handler(...params)
      setTimeout(() => {
        can = true
      }, time)
    }
  }
}
