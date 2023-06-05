# VUE

### Why vue.js

> 声明式渲染：模板语法，数据和页面直接关联，可读性强

> 响应式：单项绑定，双向绑定

不需要手动操作 dom, 简化开发， 轻量



### VUE 对象

```javascript
new Vue({
	el：'#root',
    data:{}
})
```

**el**: 使用 css表达式绑定一个容器，只有在这个容器使用 VUE 才能生效

**data**: vue 中管理的数据，data中的数据可以再容器中使用



### 插值语法 

```VUE
<div id="demo">
	<h1>Hello，{{name.toUpperCase()}}，{{address}}</h1>
</div>
```

固定的双括号格式 `{{ }}`，里面可以写 js表达式

js表达式：一个表达式，并且产生一个值



### 模版语法

`v-bind`

简写 `:`

```vue
<a v-bind:href="school.url.toUpperCase()" x="hello">点我去{{school.name}}学习1</a>
<a :href="school.url" x="hello">点我去{{school.name}}学习2</a>
```

**插值语法 vs 指令语法**

1. 插值语法用于解析标签体内容

2. 指定语法用于解析标签属性，绑定事件，标签体内容等，都以 `v-` 开头



### 数据绑定

单项绑定： `v-bind`

双向绑定：`v-model`

单项绑定时 `data` 改变，html模板跟这边，html模板中的值改变 `data` 中的值不会改变

双向绑定是，无论哪边变化，两边都跟着变化

**双向绑定多用于表单上，即有输入，又有输出的地方**

```vue
<div id="root">
			<!-- 普通写法 -->
			<!-- 单向数据绑定：<input type="text" v-bind:value="name"><br/>
			双向数据绑定：<input type="text" v-model:value="name"><br/> -->

			<!-- 简写 -->
			单向数据绑定：<input type="text" :value="name"><br/>
			双向数据绑定：<input type="text" v-model="name"><br/>

			<!-- 如下代码是错误的，因为v-model只能应用在表单类元素（输入类元素）上 -->
			<!-- <h2 v-model:x="name">你好啊</h2> -->
</div>
```

 

## el 和 data 写法

`el` 声明式、挂载式

`data` 对象式、函数式



### MVVM 模型

**M - Model**	data中的数据

**V - View**	模版代码

**VM - View Model**	VUE实例

data 中的所有实例都被绑定在 vm 实例中

vm 中的所有实例，包括 vm 原型上的所有属性，都可以在模版中直接使用



### 数据代理

VUE 通过代理 `data` 中的数据，将代理数据与模版值进行绑定，从而实现单项绑定和双向绑定的效果

核心工具

```vue
Object.defineProperty
```

使用上面的方法代理 data 中的数据，访问VM中的代理数据的时候返回 data 中的数据，修改VM中的代理数据的时候直接修改 data 中的数据，从而实现双向绑定

单项绑定仅需要在修改VM中的代理数据的时候不操作 data 中的数据即可



### 事件处理

#### 事件的基本使用

1.使用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名；

2.事件的回调需要配置在methods对象中，最终会在vm上；

3.methods中配置的函数，不要用箭头函数！否则this就不是vm了；

4.methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象；

5.@click="demo" 和 @click="demo($event)" 效果一致，但后者可以传参；



#### 事件修饰符

Vue中的事件修饰符：

1.prevent：阻止默认事件（常用）；

 2.stop：阻止事件冒泡（常用）；

3.once：事件只触发一次（常用）；

4.capture：使用事件的捕获模式；

5.self：只有event.target是当前操作的元素时才触发事件；

6.passive：事件的默认行为立即执行，无需等待事件回调执行完毕；

```vue
<!-- 阻止默认事件（常用） -->
<a href="http://www.atguigu.com" @click.prevent="showInfo">点我提示信息</a>
```



#### 键盘事件

`@keydown.xxx`

1.Vue中常用的按键别名：

​              回车 => enter

​              删除 => delete (捕获“删除”和“退格”键)

​              退出 => esc

​              空格 => space

​              换行 => tab (特殊，必须配合keydown去使用)

​              上 => up

​              下 => down

​              左 => left

​              右 => right

2.Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名）

3.系统修饰键（用法特殊）：ctrl、alt、shift、meta

​	(1).配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。

​	(2).配合keydown使用：正常触发事件。

4.也可以使用keyCode去指定具体的按键（不推荐）

5.Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名



### 计算属性

1.定义：要用的属性不存在，要通过已有属性计算得来。

2.原理：底层借助了Objcet.defineproperty方法提供的getter和setter。

3.get函数什么时候执行？

​	(1).初次读取时会执行一次。

​	(2).当依赖的数据发生改变时会被再次调用。

4.优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便。

5.备注：

​	1.计算属性最终会出现在vm上，直接读取使用即可。

​	2.如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变。

```vue
			computed:{
				//完整写法
				/* fullName:{
					get(){
						console.log('get被调用了')
						return this.firstName + '-' + this.lastName
					},
					set(value){
						console.log('set',value)
						const arr = value.split('-')
						this.firstName = arr[0]
						this.lastName = arr[1]
					}
				} */
				//简写
				fullName(){
					console.log('get被调用了')
					return this.firstName + '-' + this.lastName
				}
			}
```



### 监视属性

```vue
watch:{
	isHot:{
		deep: true, // 是否深度监视
		immediate： true, // 初始化的是否调用一下 handler 方法
		handler(newValue,oldValue){
			console.log('isHot被修改了',newValue,oldValue)
		}
	}
	// 简写
	isHot(newValue,oldValue){
			console.log('isHot被修改了',newValue,oldValue)
	}
}
```

**computed和watch之间的区别：**

​	1.computed能完成的功能，watch都可以完成。

​	2.watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作。

**两个重要的小原则：**

​	1.所被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或 组件实例对象。

​	2.所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成箭头函数，这样this的指向才是vm 或 组件实例对象。



### 绑定样式

绑定样式：

1. class样式

   写法:class="xxx" xxx可以是字符串、对象、数组。

   字符串写法适用于：类名不确定，要动态获取。

   数组写法适用于：要绑定多个样式，个数不确定，名字也不确定。

   对象写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用，例如 `{'classA':true,'classB':false}`

2. style样式

   :style="{fontSize: xxx}"其中xxx是动态值。

   :style="[a,b]"其中a、b是样式对象。



### 条件渲染

1.v-if

写法：

​	(1).v-if="表达式" 

​	(2).v-else-if="表达式"

​	(3).v-else="表达式"

适用于：切换频率较低的场景。

特点：不展示的DOM元素直接被移除。

注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”。

2.v-show

写法：v-show="表达式"

适用于：切换频率较高的场景。

特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉

3.备注：使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到。



### 列表渲染

1. 遍历数组 `v-for = (item,index) of persons` item = 单个对象，index=下标
2. 遍历对象 `v-for = (value,key) of personObjs`
3. 遍历字符串 `v-for = (char,index) of str`
4. 指定遍历次数 `v-for = (number,index) of 5`