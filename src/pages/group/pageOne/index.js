import Gen from 'generator'
import Basic from 'layouts/basic/Basic'
import PageOne from './PageOne'

Gen()
  .layout(Basic)
  .component(PageOne)
  .start(document.getElementById('root'))
