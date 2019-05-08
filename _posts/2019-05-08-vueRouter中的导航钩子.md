### vue-router 的导航钩子，主要用来作用是拦截导航，让他完成跳转或取消。
有三种方式可以植入路由导航过程中：

- 全局的
- 单个路由独享的
- 组件级的

#### 全局导航钩子
全局导航钩子主要有两种钩子：前置守卫、后置钩子<br>

注册一个全局前置守卫：<br>

	const router = new VueRouter({ ... });
	router.beforeEach((to, from, next) => {
	    // do someting
	});

这三个参数 to 、from 、next 分别的作用：<br>

- to: Route，代表要进入的目标，它是一个路由对象
- from: Route，代表当前正要离开的路由，同样也是一个路由对象
- next: Function，这是一个必须需要调用的方法，而具体的执行效果则依赖 next 方法调用的参数


		next()：进入管道中的下一个钩子，如果全部的钩子执行完了，则导航的状态就是 confirmed（确认的）
		next(false)：这代表中断掉当前的导航，即 to 代表的路由对象不会进入，被中断，此时该表 URL 地址会被重置到 from 路由对应的地址
		next(‘/’) 和 next({path: ‘/’})：在中断掉当前导航的同时，跳转到一个不同的地址
		next(error)：如果传入参数是一个 Error 实例，那么导航被终止的同时会将错误传递给 router.onError() 注册过的回调

**注意：next 方法必须要调用，否则钩子函数无法 resolved**

对于全局后置钩子：<br>

	router.afterEach((to, from) => {
	    // do someting
	});

不同于前置守卫，后置钩子并没有 next 函数，也不会改变导航本身<br>

#### 路由独享的钩子

顾名思义，即单个路由独享的导航钩子，它是在路由配置上直接进行定义的：

	cont router = new VueRouter({
	    routes: [
	        {
	            path: '/file',
	            component: File,
	            beforeEnter: (to, from ,next) => {
	                // do someting
	            }
	        }
	    ]
	});

至于他的参数的使用，和全局前置守卫是一样的<br>

#### 组建内的导航钩子

组件内的导航钩子主要有这三种：**beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave。**他们是直接在路由组件内部直接进行定义的<br>

我们看一下他的具体用法：<br>

	const File = {
	    template: `<div>This is file</div>`,
	    beforeRouteEnter(to, from, next) {
	        // do someting
	        // 在渲染该组件的对应路由被 confirm 前调用
	    },
	    beforeRouteUpdate(to, from, next) {
	        // do someting
	        // 在当前路由改变，但是依然渲染该组件是调用
	    },
	    beforeRouteLeave(to, from ,next) {
	        // do someting
	        // 导航离开该组件的对应路由时被调用
	    }
	}

需要注意是：<br>

**beforeRouteEnter 不能获取组件实例 this，因为当守卫执行前，组件实例被没有被创建出来，剩下两个钩子则可以正常获取组件实例 this**

但是并不意味着在 beforeRouteEnter 中无法访问组件实例，我们可以通过给 next 传入一个回调来访问组件实例。在导航被确认是，会执行这个回调，这时就可以访问组件实例了，如：<br>

	beforeRouteEnter(to, from, next) {
	    next (vm => {
	        // 这里通过 vm 来访问组件实例解决了没有 this 的问题
	    })
	}

注意，仅仅是 beforRouteEnter 支持给 next 传递回调，其他两个并不支持。因为归根结底，支持回调是为了解决 this 问题，而其他两个钩子的 this 可以正确访问到组件实例，所有没有必要使用回调<br>

最后是完整的导航解析流程：<br>

1. 导航被触发
1. 在失活的组件里调用离开守卫
1. 调用全局的 beforeEach 守卫
1. 在重用的组件里调用 beforeRouteUpdate 守卫
1. 在路由配置里调用 beforEnter
1. 解析异步路由组件
1. 在被激活的组件里调用 beforeRouteEnter
1. 调用全局的 beforeResolve 守卫
1. 导航被确认
1. 调用全局的 afterEach 钩子
1. 触发 DOM 更新
1. 在创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数
