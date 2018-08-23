import Gen from 'generator'
import Basic from 'layouts/basic/Basic'
import Demo from './Demo'

Gen()
  .layout(Basic)
  .component(Demo)
  .start(document.getElementById('root'))
