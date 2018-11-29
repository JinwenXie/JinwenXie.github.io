### 写在前面的话：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**javascript是单线程语言**<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**事件循环（Event Loop）是JavaScript的运行机制**<br/>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;其实我们在面试求职、日常的开发以及阅读JavaScript的相关资料时候，经常会遇到关于JavaScript执行机制的问题；比如，在一段代码中让你打印出输内容和顺序；了解JavaScript的执行机制，其实就是在深入研究JavaScript及其实际的工作原理；通过了解JavaScript的构建块以及它们如何一起协作的可以让我们能够编写更好的代码和应用。

### 一、为什么说JavaScript是单线程语言呢？
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？所以，为了避免冲突，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变。为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。

### 二、JavaScript任务设计
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们知道JavaScript语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。<br>
单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。显然，这样是很不合理的，所以JavaScript语言将任务设计成两类：<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**同步任务（synchronous）**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**异步任务（asynchronous）**<br>

同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；<br>
异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。比如当我们打开网站时，网页对页面骨架和页面元素等的渲染其实就是同步任务，而像加载服务器请求（ajax等）的任务，其实就是异步任务。

### 三、任务队列
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;任务队列是什么？故名思意，排着任务的队列。所谓任务是WebAPIs返回的一个个通知，让JS主线程在读取任务队列的时候得知这个异步任务已经完成，下一步该执行这个任务的回调函数了。主线程拥有多个任务队列，不同的任务队列用来排列来自不同任务源的任务。任务源是什么？像setTimeout/Promise/DOM事件等都是任务源，来自同类任务源的任务我们称它们是同源的，比如setTimeout与setInterval就是同源的。在ES6标准中任务队列又分为宏观任务队列和微观任务队列，我们后边再详细讨论。<br>

下面由下图我们先通俗的讲述一下ES5中事件循环到底是怎么循环的<br>
![](https://i.imgur.com/uoZLSEU.png)<br>

图中有三大块：<br>

**函数调用栈：**即执行栈。<br>
**WebAPIs：**浏览器的接口。比如一个Ajax操作，主线程会把收发Ajax交给浏览器的API，之后就继续做别的事情，浏览器在接收到Ajax返回的数据之后，会把一个Ajax完成的事件排到相应的任务队列后边。<br>
**任务队列们：**主线程中有多个任务队列，同源的任务排在属于自己的任务队列。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、主线程在遇到Ajax或是setTimeout这种异步操作时会交给浏览器的WebAPIs，然后继续执行后边的代码，直到最后执行栈为空。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、浏览器会在不确定的时间将完成的任务返回，排到相应的任务队列后。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、执行栈为空后，主线程会到任务队列中去取任务，这些任务会告诉下一步应该执行哪些回调函数。任务队列是具有优先级的，按照优先级决定访问的先后顺序。而优先级在不同的环境中会有所不同，所以不能给出一个固定的优先级。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、每访问一个队列，执行栈会执行完这个任务队列的所有的代码，然后再取下一个任务队列需要执行的的代码。如果在执行中遇到了当前属于任务队列的异步任务时。此次任务的返回不会直接排到当前任务队列之后。因为这属于两次不同的事件循环，会被区分开来。<br>
就这样循环执行，直到三大块全为空，这称为**事件循环（EventLoop）**。<br>

现在我们看一个具体点的例子：<br>

    let data = [];
    $.ajax({
		url:www.javascript.com,
    	data:data,
    	success:() => {
    		console.log('发送成功!');
    	}
    })
    console.log('代码执行结束');

上面是一段简易的ajax请求代码：<br>
- 1、主线程遇到ajax异步操作时将其交给浏览器的WebAPIs,并注册回调函数success；<br>
- 2、执行console.log('代码执行结束')。<br>
- 3、ajax事件完成，回调函数success进入任务队列。<br>
- 4、主线程从任务队列读取回调函数success并执行。<br>

### 四、宏观任务队列与微观任务队列
**ES6标准**中任务队列存在两种类型:<br>
**宏观任务(marcotask):**<br>
- setTimeout,setInterval<br>
- requestAnimationFrame<br>
- 解析HTML<br>
- 执行主线程js代码<br>
- 修改url<br>
- 页面加载<br>
- 用户交互<br>
**微观任务(mircotask):**<br>
- promise<br>
- mutation.oberver<br>
- process.nextTick<br>

ES6添加了微观任务队列之后在执行栈执行的过程中会把属于微观任务队列的任务分配到相应的微观任务队列中去。而在调用栈执行空之后，**主线程读取任务队列时，会先读取所有微观任务队列，然后读取一个宏观任务队列，再读取所有的微观任务队列**。如图：<br>
![]( http://www1.pconline.com.cn/gz20181115/best/images/img_5.png)<br>
现在我们再看一个例子：<br>

	setTimeout(function(){console.log(4)},0);
	new Promise(function(resolve){
		console.log(1)
		for( var i=0 ; i<10000 ; i++ ){
			i==9999 && resolve()
		}
		console.log(2)
	}).then(function(){
		console.log(5)
	});
	console.log(3);

1、脚本开始执行，最先遇到setTimeout，交给浏览器去计时，达到setTimeout限制最短计时之后，把这个任务推入setTimeout队列。<br>
2、遇到Promise构造函数，构造函数参数执行，输出1，调用resolve改变Promise对象的状态，然后输出2。<br>
3、Promise对象调用then方法，将这个任务推入Promise任务队列。<br>
4、执行console.log(3)，输出3。<br>
5、调用栈为空，读取任务队列，按照<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;读取所有微观任务队列 -> 执行 -><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;读取一个宏观任务队列 -> 执行 -><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;读取所有微观任务队列 -> 执行 -><br>
再读取一个宏观任务队列...的顺序。<br>
6、读取所有微观任务队列中的任务，执行这些任务指定的回调函数。执行then指定的回调函数，输出5（微观任务队列也具有优先级）。<br>
7、最后读取到setTimeout的任务，执行回调函数，输出4。<br>
所以最后的输出顺序是1,2,3,5,4，而不是1,2,3,4,5。如果不清楚微观任务队列的执行机制，很容易将两个异步任务归为一类，将执行顺序判断错误。

### 五、setTimeout与setInterval
setTimeout用的地方多了，问题也出现了，有时候明明写的延时3秒，实际却5，6秒才执行,可以看下面这个例子：<br/>

	let a = 0;
	setTimeout(() => {
		console.log('开始执行');
	},3000)
	add(1000000)
	function add(len){
		for(let i=0; i<len; i++){
			a += i;
		}
	}

在chrome执行一下，却发现控制台执行console.log('开始执行')需要的时间远远超过3秒,这时候我们需要重新理解setTimeout的定义。<br/>
我们先说上述代码是怎么执行的：<br/>

1、脚本开始执行，最遇到setTimeout，交给浏览器去计时，达到setTimeout限制最短计时之后，把这个任务推入setTimeout队列；<br/>
2、执行add(1000000)函数，一直在循环累加中，很慢，非常慢，计时仍在继续。<br/>
3、setTimeout计时已经达到，但是主线程add函数仍在继续执行，所以继续在任务队列中等待；<br/>
4、add函数终于执行完，执行console.log('开始执行')<br/>

我们能够经常遇到setTimeout(fn,0)这样的代码，0秒后执行又是什么意思是指定某个任务在主线程最早可得的空闲时间执行，意思就是不用再等多少秒了，只要主线程执行栈内的同步任务全部执行完成，栈为空就马上执行fn函数<br/>

所以关于**setTimeout即便主线程为空，0毫秒实际上也是达不到的。根据HTML的标准，最低是4毫秒**。<br/>

我们知道setInterval其实是和setTimeout差不多一样的。只不过setTimeout执行一次，对于执行顺序来说，setInterval是循环执行的；<br/>
setInterval会每隔指定的时间将注册的函数置入任务队列，如果前面的任务耗时太久，那么同样需要等待。<br/>
唯一需要注意的一点是，对于setInterval(fn,ms)来说，我们已经知道不是每过ms秒会执行一次fn，而是每过ms秒，会有fn进入任务队列。一旦**setInterval的回调函数fn执行时间超过了延迟时间ms，那么就完全看不出来有时间间隔了**。<br/>

这里有一段比较较复杂的代码，可以测试你是否掌握了js的执行机制：<br/>

    console.log('1');
				
	setTimeout(function() {
		console.log('2');
		process.nextTick(function() {
			console.log('3');
		})
		new Promise(function(resolve) {
			console.log('4');
			resolve();
		}).then(function() {
			console.log('5')
		})
	})

	process.nextTick(function() {
		console.log('6');
	})
	new Promise(function(resolve) {
		console.log('7');
		resolve();
	}).then(function() {
		console.log('8')
	})

	setTimeout(function() {
		console.log('9');
		process.nextTick(function() {
			console.log('10');
		})
		new Promise(function(resolve) {
			console.log('11');
			resolve();
		}).then(function() {
			console.log('12')
		})
	})

**输出为1，7，6，8，2，4，3，5，9，11，10，12**<br/>