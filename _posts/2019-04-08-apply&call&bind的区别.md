### call、apply、bind的作用是改变函数运行时this的指向

	let a = {
		name: 'gavin',
		fn1: function() {
			console.log(this.name);
		},
		fn2: function() {
			setTimeout(function() {
				this.fn1();
			}.call(a), 100);
		},
		fn3: function() {
			setTimeout(function() {
				this.fn1();
			}.apply(a), 100);
		},
		fn4: function() {
			setTimeout(function() {
				this.fn1();
			}.bind(a)(),100);
		}
	}
	a.fn2();
	a.fn3();
	a.fn4();


### apply 和 call 的区别是call方法接受的是若干个参数列表，而apply接收的是一个包含多个参数的数组


	let a = {
		fn: function(a, b) {
			console.log(a + b);
		}
	}

	let b = a.fn;
	b.apply(a, [1,2]);
	b.call(a, 1, 2);

### bind 和 apply、call 区别
#### bind()方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。
我们可以看出，bind 是创建一个新的函数，我们必须要手动去调用<br>

	let a = {
		fn: function(a, b) {
			console.log(a + b);
		}
	}

	let b = a.fn;
	b.bind(a,1,2)();

### 应用：
#### 1、求数组中的最大、最小值

	let arr = [1,2,3];
	console.log(Math.max.apply(Math, arr));
	console.log(Math.min.apply(Math, arr));

#### 2、利用call和apply做继承

	var Person = function(name) {
		this.name = name;
	};
	var Girl = function(name) {
		Person.call(this, name);
	};
	var Boy = function(name) {
		Person.apply(this, name);
	}
	var g1 = new Girl('qing');
			var b1 = new Boy('qianlong');