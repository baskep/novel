# 简介

> 此项目是一个使用vue全家桶实现的在线看小说的webapp，算我自己学习vue的一个小产物

## 主要运用的技术
> 使用vue完成的页面的渲染，使用webpack完成模块的加载或打包，CSS预处理器则是用的SCSS，请求的数据主要由`追书神器`提供的第三方api，使用axios代替vue-resource完成请求的发送，涉及到的跨域问题目前使用的是第三方代理所提供的接口`JsonBird` 

##  部分效果图
   1.精选 <br>
   ![image](https://github.com/zt14362/noval/blob/master/examples/Featured.png) <br>
   
   2.分类 <br>
   ![image](https://github.com/zt14362/noval/blob/master/examples/Cat.png) <br>
   
   3.排行 <br>
   ![image](https://github.com/zt14362/noval/blob/master/examples/Rank.png) <br>

## 项目运行

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

## 其它
> 目前算大致完成了这个小项目，以后再找时间修改一些细节，如组件的高复用以及对各种终端设备的适配。
