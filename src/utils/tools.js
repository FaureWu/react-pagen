export const isEmptyObject = (object = {}) => Object.keys(object).length <= 0

export const noop = () => {}

export const isIos = () =>
  window.navigator.appVersion.match(/(iphone|ipad|ipod)/gi)

export const isWechat = () => /MicroMessenger/i.test(window.navigator.userAgent)
