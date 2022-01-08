---
title: vue 笔记
date: 2022-01-08
tags:
 - vue
categories: 
 - vue
---

# Vue

## 1. vue 基础

### day 1

### 〇、基本概念：

```txt
SPA 单页面应用开发 只在第一次请求的时候请求首页的内容数据
MPA 多页面应用开发 传统的开发方式都是 MPA 模式
vue 是 js 编写的 MVVM 框架
MVVM (m modal) (v view) (vm 是一种数据和表现分离的手段)
MV 是表现和数据分离 是一种新的开发方式
```

网址：https://cn.vuejs.org/

源码地址：https://github.com/vuejs/vue

vue3源码地址：https://github.com/vuejs/vue-next

#### 下载

- cdn
- 源码
- npm

#### var vue = new Vue()

1. 

   ```txt
   1. options 参数选项
   el: 指定 vue 的作用范围（选择器选定的元素）
   data: 对象，绑定在 vue 实例上的数据， 值是一个对象
   2. view
   {{}} mustache 语法，用来在视图层渲染数据，直接使用 data 中的字段。
   mustache 语法,中可以写的数据。表达式，变量，三目运算，系统方法（数组，字符串的方法等）
   js语句不可以
   ```

   ![](D:\Desktop\2021-10 Vue\img\Snipaste_2021-10-18_14-12-34.png)

```txt
data 通过 vm 去显示 view 视图内容
view 也可以通过 vm 去修改 data 数据
```



#### v-bind 

属性的绑定，属性（标签属性）

```
使用v-bind: 绑定动态属性
<h3 v-bind:class="red">{{message}}</h3>
var app = new Vue({
  el: "#app",
  data: {
    message: "hello world",
    red: 'red'
  }
});
```

#### v-if

 条件渲染

```
// v-if v-else v-else-if
<h3 v-if="flag">{{message}}</h3>
var app = new Vue({
  el: "#app",
  data: {
    message: "hello world",
    flag: true
  }
});
```

#### v-for 

基于源数据多次渲染元素或模板块

1. ```
   <li v-for="item,index in arr" v-bind:key="index">
   	{{item}}
   </li>
   var app = new Vue({
     el: "#app",
     data: {
       message: "hello world",
       arr: [1,2,3,4,5]
     }
   });
   ```

2. 在遍历的过程中，往往会给元素添加一个 key 标识，vue 内部看 DOM 结构的改变，是通过参考 key 来计算的，for 循环会导致 DOM 重排，key 可以提高 DOM 的渲染率，降低重排的次数。

#### v-show

 根据表达式之真假值，切换元素的 `display` CSS property。

1. ```
   <div v-show="flag3">v-show</div>
   var app = new Vue({
     el: "#app",
     data: {
     	flag3: true
     }
   });
   ```

2. v-show 和 v-if 的区别？show 是改变元素的display 属性，而 if 是判断元素是否渲染DOM树中

```js
// 总结
v-bind 动态绑定属性
v-if 用于判断是否渲染
v-for 循环数据
v-show 显示元素
v-html 原生数据渲染
mvvm 开发模式
```

### day 2

#### class

1. ```js
   // class 标签自带属性
   // 使用 v-bind 绑定 v-bind:class
   // class 值的种类: 
   // 1. 单个变量 <h2 :class='color'>{{message}}</h2>
   // 2. 数组 <h2 :class='[color, bg]'>{{message}}</h2>
   // 3. 对象  key 是类名，value 是用来判断是 true 或 false 来判断是否添加该类名
   // 4. v-bind 简写为 : (语法糖)
   ```

#### style

1. ```js
   <h2 :style="{color: colorVlaue,background: bgvalue}">style</h2>
   data: {
     colorVlaue: "blue",
     bgvalue: 'pink'
   }
   
   <h2 :style="[{color: colorVlaue},{background: bgvalue}]">style</h2>
   data: {
     colorVlaue: 'red',
     bgvalue: '#ddd'
   }
   ```

#### v-on

事件

```js
// v-on 绑定事件 绑定的方法写在 methods 中
// v-on 可以简写为 @ (语法糖)    @click="fn()"
<button v-on:click="handle">{{message}}</button>
data: {
  message: 'Hello Vue!'
},
methods: {
  handle() {
    console.log('点击了按钮');
  }
}
```

#### 传参

1. ```js
   <button v-on:click="handle2(111)">{{message}}</button>
   data: {
     message: 'Hello Vue!'
   },
   methods: {
     handle2(msg) {
       console.log(msg);
     }
   }
   ```

2. 在 vue 项目中，如果事件函数不传参，函数后不写 ()

3. 如果事件函数传参，函数后写 ()   函数的执行，都会开辟一个新的内存空间，如果，没有点击就执行，会增大内存消耗

4. 手动销毁内存

```js
fn() {
  alert('111')
  reutrn false
}
arr = null;
```

#### 事件对象 $event

```js
// 事件对象要放在最后
<button v-on:click="handle('111',$event)">{{message}}</button>
methods: {
  handle(msg,event) {
    console.log(msg);
    console.log(event);
  }
}


注意：
在 vue 中不能使用 DOM 0级 或 DOM 2级 绑定事件
使用在 html 中绑定是事件
1. vue 中的 DOM 是虚拟 DOM,是获取不到的
2. 很好的实现 js 业务和 html 的解耦
```

#### 修饰符

```js
// 对于事件的默认行为，使用事件修饰符阻止
@click.stop = 'fn' // 阻止冒泡
@click.prevent = 'fn' // 阻止默认行为
@click.captrue = 'fn' // 阻止事件捕获
@click.once = 'fn' // 事件只执行一次
@click.self = 'fn' // 事件不是从内部元素触发的
@click.ctrl = 'fn' // 按住 ctrl 并且按住其他键都可生效 
@click.ctrl.exact = 'fn' // 有且只能按住 ctrl 点击生效

v-on:scroll.passive
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```



#### 表单

```js
// onchange
// oninput
// onblur
// onfocus
```

#### v-model 双向绑定

```
1. 将 value 和 data 中的字段进行双向绑定

vue 2.0 使用 Obeject.definProperty() 来实现 v-model
vue 3.0 使用 Object.proxy() 来实现 v-model
```

#### this 

1. ```js
   this 叫 函数执行上下文对象 （context）
   1. 所有函数在定义的时候都会有一个 GO 的全局对象,存放在 [[Scopes]] 中
   里面存放着所有全局的变量和方法
   ```

面试题

```js
// 闭包：
function fn() {
	var a = 1;
  return function() {
    a++
  }
}
var ff = fn();
console.log(ff);
闭包是函数自带的一个特性。
普通函数执行完毕之后，该函数的生命周期结束，里面的内存都会被释放。
如果该函数返回一个新的匿名函数，导致执行完毕之后，内存没有被释放
当后面的程序操作这个变量时，可以正常执行。（函数外能访问函数内部的变量）
```

总结

1. 1. 

   ```js
   v-bind
   v-for
   v-if
   v-show
   v-html
   v-on
   v-model
   ```

#### 计算属性

1. ```js
   // 注意：计算属性，本质是属性，形式结构上像方法，函数体返回的内容就是该属性值
   <div id="example">
     <p>Original message: "{{ message }}"</p>
     <p>Computed reversed message: "{{ reversedMessage }}"</p>
   </div>
   var vm = new Vue({
     el: '#example',
     data: {
       message: 'Hello'
     },
     computed: {
       // 计算属性的 getter
       reversedMessage: function () {
         // `this` 指向 vm 实例
         return this.message.split('').reverse().join('')
       }
     }
   })
   ```

2. ```js
   computed VS methods // 计算属性缓存 vs 方法
   computed 有缓存效果，只要返回值没有变化，就不会重新求值。多次访问计算属性会立即返回之前的计算结果。
   methods 每次执行都会执行函数。
   
   ```

#### watch 属性监听

1. ```js
   // 缺点：过多的使用 watch 会造成 CPU 负载过大，内存开销大。
   // 优点：监听属性的变化。
   ```

2. 

### 一、component 组件

```js
// 定义组件 全局 局部
Vue.component("组件名", { opations }) // 组件名首字母大写，

// 全局
Vue.component()
// 局部
var Header = {}
定义完后需要注入到 vue 实例中。
var vm = new Vue({
  components: {
    Header
  }
})
在模板中以组件标签的形式使用 <Header></Header>

注意：template 模板中只能有一个顶层元素
```

```
注意：
1. 组件名不能与 H5 中的标签名重名
2. 组件中的 opations 中的 template 是当前组件的模板
3. vue 实例的 el 扮演的角色就是 vue 实例的模板（vue 实例本身就是一个组件）
4. 组件中存放数据的 data 是一个函数，返回值是一个对象，对象的字段才是组件的数据
5. 组件的数据只能在自己的模板中使用
```

#### 组件传值

1. props 父组件向子组件传值

```js
// 父组件给子组件传值
1. 给子组件标签上绑定属性，将值赋值给这个属性（可以动态赋值）
2. 在子组件中使用 props 来接受传递过来的值，将传值所用的属性名放在 props 数组总
3. 直接在子组件模板中使用 props 中的字段。
```

2. 子组件向父组件传值

```js

// 自定义事件
通过 this.$emit("事件名") 来定义自定义事件
$meit() 定义的是事件，都存放在一个事件池中，事件池是共有的，无论在哪里都可以获取到。事件池中的事件都通过 @（v-on） 来进行绑定。
    

注意：
事件池： 先存的先触发，后存的后触发
```

```js
1. 父组件传值给子组件
		1) <chiild :datas="arr"></child>
		2) 在子组件上添加属性 props 用于接受数据
    3) 在子组件模板中直接使用 props 中的字段
2. 子组件传值给父组件
		1) 需要事件触发自定义事件 $emit('eventName',arguments)
		2) 在组件标签上绑定这个自定义事件 @eventName="fn"
		3) 在父组件中的事件函数 fn 中写对应的业务
3. 父组件获取子组件数据
		方案1： 通过父组件的 $children 属性，获取子组件对应的数据（父组件可以有多个子组件，处理起来麻烦）不推荐
    方案2: 
		1) 在子组件标签上添加 ref 属性 <Son ref="son"></Son>
		2) 在父组件中可以通过 this.$refs.son 来获取子组件的数据
    	例如：this.$refs.son.title
    注意：this.$refs 的处理逻辑需要放在 mounted 钩子里
4. 子组件获取父组件数据
		1) 在子组件中通过 this.$parent 就可以获取到对应的数据
    	例如：this.$parent.title
			在 created 钩子 和 mounted 钩子中都可以获取到
```



#### 动态组件

```js
通过在模板中使用 <component> 中动态绑定一个 :is 属性，属性值就是组件名，传入那个组件名，就渲染那个组件。
keep-alive 可以临时存储被渲染后的组件的 数据，第二次再切换到时，就直接从本地数据进行渲染。
```

#### 资源的引入

1. ```js
   // img 中的 src 引入的资源地址，图片在 vue 中会被编译成 16进制的代码，直接使用数据绑定不出效果
   ```

   
   

### 二、钩子函数

1. ```js
   beforeCreate
   created
   beforeMount
   mounted
   beforeUpdate
   updated
   activated
   deactivated
   beforeDestroy
   destroyed
   errorCaptured
   
   注意
   所有钩子函数里的this都是指向当前组件对象，不需要使用箭头函数。
   
   1. created() {} 数据 data 一个分界线
   对数据的操作，写在 created 里面
   2. mounted() {} DOM 渲染的分界线
   对 DOM 的操作，写在 mounted 里面
   
   在 vue 中想要获取 DOM 节点，不能使用原生方法
   如果需要获取 DOM 节点，将需要的的节点上添加 ref 属性 
   <button @click="fn" ref="aa">btn</button>
在 mounted 中，通过 this.$refs.aa 就能拿到真实的 DOM
   ```
   
   
   

### 三、axios  网络请求

```js
移动端
安卓机一次可以进行 4 个资源文件的加载
苹果机一次可以进行 9 个资源文件的加载

注意：
@vue/cli 将 public 当做站点目录 例如：http://localhost:8080/data/aaa.txt

api
1. get 请求 参数放在 params 中
	axios.get(url,{params:{id=1}})
 	.then(value => {}).catch(err => {})
	params 用来存放参数

		get 的参数问题
		axios.get(url,{params: {id:1}})
		params 用来存放 get 请求的参数

2. post请求 参数放在 body 中
	axios.post(url,{参数})
  	.then(value => {}).catch(err => {})
	body 用来存放 post 的参数

3. delete 请求 参数放在 params 中
	axios.delete(url,{params:{id=1}})
  	.then(value => {}).catch(err => {})

4. put 请求 参数放在 body 中
	axios.put(url,{参数})
  	.then(value => {}).catch(err => {})

在做参数传递的时候有两种传递方式: 具体的传参方式由后端决定
1. application/json 
数据以对象的形式传递 '{name: "zhangsan"}'
2. x-www-form-urlencoded
数据以字符串的形式传递 'name="zhangsan"'

```

​	

```js
http 的请求方式（action）9种,  前4种比较常用

get 获取
post 增加
delete 删除
put 更新
head 类似于 GET 请求，只不过返回的响应中没有具体的内容，用于获取报头
options 允许客户端查看服务器的性能。
patch 是对 put 方法的补充，用来对已知资源进行局部更新 。
connect HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器。
trace 回显服务器收到的请求，主要用于测试或诊断。
```

#### Promise

```js
实现代码的扁平化
promise 有三个状态 pending(运行中), resolved(成功), rejected(失败)
let pms = new Promise((resolve, reject) => {
	axios.post('url',{})
  .then(res => {
    resolve(res)
  })
  .catch(err => {
    reject(err)
  })
})
// 写法一：
pms.then(res => {
	console.log(res)  
},(err) => {
	console.log(err)  
})
// 写法二：
pms.then(res => {
	console.log(res)  
}).catch(err => {
	console.log(err)  
})

```



注意：promise 必须要有状态 resolve 或者 reject (两个状态不能同时存在)

promise 是微任务，new promise 会立即执行，但是，回调函数会被推到任务队列 event loop ，权限高于宏任务（计时器，事件）



#### 经过postman 测试 http 的 cation

```js
get 的参数在 params 中
post 的参数在 body 中
delete 的参数在 params 中
put 的参数在 body 中
```

#### 请求方式 demo

```js
get请求
this.axios.get("http://localhost:3005/cart").then((res) => {
  console.log(res,'商品列表');
}),catch(err => { console.log(err) });

post 请求
this.axios.post("http://localhost:3005/cart/add", {
  gid: 1,
}).then((res) => {
  console.log(res,'添加商品1');
}).catch((err) => {
  console.log(err);
});

put 请求
this.axios.put("http://localhost:3005/cart", {
  cid: "b9179a90-f210-4d6f-ba1e-6a2afda593fd",
  count: 20,
}).then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});

delete 请求
this.axios.delete("http://localhost:3005/cart/delete", {
  params: {
    cid: "137b0bbc-abb7-458e-b30b-47e90bac3eae",
  },
}).then((res) => {
  console.log(res,111);
}).catch((err) => {
  console.log(err);
});


前面的请求类型也可以写成
axios({}) // 参数是 opations
.then(calllback)
.catch(calllback)
// opations 字段分析
method: "post" // 请求类型
url: "http://........" // 请求地址
data: {} // 请求参数





```

#### 请求响应拦截

```js
axios.create({}) 
// 创建一个新的 axios 实例，为这个实例增加新的基本设置
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/', // 设置基础地址
  timeout: 1000, // 设置超时时间
  headers: {'X-Custom-Header': 'foobar'} // 设置请求头的属性
});


instance.default
default 是一个对象，自定义设置 instance 的默认属性
例如：
instance.defaults.baseURL = config.baseUrl // 设置基础地址
instance.defaults.timeout = 10000 // 设置超时时间
instance.defaults.headers.common['Authorization'] = 'Bearer 18375f13-cfab-4fb1-b485-54959cca2ab3' // 设置 token
instance.defaults.headers.post['Content-Type'] = 'application/json' // 设置请求类型
// 配置 instance 请求头中的 content-type 为指定类型


拦截器 interceptors
请求拦截：请求过程中实现拦截功能
语法：
instance.interceptors.request.use(function(config) {
 // config 是请求的配置
  // 关于 config 的处理之后还要返回 config
  config.timeout = 5000
  return config
},function(error) {
  return Promise.reject(error);
})



响应拦截：响应过程中实现拦截功能
语法：
instance.interceptors.response.use(function(response) {
  // response 是响应的配置
  // 关于 response（返回结果） 的处理之后还要返回 response
  // 响应码在 2xx 的会触发此处的代码
  return response
}, function(error) {
  // 响应码在 2xx 之外的会触发此处的代码
  return Promise.reject(error);
})
```



#### axios 总结

   1. axios 适合用在移动端开发，pc 也行，因为它是轻量级的
   2. axios 提供的 http action 有 get post put delete request patch head options
   3. 会 api 的封装
4. 参数传递的方式 params data application/json x-www-form-urlencoded 的意思
   5. 拦截器 interceptors 的用法。 
2. 将 axios 包装到 vue 上

```
   将 axios 包装到 vue 上
   https://www.npmjs.com/package/vue-axios
   /*
   	vue-axios  用于将axios集成到Vuejs的小型包装器  
   	为什么  
   	我创建这个库是因为在过去，我需要一个简单的解决方案来从vue-resource迁移到axios。 
   	它只将axios绑定到vue实例，所以您不必每次使用axios时都导入。  
   */
    
   
   // main.js
   import axios from 'axios'
   import VueAxios from 'vue-axios'
   Vue.use(VueAxios, axios)
   
   在 vue 的组件中直接使用，例如
   created() {
     this.axios.get("http://localhost:8080/data/aaa.txt")
       .then(res => {
       console.log(res.data);
     })
       .catch(err => {
       console.log(err);
     })
   },
```

### 四、跨域问题结局方案

1. ```js
   // 简洁版  不能自主判断运行环境
   // 使用本地代理
   // 在主目录下创建 vue.config.js 文件配置以下字段
   module.exports = {
     configureWebpack: {
       devServer: {
         host: "localhost", // 前端
         port: 8080, // 前端端口
         proxy: {
           '/api': { // 后台地址的别名
             target: 'http://127.0.0.1:3000/', // 后台地址
             changeOrigin: true, // 支持跨域
             pathRewrite: { //重写路径
               // '^/api': '/api'   // 这种接口配置出来     http://XX.XX.XX.XX:8083/api/login
               '^/api': '/' //这种接口配置出来     http://XX.XX.XX.XX:8083/login
             }
           }
         }
       },
     }
   }
   ```



#### 不同环境的接口问题

```js
   // 可以判断环境的本地代理
   开发环境
   测试环境
   生产环境
   
   1. 需要在主目录下添加对应环境的文件，
   
   .env.development 开发环境的接口文档配置
   	# 开发环境
   	# NODE_ENV 是 node 自带的一个全局变量
   	NODE_ENV = 'development'
   	VUE_APP_BASE_URL = 'http://127.0.0.1:3000/'
   
   .env.test 测试环境的接口文档配置
   	# 测试环境
   	NODE_ENV = 'test'
   	VUE_APP_BASE_URL = 'https://api.github.com/'
   	
   .env.production 生产环境的接口文档配置
   	# 生产环境
   	NODE_ENV = 'production'
   	VUE_APP_BASE_URL = '生产环境的地址'
   
   2. 程序如何判断环境
   开发者通过配置指令的参数 --mode "参数" 的参数来指定环境
   "scripts": {
       "serve": "vue-cli-service serve --mode development", // 开发环境
       "serve2": "vue-cli-service serve --mode test", // 测试环境
       "build": "vue-cli-service --mode production", // 生产环境 打包
       "lint": "vue-cli-service lint"
     },
   
   3. 在 vue.config.js 中配置
    #获取对应环境下的地址
   let apis = process.env.VUE_APP_BASE_URL
   module.exports = {
     configureWebpack: {
       devServer: {
         host: "localhost", // 前端
         port: 8080, // 前端端口
         proxy: {
           '/api': { // 后台地址的别名
             target: apis, // 后台地址
             changeOrigin: true, // 支持跨域
             pathRewrite: { //重写路径
               // '^/api': '/api'   // 这种接口配置出来     http://XX.XX.XX.XX:8083/api/login
               '^/api': '/' //这种接口配置出来     http://XX.XX.XX.XX:8083/login
             }
           }
         }
       },
     }
   }
   
   
   // 经过以上3步的配置，就可以实现使用不同的 npm 命令实现不同的开发接口的测试
```

#### 使用 axios 需要注意的地方

```js
axios 默认的请求传参类型是 application/json
如果后台给的是 application/x-www-form/-urlecoded 类型，前后台请求会出现问题
axios 传参都是 {name: "zhang"}
需要安装 qs这个模块，它的方法 stringify() 将对象的格式的字符串转成键值对格式的字符串
let qs = require('qs')
data: {name: 'zhang'} 改成
data: qs.stringify({name:'zhangsan'})
它的原理就是
JSON.parse() "{name:'zhang'}" ==> {name:"zhang"}
JSON.stringify() {name: "zhang"} ==> "{name:'zhang'}"
```

### 五、vue 路由 vue-router

```js
在 vue 开发中不能使用 a 标签，因为 a 可以进行跳转，并且刷新页面。
使用 路由 提供的 router-link 组件替代 a
这个组件中的 to 属性替代 href

地址的解析：
https://router.vuejs.org/zh/guide/#html?name=zhang
"https://router.vuejs.org" // 基准地址 协议 ip|域名 +端口
"/zh/guide" // path 路径
"#html" // hash
"?name=zhang" // 参数

router-view 组件
router 提供的一个组件，提供路由的出口

定 （定义组件）
配 （配置路由）
实 （实例化一个router 对象）
挂 （将 router 对象挂载到 vue 实例上）
```

####  **定 （定义组件）**

```js
const Home = {
  template: '#home'
}
const Mess = {
  template: '#mess'
}

```
####  **配 （配置路由）**

```js
let routes = [{
  path: '/home',
  component:Home
}, {
  path: '/mess',
  component:Mess
}]
```

####  **实（实例路由对象）**

```js
let router = new VueRouter({
  routes
})
```

####  **挂（在 vue 实例中挂载 router）**

```js
const app = new Vue({
  el: '#app',
  router // 挂载路由
})
```

####  vue/cli 下的使用

```js

   // 1. 安装 vue-router
   npm install vue-router
   
   // 2. 定义组件 （ a. 定）
   Home.vue Mess.vue
   
   // 3. 创建 router.js 文件，配置 router
       import Vue from 'vue'
       import VueRouter from 'vue-router'
   
       Vue.use(VueRouter) // 给 vue 中注入 vue-router
   
       import Home from '../components/Home';
       import Mess from '../components/Mess';
   
       let routes = [ // （ b. 配）
         {
           path: '/',
           redirect: '/home' // （重定向 没有路径 进入home路径）
         },
         {
           path: '/home',
           component: Home
         },
         {
           path: '/mess',
           component: Mess
         },
       ]
   
       let router = new VueRouter({ // （ c. 实例化 vue-router）
         routes
       })
       export default router // (导出 vue-router 对象)
   
   // 4. 在 main.js 中导入
   		// (导入 vue-router 对象)
       import router from './router/router' 
   		
       // 在 vue 实例上挂载
       new Vue({
         render: h => h(App),
         router // ( d. 挂载 vue-router 对象)
       }).$mount('#app')

```

 

#### Vue.use(VueRouter)  

使用 Vue.use() 的原因和使用方法

```js
在传统的开发中，需要依赖 vue 插件，我们在引入的时候，放在 vue 之后引入就可以了。
比如：
<script src="/path/to/vue.js"></script>
<script src="/path/to/vue-router.js"></script>

对于@vue/cli 脚手架，文件的引入没有先后的顺序了。
vue 对于脚手架开发中遇到需要依赖 vue 的插件，vue 提供了一个 API Vue.use(),主要的功能就是给 vue 安装一个插件。
1. use 的参数只能有两种情况
	1. 如果是对象，那么对象中必须有 install 方法，且方法的参数为 Vue
  2. 如果是函数，那么 vue 会把函数当做 install 方法调用，参数也是 Vue
源码如下：

// 1. 插件为一个对象
let obj = {
  install(Vue) {
    // 业务
    console.log("hello world!!");
    Vue.myPlugin = {
      name: "xing"
    }
  }
}

// 2. 插件为一个函数
let obj = function(Vue) {
  console.log("hello seec!!");
    Vue.myPlugin = {
      name: "seec"
    }
}

export default obj;
```



### 六、动态路由

```js
在 url 中传参
http://localhost:8080/home/123
http://localhost:8080/home/456
```



#### 在 vue/cli 项目中，我们使用动态路由传参

```js
动态路由就是在配置的路由后面加上 :字段
比如： 
let routes = [
  {path: '/home/:id',component: Home},
  {path: '/mess/:name',component: Mess},
]

// 上面的 id name 为形参
// 在地址栏中输入的为实参

可以通过 this.$route.params 拿到地址中的参数

```

#### this.$route

```js
this.$route.params 包含动态路由的传参数据
this.$route.query 包含地址栏中的 get 传参数据
this.$route.hash 包含了地址栏中的哈希值 # 后的东西



```



#### 动态路由的优缺点

```js
优点：
可以实现组件的复用。根据参数不同，组件模板内的数据不一样，但是是一个组件
缺点：
使用了一个组件，导致组件一旦加载完成之后。里面的部分钩子函数不起作用了。created mounted 不起作用  updated 起作用
```



需求

```js
如果在组件中 created 发送 ajax 请求，就不会执行，这个需求实现不了。
```



#### 监控动态路由

```js
在 watch 中 加入 $route 可以监听动态路由的变化
watch:{
  $route(to, from) {
    console.log(to); // 下一个路由对象信息
    console.log(from); // 原有的路由对象信息
  }
},
```

面试题

```js
在项目中，怎么判断同一个页面是由不同的页面跳转过来的
在路由中进行监听。 watch () {$route(to,from) {console.log(to,from);}}
```



#### 路由嵌套

```js
注意：配置子路由的时候，如果 path 以 / 开头，嵌套路径会被当作根路径开始。这让你充分的使用嵌套组件而无须设置嵌套的路径。（跟 Linux 下的目录关系很像）
不带 / 会认为是路径的拼接
let routes = [
  {
    path: '/home/:id',
    component: Home,
    children: [{
      path: 'son1', // /home/123/son1
      component: Son1
    }, {
      path: '/home/son2', // /home/son2 从根目录开始查找
      component: Son2
    }]
  },
  {
    path: '/mess',
    component: Mess
  }
]
```

#### 编程式导航 VS 声明式导航

```js'
<router-link to='home'></router-link> // 声明式导航
```



```js
编程式导航：通过编写代码实现路由跳转
（是通过 BOM 对象来封装的）

router.push()


```

##### this.$router.push()

```js
push() 中的值的情况:
1. 可以是字符串
		push('home') push('/home')
2. 可以是对象
    push({
      path:"/home",
      query: {name: "lisi"},
    })
    等价与  '/home?name=lisi'
3. 是命名的路由
		push({
      name:"xing",
      params: {name: 'lisi'}
    })
		去 router.js 中找有 name 字段为 xing 的路由，跳转过去,如下：
    {path: "/music/:name",component: Music,name: 'xing'}
		等价与  '/music/lisi'
		注意：path 和 params，不能共存。有 path 时，params 不生效
4. 带查询参数
		this.$router.push({ path: '/music', query: {name: 'lisi'} })
		等价与  '/music?name=lisi'
```



##### this.$router.replace()

```js
this.$router.replace()
与 push 用法一样
replace 没有访问历史记录，push 有历史记录，会存放在 history 栈中。
跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。
```

##### this.$router.go(num)

```js
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```



##### `router.push(location, onComplete?, onAbort?)`

```js
可选的在 router.push 或 router.replace 中提供 onComplete 和 onAbort 回调作为第二个和第三个参数。这些回调将会在导航成功完成 (在所有的异步钩子被解析之后) 或终止 (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由) 的时候进行相应的调用。在 3.1.0+，可以省略第二个和第三个参数，此时如果支持 Promise，router.push 或 router.replace 将返回一个 Promise。

注意： 如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 /users/1 -> /users/2)，你需要使用 beforeRouteUpdate 来响应这个变化 (比如抓取用户信息)。
```



#### 命名路由

```js
// 通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称。
// router.js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})1
// router-link 声明式导航
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
注意：to 属性需要动态绑定一个对象{name: ''}
// this.$touter.push() 编程式导航
this.$router.push({ name: 'user', params: { userId: 123 } })

```



#### 路由权限(鉴权)(面试题)

```js
在路由配置文件中添加一个字段，例如 isToken 值为 true/false
在路由跳转的函数中，对这个字段进行判断，true/false
true 让跳转
false 不让跳转 或 跳转到登录页
```

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



#### 路由模式

路由模式有两种：history      hash

```js
const router = new VueRouter({
  mode: "history", // 路由模式 有两种 history hash
  base: process.env.BASE_URL, // process.env.BASE_URL 根目录 /
  routes,
});
// mode 是针对路由模式的切换
```



#### 路由懒加载

```js
路由懒加载就是 按需加载
let About = () => import("../views/About") // 懒加载的写法
或者在 component 中引用
{
  path: "/about",
  name: "About",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
      import( /* webpackChunkName: "about" */ "../views/About.vue"),// 懒加载的写法
},
/* webpackChunkName: "about" */  webpack魔法变量
可以设置打包后生成的 js 的文件名

使用懒加载需要注意：箭头函数的用法
1. 当参数只有一个，可以省略小括号
2. 当函数体内，有一行代码的时候大括号可以省略，同时这行代码也是函数的返回值
```



#### 命名视图 router-view

```js
// 在配置顶层路由时，一般设置一个路由出口
<div id="app">
    <router-view />
</div>
// 当在同级下，写两个出口时，这两个都是路由出口，会显示两遍

需要让同级路由出口显示的内容不一样
需要给 router-view 属性添加 name 属性
<div id="app">
  <router-view name="xing" />
   <router-view name="tian" />
</div>
同时将 router.js 中将配置的 component 变成 components
{
  path: "/home",
  name: "Home",
  components: {
    default: News
    xing: Home,
    tian: News
  },
},
  default 给没有名字的 router-view
```

#### 重定向 *redirect*

```js
在路由配置项中添加 redirect 字段

{
  path: "",
  redirect: "/home"
}
当进入空地址时，进入 /home 地址中
```



#### 别名 alias

```js
{
    path: "/home",
    name: "Home",
    alias: "/hhh", // 别名
},
访问 /home 和 /hhh，都进入 Home 组件
```



#### 路由给组件传值

```js
/home/:id   id 是路由的参数，在组件中使用 this.$route.params.id 获取
this.$route.params.id // 这种写法有高度的耦合

// 使用下面这种方法，没有高度的耦合
1. 在路由配置项中设置 props:true, （允许组件使用 props 接受参数）
2. 在组件中添加 props 属性，将参数写入。例如： props:["id"]
3. 就可以在组件模板中直接使用 id 了
```



#### 路由元信息

```js
<meta/> 元数据标签
在路由配置项中，添加属性 meta
{
    path: "/home/:id",
    name: "Home",
    props: true,
    meta: {
      title: "主页"
    },
}
一般在导航守卫中获取
一般用来修改每次页面跳转后的title
router.beforeEach((to,from,next) => {
  document.title = to.meta.title
  next()
})
```



#### 组件通信

```js
1. 父组件传值给子组件
		1) <chiild :datas="arr"></child>
		2) 在子组件上添加属性 props 用于接受数据
    3) 在子组件模板中直接使用 props 中的字段
2. 子组件传值给父组件
		1) 需要事件触发自定义事件 $emit('eventName',arguments)
		2) 在组件标签上绑定这个自定义事件 @eventName="fn"
		3) 在父组件中的事件函数 fn 中写对应的业务
3. 父组件获取子组件数据
		方案1： 通过父组件的 $children 属性，获取子组件对应的数据（父组件可以有多个子组件，处理起来麻烦）不推荐
    方案2: 
		1) 在子组件标签上添加 ref 属性 <Son ref="son"></Son>
		2) 在父组件中可以通过 this.$refs.son 来获取子组件的数据
    	例如：this.$refs.son.title
    注意：this.$refs 的处理逻辑需要放在 mounted 钩子里
4. 子组件获取父组件数据
		1) 在子组件中通过 this.$parent 就可以获取到对应的数据
    	例如：this.$parent.title
			在 created 钩子 和 mounted 钩子中都可以获取到
```



#### 插槽 slot

```html
正常情况下，组件里的内容是不会被渲染出来的，渲染的是组件模板中的内容
<Component><h3>哈哈哈哈</h3></Component>
h3 是不会被渲染的，只会渲染 Component 对应的模板
如果需要渲染 h3，就必须在component 对应的模板中添加一个 slot 标签
<slot></slot> 就是 h3 的出口组件
作用： 
方便组件的复用，同时可以更改复用的内容

具名插槽：
组件标签内 
1. 必须使用 template 
2. 组件标签内最外层不能套顶层标签
<Child>
  <template slot="left"> <div>左边</div> </template>
  <template slot="center"> <div>中间</div> </template>
  <template slot="right"> <div>右边</div></template>
</Child>
<Child>
  <template v-slot:left> <div>左边</div> </template>
  <template v-slot:right> <div>右边</div> </template>
  <template v-slot:center> <div>中间</div> </template>
</Child>

Child 模板
<template>
  <div>
    <slot name="left"></slot>
    <slot name="center"></slot>
    <slot name="right"></slot>
  </div>
</template>
```



```html
作用域插槽
插槽里面的内容想要访问子组件里的数据，正常情况下访问不到，原因是插槽里的内容是在父组件的模板中。
1. 需要在<slot></slot>上绑定需要访问的数据，如下：
// child.vue
<template>
  <div>
    RolesChild
    <!-- 作用域插槽 -->
    <slot :str="str"></slot>
    <!-- 具名作用域插槽 -->
    <slot name="slotName" :arr="arr"></slot> 
  </div>
</template>
<script>
  export default ({
    name: "RolesChild",
    data() {
      return {
        str: 'helllllllo',
        arr: "helllllllo"
      }
    }
  })
</script>
2. 在父组件中，在组件标签上 v-slot="随便写" 或者 v-slot:具名插槽名="随便写"
使用 {{ 随便写.str }}
// Father.vue
<template>
  <div>
    角色分配
    <!-- 作用域插槽的使用 -->
    <RolesChild v-slot="slotProps">
      <h2>{{ slotProps.str }}</h2>
    </RolesChild>
    <!-- 具名作用域插槽的使用 -->
    <RolesChild>
      <template v-slot:slotName="slotProps">
        <h2>{{ slotProps.arr }}</h2>
      </template>
    </RolesChild>
  </div>
</template>
```





#### 动画 animation

```js
1. 如果要给元素加动画，一定要用<transition name=""></transition> 同时添加属性 name
2.在给元素写动画样式时，必须按照官方给的类名
v-enter,v-enter-active,v-enter-to 动画开始前 开始中 开始后
v-leave,v-leave-active,v-leave-to 动画结束前 结束中 结束后
v 为 transition 标签中的 name 的 属性值

例如： 
<button @click="fn">按钮</button>
<transition mode="out-in" name="xing" appear>
  <div v-show="isShow">
    <h3>嘿嘿嘿</h3>
  </div>
</transition>
data() {
  return {
    isShow: false
  }
},
methods: {
  fn() {
    this.isShow = !this.isShow
  }
},
<style scoped>
.xing-enter-active, .xing-leave-active {
  transition: opacity 1s;
}
.xing-enter,.xing-leave-to {
  opacity: 0;
}
</style>
```









### API开发

#### json-server

```js
// 1. 全局安装 json-server
npm i -g json-server

启动指令  json-server --watch db.json

json-server 支持 http 中的动作 get post delete put
get
	1. 单个获取 http://localhost:3000/persons/1
  2. 集合获取 http://localhost:3000/persons
post
	增加 http://localhost:3000/persons
	在 body 中传参且请求类型是 application/x-www-form-urlencoded
delete
	删除 http://localhost:3000/persons/2  删除 id=2 的数据
put
	更新 http://localhost:3000/persons/2  更新 id=2 的数据
	在 body 中传参且请求类型是 application/x-www-form-urlencoded
```



注意

```js
在终端指令中 --单词 / -单词首字母 : 表示该指令的参数

json-server 的请求类型是 application/x-www-form-urlencoded
axios 的默认请求类型是 application/json

网络请求的性能优化
	1. 防抖 和 节流
  2. 异步代码的处理
  Promise
  async await

```

#### Promise

```js
实现代码的扁平化
promise 有三个状态 pending(运行中), resolved(成功), rejected(失败)
let pms = new Promise((resolve, reject) => {
	axios.post('url',{})
  .then(res => {
    resolve(res)
  })
  .catch(err => {
    reject(err)
  })
})
// 写法一：
pms.then(res => {
	console.log(res)  
},(err) => {
	console.log(err)  
})
// 写法二：
pms.then(res => {
	console.log(res)  
}).catch(err => {
	console.log(err)  
})

```



注意：promise 必须要有状态 resolve 或者 reject (两个状态不能同时存在)

promise 是微任务，new promise 会立即执行，但是，回调函数会被推到任务队列 event loop ，权限高于宏任务（计时器，事件）



#### Restful 接口规范

Restful 接口规范

```js
Restful 其实就是一种资源请求接口的约定
1. 资源路径使用名词，一律使用小写，区分单复数
2. 对于资源的请求类型，一定要按照 http 动词来设计， 
		例如：get(查) post(增) put(改) delete(删)
3. url 路径不能嵌套太多
		例如：查找 id 为 1 的用户
    http://localhost:8080/users/id/1   ×
		http://localhost:8080/users?id=1   √
```





#### promise VS async await

```js
异步代码同步效果
```







### UI 库

```js
vue PC端 使用 Element-ui 组件库
vue 移动端 使用 Vant 组件库
```



```js
安装 element-ui 安装
-S 参数 --save 代表下载到当前目录，同时该UI 也是上线所依赖的
-D 参数 --development 代表下载到当前目录，是开发依赖（工具）
```



#### form组件

```js
表单验证
<el-form-item
        label="用户名"
        prop="username"
        :rules="[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur',
          },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '姓名不支持特殊字符',
            trigger: 'blur',
          },
        ]"
      >
        <el-input
          v-model="ruleForm.username"
          placeholder="请输入内容"
          prefix-icon="el-icon-user"
        ></el-input>
      </el-form-item>
:rules 中的对象的字段
type: 决定填入的值的类型(string number)
required: 是否为必填项 Boolean
pattern: 正则验证
range: 范围大小  min 最少字段   max 最多字段
message: 提示文字
validator: 自定义验证 Function   validator: (rule,value,callback) =>{}
// 自定义校验，上面的其他规则不起作用，使用了自定义校验，可以不写其他的规则，callback一般用来抛出错误提示文字。 return true 表示通过， return false 表示不通过。
```

#### 表单校验流程

```js
1. 在 el-form 组件上绑定 modle 和 rules
<el-form :rules="rules" :model="myform">
2. 在组件的 data 中返回一个 myform 对象
data() {
    return {
      myform: {
        user: "",
        pw: "",
      },
    };
  },
3. myform 中的字段(user  pw)当做 el-form-item 的 prop 的属性值
	在 el-input 上绑定 v-model="myform.user"
<el-form-item prop="user">
  <el-input
    v-model="myform.user"
    placeholder="请输入内容"
    ></el-input>
</el-form-item>
4. 在 data 中添加 rules 字段 一个对象 中设定 user pw 的验证规则
data() {
    return {
      rules: {
        user: [
        	{ required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur', },
          { required: true, pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/, message: '用户名不支持特殊字符', trigger: 'blur', },
        ],
        pw: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur', },
          { required: true, pattern: /^[a-zA-Z0-9_]+$/, message: '请使用数字、字母、下划线设置密码', trigger: 'blur', },
          {
            validator: (rule,value,callback) => { // 自定义校验，上面的其他规则不起作用，使用了自定义校验，可以不写其他的规则，callback一般用来抛出错误提示文字
              console.log(rule);
              console.log(value);
              // callback(new Error('错误'))
            },
            trigger: 'blur'
          }
        ],
      }
    };
  },
```










### 搭建环境

node.js 环境

npm 是 node 的包管理工具  https://www.npmjs.com/

#### 安装 npm 包  

```js
// 安装
npm install 模块名
// 卸载
npm uninstall 模块名

安装淘宝镜像
npm config set registry https://registry.npm.taobao.org

npm install -g // 全局安装  一般安装工具
```

#### 工程化和模块化开发

```js
commonjs  node规范 也叫 cmd 规范 针对node使用 
(module.exports 和 require)

AMD require.js 规范 阿里提出来的

ES Module 规范 是 es6 规范  es6提出来的
(export 和 import)
```

#### ES Module

```js	
在传统开发中 js 文件之间无法实现依赖关系
es module 主要通过 export 对外输出   import 对内引入

export 对外导出的必须是接口 不能直接导出值
export 11  ×

var a = 11
export a ×

var a = 111;
export {a}; // 正确的导出

import 
```

补充

```js 
对象的简写：当属性和属性值一样的时候，可以直接写属性。

对象的解构：let { foo, bar } = { foo: "aaa", bar: "bbb" };
```

##### vue 脚手架开发

```js
// 有两个版本
vue-cli 2.0 版本
vue/cli 3.0 版本

全局安装 @vue/cli
// npm install -g @vue/cli


创建项目
vue create 项目名
```

![](D:\Desktop\2021-10 Vue\img\Snipaste_2021-10-22_10-18-39.png)

#### 项目目录分析

##### 主目录分析

![](D:\Desktop\2021-10 Vue\img\Snipaste_2021-10-25_08-56-17.png)

##### src 目录分析

![](D:\Desktop\2021-10 Vue\img\Snipaste_2021-10-25_08-41-43.png)

##### package.json 目录分析

![Snipaste_2021-10-25_08-57-49](D:\Desktop\2021-10 Vue\img\Snipaste_2021-10-25_08-57-49.png)



##### babel.js

 是 JavaScript 的编译器，将 js 的高级语法，转成浏览器可以识别的语法。

##### 代码分析

```js
// main.js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

$.mount() 函数可以挂载 el 对应的模板

2. vue 模板语法
<template></template>  里面是当前组建的模板，里面必须有一个顶级标签
<script></script> 对外暴露组件
<style scoped></style> 当前组件的样式
	scoped 意味着当前组件的样式只会影响当前组件
  不加 scoped 意味着样式是全局样式，会影响其他组件
```





### npm

```js
1. 包的下载 删除 install uninstall
2. package.json的使用
命令行  npm init -y  直接生成一个 package.json 文件
// package.json
{
  "name": "xing",
  "version": "1.0.0",
  "description": "",
  "main": "index.js", // 入口文件 默认是 index.js 文件 可以修改入口文件
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
// main: 表示入口文件 默认是 index.js 文件 可以修改入口文件
// 如果引入文件是 let obj = require('xing'),xing 包必须放在 node_modules
// scripts 代表脚本指令
	// 配置脚本指令
	// 属性可以人为写，写完必须使用 npm run 名字(人为定义的名字)
	// start test restart 不能带 run
	// npm start  npm test  npm restart
	// 为什么不带 run 因为 npm 把这两个指令占用了

写工具
1. 在 xing-tool文件 目录下创建 bin 文件夹
2. 在 bin 文件夹下 添加一个业务文件 xing.js
	注意：xing.js 的开头必须用    #!/usr/bin/env node  // 环境是 node
3. 在 xing-tool文件 目录下 package.json 中添加 bin 字段 如下：
"bin": {
  "xing-tool": "./bin/xing.js"
},
4. 在 xing-tool文件 目录下执行 npm link 建立软连接
5. 成功后就可以在任何的地方执行 xing-tool 命令了
```



#### 发布工具

```js
1. 登录 npm 服务器
	账户 xing-tianlun
2. 需要修改 .npmrc 的镜像，
	将镜像改回 npm 的原网站
  npm config set?registry https://registry.npmjs.org/
3. 在命令行登录
```



![](D:\Desktop\2021-10 Vue\img\image-20211111102818371.png)

 

```js
// 在想要发布的包的目录下执行
npm publish
```

![](D:\Desktop\2021-10 Vue\img\Snipaste_2021-11-11_10-31-40.png)

发布成功

![](D:\Desktop\2021-10 Vue\img\Snipaste_2021-11-11_10-32-40.png)



#### 注意：

```
1. name  是 js 的全局变量，不能人为定义 name 变量
2. v-html 单纯的数据渲染，推荐使用，但是用的很少
3. 对于 options 中的字段
		获取 el 对应的元素 vm.$el
		获取 data 中的字段 vm.message
		获取 methods 中的方法 vm.fn
4. 渐进式：我们添加的所有的字段都会注入到 vue 的实例对象上，随着业务的增多，vue 实例的内存开销会越来越大。典型的面向对象思想。
5. 不要在 vue 的方法中进行 DOM 操作，vue 的宗旨是不允许使用太多的 DOM
6. 命名方式
	camelCase （驼峰命名法，单词相连，第一个单词首字母小写，其他单词首字母大写） 	被用在js中
	PascalCase（帕斯卡命名法，单词相连，单词首字母大写） 被用于js中
	snake_case（蛇形命名法，单词间以下划线分隔）
	kebab-case（烤串命名法，单词间以中横线分隔）
7. 
```



#### 打包

```js
需要在 vue.config.js 中配置以下字段
module.exports = {
  publicPath: './',
  outputDir: 'dist',
}
// 打包好的 dist 文件中的 index.html 可以直接使用
```





#### http报文

```js
请求报文
1. 请求行 一行 里面包括http版本等信息
2. 请求头 请求类型
3. 空行
4. 请求体 看参数
响应报文
1. 响应行
2. 响应头 响应类型
3. 空行
4. 响应体 返回的数据
```



#### http 请求状态码

| 100  | Continue                        | 继续。[客户端](http://www.dreamdu.com/webbuild/client_vs_server/)应继续其请求 |
| ---- | ------------------------------- | ------------------------------------------------------------ |
| 101  | Switching Protocols             | 切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到HTTP的新版本协议 |
|      |                                 |                                                              |
| 200  | OK                              | 请求成功。一般用于GET与POST请求                              |
| 201  | Created                         | 已创建。成功请求并创建了新的资源                             |
| 202  | Accepted                        | 已接受。已经接受请求，但未处理完成                           |
| 203  | Non-Authoritative Information   | 非授权信息。请求成功。但返回的meta信息不在原始的服务器，而是一个副本 |
| 204  | No Content                      | 无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档 |
| 205  | Reset Content                   | 重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域 |
| 206  | Partial Content                 | 部分内容。服务器成功处理了部分GET请求                        |
|      |                                 |                                                              |
| 300  | Multiple Choices                | 多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择 |
| 301  | Moved Permanently               | 永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替 |
| 302  | Found                           | 临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI |
| 303  | See Other                       | 查看其它地址。与301类似。使用GET和POST请求查看               |
| 304  | Not Modified                    | 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源 |
| 305  | Use Proxy                       | 使用代理。所请求的资源必须通过代理访问                       |
| 306  | Unused                          | 已经被废弃的HTTP状态码                                       |
| 307  | Temporary Redirect              | 临时重定向。与302类似。使用GET请求重定向                     |
|      |                                 |                                                              |
| 400  | Bad Request                     | 客户端请求的语法错误，服务器无法理解                         |
| 401  | Unauthorized                    | 请求要求用户的身份认证                                       |
| 402  | Payment Required                | 保留，将来使用                                               |
| 403  | Forbidden                       | 服务器理解请求客户端的请求，但是拒绝执行此请求               |
| 404  | Not Found                       | 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面 |
| 405  | Method Not Allowed              | 客户端请求中的方法被禁止                                     |
| 406  | Not Acceptable                  | 服务器无法根据客户端请求的内容特性完成请求                   |
| 407  | Proxy Authentication Required   | 请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权 |
| 408  | Request Time-out                | 服务器等待客户端发送的请求时间过长，超时                     |
| 409  | Conflict                        | 服务器完成客户端的 PUT 请求时可能返回此代码，服务器处理请求时发生了冲突 |
| 410  | Gone                            | 客户端请求的资源已经不存在。410不同于404，如果资源以前有现在被永久删除了可使用410代码，网站设计人员可通过301代码指定资源的新位置 |
| 411  | Length Required                 | 服务器无法处理客户端发送的不带Content-Length的请求信息       |
| 412  | Precondition Failed             | 客户端请求信息的先决条件错误                                 |
| 413  | Request Entity Too Large        | 由于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个Retry-After的响应信息 |
| 414  | Request-URI Too Large           | 请求的URI过长（URI通常为网址），服务器无法处理               |
| 415  | Unsupported Media Type          | 服务器无法处理请求附带的媒体格式                             |
| 416  | Requested range not satisfiable | 客户端请求的范围无效                                         |
| 417  | Expectation Failed              | 服务器无法满足Expect的请求头信息                             |
|      |                                 |                                                              |
| 500  | Internal Server Error           | 服务器内部错误，无法完成请求                                 |
| 501  | Not Implemented                 | 服务器不支持请求的功能，无法完成请求                         |
| 502  | Bad Gateway                     | 作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应 |
| 503  | Service Unavailable             | 由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中 |
| 504  | Gateway Time-out                | 充当网关或代理的服务器，未及时从远端服务器获取请求           |
| 505  | HTTP Version not supported      | 服务器不支持请求的HTTP协议的版本，无法完成处理               |





















 