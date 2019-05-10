export const noop = () => {}

export const isArray = arr => arr instanceof Array

export const isObject = obj =>
  obj !== null && typeof obj === 'object' && !isArray(obj)

export const isBoolean = bool => typeof bool === 'boolean'

export const isFunction = func => typeof func === 'function'

export const isString = str => typeof str === 'string'

export const isUndefined = undef => typeof undef === 'undefined'

export const assert = (validate, message) => {
  if (
    (isBoolean(validate) && !validate) ||
    (isFunction(validate) && !validate())
  ) {
    throw new Error(message)
  }
}

function createIsDom() {
  return typeof HTMLElement === 'object'
    ? element => element instanceof HTMLElement
    : element =>
        element &&
        typeof element === 'object' &&
        element.nodeType === 1 &&
        typeof element.nodeName === 'string'
}

export const isDom = createIsDom()

export function isSupportProxy() {
  return typeof Proxy === 'function'
}
