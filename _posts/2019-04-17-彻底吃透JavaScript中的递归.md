### 定义

所谓递归，是当一个函数调用自身，并且该调用做了同样的事情，这个循环持续到基本条件满足时，调用循环返回。<br>
警告： 如果你不能确保基本条件是递归的终结者，递归将会一直执行下去，并且会把你的项目损坏或锁死；恰当的基本条件十分重要！<br>

但是... 这个定义的书面形式太让人疑惑了。我们可以做的更好些。思考下这个递归函数：<br>

    function foo(x) {
        if (x < 5) return x;
        return foo( x / 2 );
    }

设想一下，如果我们调用 foo(16) 将会发生什么：<br>
    
![](https://i.imgur.com/7TIxvGT.png)

在 step 2 中, x / 2 的结果是 8， 这个结果以参数的形式传递到 foo(..) 并运行。同样的，在 step 3 中， x / 2 的结果是 4，这个结果以参数的形式传递到另一个 foo(..) 并运行。但愿我解释得足够直白。<br>

这里举一个更加形象的例子，那就是阶层运算:<br>

    function factorial(n){
        if(n===0){
            return 1; 
        }
        return n * factorial(n-1);
    }
    console.log(factorial(5));      // 120

在递归的例子中，从第一个调用factorial(5)开始，一直递归调用factorial函数自身直到参数的值为0。下面是一个形象的图例：<br>

![](https://i.imgur.com/i3CFsbV.png)<br>

我们再来一个质数判断的递归实例：<br>

	// 质数定义为在大于1的自然数中，除了1和它本身以外不再有其他因数。
	function isPrime(num,divisor = 2){
	    if (num < 2 || (num > 2 && num % divisor === 0)) {
	        return false;
	    }
	    if (divisor <= Math.sqrt( num )) {
	        return isPrime( num, divisor + 1 );
	    }
	
	    return true;
	}

	console.log(isPrime(1));    // flase
	console.log(isPrime(2));    // true
	console.log(isPrime(5));    // true
	console.log(isPrime(10));   // false

这个质数的判断主要是通过验证，从2到 num 的平方根之间的每个整数，看是否存在某一整数可以整除 num (% 求余结果为 0)。如果存在这样的整数，那么 num 不是质数。反之，是质数。divisor + 1 使用递归来遍历每个可能的 divisor 值。<br>