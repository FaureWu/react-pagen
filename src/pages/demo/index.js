import Gen from 'generator'
import Basic from 'layouts/basic/Basic'
import demo from 'models/demo'
import { Toast } from 'antd-mobile'
import Demo from './Demo'

Gen()
  .layout(Basic)
  .component(Demo)
  .model([demo])
  .error(error => {
    // 此处会捕获model中抛出的所有错误
    if (error.message) {
      Toast.info(error.message, 2)
    }
  })
  .start(document.getElementById('root'))
