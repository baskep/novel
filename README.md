# 简介

> 此项目是一个使用vue全家桶实现的在线看小说的webapp，算我自己学习vue的一个小产物

## 主要运用的技术
> 使用vue完成的页面的渲染，使用webpack完成模块的加载或打包，CSS预处理器则是用的SCSS，请求的数据主要由`追书神器`提供的第三方api，使用axios代替vue-resource完成请求的发送，涉及到的跨域问题目前使用的是第三方代理所提供的接口`https://bird.ioliu.cn/v1/` 

##  部分效果图
   1.书架 <br>
   ![image](https://github.com/zt14362/noval/blob/master/examples/Bookself.png) <br>
   
   2.精选 <br>
   ![image](https://github.com/zt14362/noval/blob/master/examples/Featured.png) <br>
   
   3.分类 <br>
   ![image](https://github.com/zt14362/noval/blob/master/examples/Cat.png) <br>
   
   4.排行 <br>
   ![image](https://github.com/zt14362/noval/blob/master/examples/Rank.png) <br>
   
## 目前还存在的问题
> 1.样式、组件的复用、方法的封装、动态效果还有很多需要完善或修改的地方 <br>
> 2.部分功能还未实现 <br>
> 3.未对各种移动终端进行适配 <br>
> 4.后期想用vuex重构，目前暂未使用 <br>

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
