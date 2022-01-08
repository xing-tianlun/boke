---
title: vuex
date: 2022-01-08
tags:
 - vue
categories: 
 - vue
---

## vuex

### state

##### 定义 state 

##### 获取 state 

1. this.$store.state.变量名

2. 辅助函数 引入 mapState  

   1. ```js
      import {mapState} from 'vuex'
      computed: {
        ...mapState(["变量名"])
        
        ...mapState({
          key: "变量名",
          id: () => state.moduleA.id,
        })
      }
      ```

   2. 

### getters

##### 获取 getter

在 computed 中获取

this.$store.getters.名字

```js
// 方法一：分别导入
...mapGetters("getId") // 全局getters
...mapGetters('moduleA',["getId"]) // 模块中 getters
// 方法二：使用对象一起导入
...mapGetters({ 
  getId: "getId",
  moduleGetId: "moduleA/getId"
})
```



### mutations

##### 获取 mutations

在 methods 中获取

与 getters 方式一样

##### 使用 mutations

this.$store.commit("方法名", 参数)

this.方法名()



### actions

##### 获取 actions

在 methods 中获取

与 getters 方式一样

##### 使用 actions

this.$store.dispatch("方法名", 参数)

this.方法名()



### module

##### 定义模块

创建一个 js 文件，export default 模块

在 store/index.js 中引入这个文件

挂载到 modules上

```js
import moduleA from './module/moduleA'
import moduleB from './module/moduleB'
const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
```





##### 获取 module 中的 state

this.$store.state.模块名.字段

##### 使用模块中的 mutations

this.$store.commit("模块名/方法名",参数)

##### 使用模块中的 actions

this.$store.dispatch("模块名/方法名",参数) 

##### 使用模块中的 getters

this.$store.getters["模块名/方法名"]



```js
...mapState(["list"]) // 全局数据
...mapState("moduleA",["id"]) // 模块中数据
...mapState({
	list: 'list', // 全局数据
	id: () => state.moduleA.id, // 模块中数据
})

// 方法一：分别导入
...mapGetters("getId") // 全局getters
...mapGetters('moduleA',["getId"]) // 模块中 getters
// 方法二：使用对象一起导入
...mapGetters({ 
  getId: "getId",
  moduleGetId: "moduleA/getId"
})

...mapMutations 和 ...mapActions 也是上面的方法使用
```



