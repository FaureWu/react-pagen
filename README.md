# React h5活动单页开发

## 如何启动开发环境

```bash
yarn start
```

该命令会再文件改动时自动重新编译pages目录下的所有页面，如果有新增文件，需要重启命令，没有支持热加载，修改后需要手动刷新浏览器可看见修改

假如随着时间推移，项目中页面越来越多，这将会导致编译调试时间越来越长，我们可以选择性启动部分页面，通过如下命令

```bash
yarn start MATCH=group
```

该命令仅会运行匹配的目录，MATCH支持正则表达式

## 如何与服务器联调
首先在src/env.js中配置dev环境下的服务器地址

```bash
yarn dev
```

该命令同样支持MATCH表达式

## 如何打包

```bash
yarn build
```

> 生成dist文件，包含所有页面的编译结果

## 如何开发一个新的页面

> 本项目支持hd方案，设计稿以`iphone6s`为准，自动转换`px`为`rem`，`1rem = 100px`, 如果不需要转换的请以`PX`为单位

在pages文件夹中新增目录，目录结构如下
* `index.js` 该页面的入口文件
* `index.html` 该页面的入口文档 // 此文件可以缺省，默认使用src/index.html

> pages目录下诺存在index.js，则该目录将会被认为是一个页面，支持分组，支持嵌套

```js
// index.js 模版
import Gen from 'generator'
import Lower from 'layouts/lower/Lower'
import { Toast } from 'antd-mobile'
import Buyer from './Buyer'

Gen() // 创建生成器
  .layout(Lower) // 可选，注册layout，默认为div包裹
  .component(Buyer) // 必须，注册页面组件
  .model([]) // 可选，注册该页面所需model
  .error(error => { // 可选，捕获model中抛出的异常信息
    if (error.message) {
      Toast.info(error.message, 2)
    }
  })
  .start(document.getElementById('root')) // 获取文档入口

```

## 如何添加数据mock

仅需要在mock目录下添加文件即可，会自动引入，详细使用方式参考mock目录及[express 文档](http://www.expressjs.com.cn/)

支持如下几种简化模式
```js
module.exports = {
  'POST /demo/api1': {
    code: 'success',
    message: '',
    data: 'demo',
  },
  'POST /demo/api2': () => ({
    code: 'success',
    message: '',
  }),
  'POST /demo/api3': (req, res) => {
    res.status(200).json({
      code: 'success',
      message: '',
    })
  }
}
```

## 如何编写model

```js
export default {
  namespace: 'demo',
  effects: {
    async getInfo(params) {
      const { data = } = await post('/demo/api1', params)
      return data
    },
  },
}
```

编写完成后在需要使用的页面index.js文件中引入即可

## 如何触发model方法

```js
import { dispatcher } from 'generator'

dispatcher.demo.getInfo({})
  .then(...)
  .catch(...)
  .finally(...)
```
