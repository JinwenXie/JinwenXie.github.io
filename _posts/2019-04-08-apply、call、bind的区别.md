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