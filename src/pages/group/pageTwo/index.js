import Gen from 'generator'
import Basic from 'layouts/basic/Basic'
import PageTwo from './PageTwo'

Gen()
  .layout(Basic)
  .component(PageTwo)
  .start(document.getElementById('root'))
