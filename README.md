# React h5活动单页开发

## 如何启动开发环境

```bash
yarn start
```

> 该命令会再文件改动时自动重新编译pages目录下的所有页面，如果有新增文件，需要重启命令，没有支持热加载，修改后需要手动刷新浏览器可看见修改

## 如何打包

```bash
yarn build
```

> 生成dist文件，包含所有页面的编译结果

## 如何开发一个新的页面

> 本项目支持hd方案，设计稿以`iphone6s`为准，自动转换`px`为`rem`，`1rem = 100px`, 如果不需要转换的请以`PX`为单位

在pages文件夹中新增目录，目录结构如下
* `index.js` 该页面的入口文件
* `index.html` 该页面的入口文档

```js
// index.js 模版
import Gen from 'generator'
import Lower from 'layouts/lower/Lower'
import Buyer from './Buyer'

Gen() // 创建生成器
  .layout(Lower) // 可选，注册layout，默认为div包裹
  .component(Buyer) // 必须，注册页面组件
  .start(document.getElementById('root')) // 获取文档入口

```

```html
<!-- index.html 模版 -->
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
    <title>消息中心</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```
