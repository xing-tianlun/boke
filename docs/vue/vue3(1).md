---
title: vue3
date: 2022-2-24
tags:
 - vue3
categories: 
 - vue3
---

#### 1. ref 的使用获取节点

- 在 vue2 中

```vue
<template>
	<div>
    <ul>
      <li v-for="i,k in list" :key="k" ref="todos"></li>
  	</ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {id: 1, name: "狗蛋"},
        {id: 2, name: "张三"},
      ]
    }
  },
  methods: {
    getref() {
      console.log(this.$refs.todos)
    }
  }
}
</script>
```

- 在 vue3 中

```vue
<template>
	<div>
    <ul>
      <li v-for="i,k in list" :key="k" :ref="todos"></li>
  	</ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {id: 1, name: "狗蛋"},
        {id: 2, name: "张三"},
      ],
      reftodo: [],
    }
  },
  methods: {
    // 需要创建和 ref 同名的方法，该函数会自动调用，将获取到的节点依次传入该函数中
    todos(el) {
      if(el) {
        this.reftodo.push(el)
      }
    },
    getref() {
      console.log(this.reftodo) // 获取到的是一个 proxy 对象
    }
  }
}
</script>
```



#### 2. $children 被删除

vue3 建议使用 ref=""   this.$refs.组件ref名，来获取组件中的相关数据



#### 3. 插槽

```vue
//在 vue2 中 
< template slot="temp1" solt-scope="scope">
	<h3>{{scope.data}}</h3>
</template>
< template v-slot:temp1="scope">
	<h3>{{scope.data}}</h3>
</template>
// 以上插槽的两种方式可以混用
// v-slot 是在 vue2.6 版本后出现的

// 在 vue3 中删除 slot="temp1" solt-scope="scope" 这种方式了
// 在 vue3 中 v-slot 可以简写为 "#"
```



#### 4. 响应式系统

##### vue2中

```vue
// 在 vue2 中响应式是通过 Object.defineProperty,把这些 property 全部转为 getter/setter。
// 当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，
// Vue 将遍历此对象所有的 property，并使用 Object.defineProperty 
// 把这些 property 全部转为 getter/setter。

// 检测变化的注意事项
// 由于 JavaScript 的限制，Vue 不能检测数组和对象的变化。
// 尽管如此我们还是有一些办法来回避这些限制并保证它们的响应性。
```

##### 对于对象

Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 `data` 对象上存在才能让 Vue 将它转换为响应式的。例如：

```
var vm = new Vue({
  data:{
    a:1
  }
})

// `vm.a` 是响应式的

vm.b = 2
// `vm.b` 是非响应式的
```

对于已经创建的实例，Vue 不允许动态添加根级别的响应式 property。但是，可以使用 `Vue.set(object, propertyName, value)` 方法向嵌套对象添加响应式 property。例如，对于：

```
Vue.set(vm.someObject, 'b', 2)
```

您还可以使用 `vm.$set` 实例方法，这也是全局 `Vue.set` 方法的别名：

```
this.$set(this.someObject,'b',2)
```

有时你可能需要为已有对象赋值多个新 property，比如使用 `Object.assign()` 或 `_.extend()`。但是，这样添加到对象上的新 property 不会触发更新。在这种情况下，你应该用原对象与要混合进去的对象的 property 一起创建一个新的对象。

```
// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```

##### 对于数组

Vue 不能检测以下数组的变动：

1. 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

举个例子：

```
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

为了解决第一类问题，以下两种方式都可以实现和 `vm.items[indexOfItem] = newValue` 相同的效果，同时也将在响应式系统内触发状态更新：

```
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

你也可以使用 [`vm.$set`](https://cn.vuejs.org/v2/api/#vm-set) 实例方法，该方法是全局方法 `Vue.set` 的一个别名：

```
vm.$set(vm.items, indexOfItem, newValue)
```

为了解决第二类问题，你可以使用 `splice`：

```
vm.items.splice(newLength)
```



##### vue3

```vue
vue3 中响应式是通过  Proxy 来进行完成的。
Proxy 是一个对象，它包装了另一个对象，并允许你拦截对该对象的任何交互。
我们这样使用它：new Proxy(target, handler)
```



#### 5. Composition API

```vue
// 只能在 vue3 中使用
// 使用方法
<script>
import {ref, reactive, onMounted} from 'vue'; // 引入之后才能使用
export default {
	setup() {
    // 定义 ref 响应式数据
    const num = ref(1); // 定义数据
    // 定义 reactive 响应式数据
    const revData = reactive({
      name: "xtl",
      age: 24,
      hoaby: ["eat", "watch TV"]
    })
    function ageAdd() {
      revData.age++; // 可以直接更改数据
    }
    // 调用 setup 级别的生命周期
    onMounted(() =>{
      console.log('setup: onMounted')
		})
    // 返回数据后，可直接在模板中使用
    return {
      num,
      revData,
    }
  }
}
</script>
// ref(极少用) 和 reactive 中定义的数据都是响应式的
// setup 中是没有 this 的
```

composotion API 的好处：

- 更好的可编程性
- 更优的代码组织
- 更好的逻辑抽象能力（更好的对大型的组件进行拆分）
- 类似于函数式编程，把一块逻辑代码写在一起，有更好的编程的体验。

composition API 的核心优势：

- 更灵活的逻辑组织、抽象、复用能力
- 没有 this，没有烦恼，再也不用纠结 this 上到底有什么
- 更好的类型推导能力（TypeScript）
- 更友好的 Tree-shaking 支持（渐进式体验）
- 更大的代码压缩空间

composotion API 可以与 options API 共同使用

> <span style="color:#f4cd00">WARNING</span>
>
> 在 `setup` 中你应该避免使用 `this`，因为它不会找到组件实例。`setup` 的调用发生在 `data` property、`computed` property 或 `methods` 被解析之前，所以它们无法在 `setup` 中被获取。

#####  在 `setup` 内注册生命周期钩子

为了使组合式 API 的功能和选项式 API 一样完整，我们还需要一种在 `setup` 中注册生命周期钩子的方法。这要归功于 Vue 导出的几个新函数。组合式 API 上的生命周期钩子与选项式 API 的名称相同，但前缀为 `on`：即 `mounted` 看起来会像 `onMounted`。
这些函数接受一个回调，当钩子被组件调用时，该回调将被执行。







#### 项目升级

考虑方向：

- 项目量级及业务需求
- 团队能力
- 不兼容代码评估
- 第三方扩展插件评估
- 综合成本评估