import 'normalize.css'
import React from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader'
import 'pages/global.less'
import { assert, isDom } from './utils'
import Layout from './Layout'

let LayoutComponent = Layout
let PageComponent

function Generator() {

}

Generator.prototype.layout = function(LayoutCom) {
  LayoutComponent = hot(module)(LayoutCom)
  return this
}

Generator.prototype.component = function(PageCom) {
  PageComponent = hot(module)(PageCom)
  return this
}

Generator.prototype.start = function(element) {
  assert(isDom(element), 'we need a dom element for render')
  assert(!!PageComponent, 'we need a PageComponent for render, you should call by gen.page(PageCom)')

  render(
    <LayoutComponent>
      <PageComponent />
    </LayoutComponent>,
    element,
  )
}

export default () => new Generator()
