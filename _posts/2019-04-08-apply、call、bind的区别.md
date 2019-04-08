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