---
title: vue Router
date: 2022-01-08
tags:
 - vue
categories: 
 - vue
---



#### 路由全局守卫

##### (*router*.beforeEach(to,from,next))

```js
// 在全局定义这个函数
// 任何路径都会经过这个函数
全局前置守卫
router.beforeEach(to,from,next) {
  // console.log('------');
  // console.log(to); // 下一个路由配置项
  // console.log(from); // 之前的路由配置项
  // next() 是一个中间件函数，需要调用 next 函数 否则路由就会卡在这，不会跳转了
  if(to.name === 'xing') {
    if(router.options.routes[2].isToken) {
      next() // 有权限
    }
  }else {
    next()
  }
}
全局后置守卫
router.afterEach((to, from) => {
  // ...
})
```

#### 路由独享的守卫

```js
// 在路由配置项中添加 beforeEnter() {}
// 例如：
let routes = [{
  path: '/mess',
    isToken: false,
    component: Mess,
    name: "xing",
    beforeEnter(to,from,next) {
      console.log('--------------');
      // console.log(to);
      // console.log(from);
      console.log(router.options.routes);
      next()
    }
}]
// 只有在进入 /mess 路径时，会执行函数
```

#### 组件内的守卫

```js
beforeRouteEnter
beforeRouteUpdate
beforeRouteLeave
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```



总结：

进入路由时，路由钩子的执行顺序

beforeEach

beforeEnter

beforeRouteEnter

afterEach



离开路由时，路由钩子的执行顺序

先执行 beforeRouteLeave

beforeEach

afterEach



在 afterEach 之后，才会执行 组件的生命周期函数 created mounted 等等



组件钩子（进入组件）

先执行路由上的钩子

created  ==>  mounted

修改组件中的数据 执行 updated



离开组件时，

先执行新组件的 created

再执行之前组件的   beforeDestroy   destroyed

在执行新组建的 mounted





父子组件中生命周期钩子的执行顺序：（渲染时）

Father beforeCreate
Father ceated
Father beforeMount
Son beforeCreate
Son ceated
Son beforeMount
Son mounted
Father mounted



父子组件中生命周期钩子的执行顺序：（更新时）

Father beforeUpdate

Son beforeUpdate

Son updated

Father updated



父子组件中生命周期钩子的执行顺序：（销毁时）

Father beforeDestroy

Son beforeDestroy

Son destroyed

Father destroyed



