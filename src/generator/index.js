import 'normalize.css'
import React from 'react'
import { render } from 'react-dom'
import fastclick from 'react-fastclick'
import 'pages/global.less'
import './pollyfill'
import {
  assert,
  isDom,
  isObject,
  noop,
  isString,
  isArray,
  isUndefined,
  isFunction,
  isSupportProxy,
} from './utils'
import Layout from './Layout'

let LayoutComponent = Layout
let PageComponent
let _models = {}
let _errorHandler = noop

let dispatcher = {}

function createModelHandler(effects) {
  return Object.keys(effects).reduce((result, key) => {
    const effect = effects[key]
    result[key] = async function(...rest) {
      try {
        const data = await effect(...rest)
        return Promise.resolve(data)
      } catch (e) {
        _errorHandler(e)
        return Promise.reject(e)
      }
    }
    return result
  }, {})
}

function defineDispatcher(namespace) {
  Object.defineProperty(dispatcher, namespace, {
    get() {
      return createModelHandler(_models[namespace])
    },
    set() {
      assert(false, 'Cannot set the dispatcher')
    },
  })
}

if (isSupportProxy()) {
  dispatcher = new Proxy(
    {},
    {
      get(target, key) {
        return createModelHandler(_models[key])
      },
      set() {
        assert(false, 'Cannot set the dispatcher')
      },
    },
  )
}

function setModel(model) {
  assert(isString(model.namespace), 'model defined need a namespace')
  assert(
    isUndefined(_models[model.namespace]),
    `model namespace ${model.namespace} must be unique`,
  )
  assert(isObject(model.effects), 'model effects must be an Object')
  _models[model.namespace] = model.effects
  if (!isSupportProxy()) {
    defineDispatcher(model.namespace)
  }
}

function Generator() {}

Generator.prototype.layout = function(LayoutCom) {
  LayoutComponent = LayoutCom
  return this
}

Generator.prototype.component = function(PageCom) {
  PageComponent = PageCom
  return this
}

Generator.prototype.model = function(models) {
  if (isObject(models)) {
    setModel(models)
  } else if (isArray(models)) {
    models.forEach(setModel)
  }
  return this
}

Generator.prototype.error = function(handler) {
  assert(isFunction(handler), 'error handler must be an Function')
  _errorHandler = handler
  return this
}

Generator.prototype.start = function(element) {
  assert(isDom(element), 'we need a dom element for render')
  assert(
    !!PageComponent,
    'we need a PageComponent for render, you should call by gen.page(PageCom)',
  )

  render(
    <LayoutComponent>
      <PageComponent />
    </LayoutComponent>,
    element,
  )
}

fastclick()

export { dispatcher }

export default () => new Generator()
