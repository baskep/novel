# 简介

> 此项目是一个使用vue全家桶实现的在线看小说的webapp，算我自己学习vue的一个小产物

## 主要运用的技术
> 使用vue完成的页面的渲染，使用webpack完成模块的加载或打包，CSS预处理器则是用的SCSS，请求的数据主要由`追书神器`提供的第三方api，使用axios代替vue-resource完成请求的发送，涉及到的跨域问题目前使用的是第三方代理所提供的接口`https://bird.ioliu.cn/v1/` 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
