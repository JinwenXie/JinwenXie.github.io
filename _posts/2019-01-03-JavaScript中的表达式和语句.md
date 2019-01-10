#### 引子：表达式和语句很基础，但是有时会犯错，比如：

    function(){}//报错
    (function(){})//不报错
    function f(x){ return x + 1 }()//报错
    function f(x){ return x + 1 }(1)//不报错，为什么返回 1

能明白为什么？<br>

解释：<br>

- 第一行代码：因为JavaScript将function关键字当作一个函数声明语句的开始，而函数声明语句function关键字后面应该是函数名，这里后面跟圆括号，当然会报错。
- 第二行代码：给它加上一对圆括号，解析器会把()里的当做表达式去解析，在这里就会当做匿名函数表达式解析，所以不会报错。
- 第三行代码：在一条语句后面加上()会被当做分组操作符，分组操作符里必须要有表达式，所以这里报错；
- 第四行代码：在一条函数声明语句后面加上(1)，仅仅是相当于在声明语句之后又跟了一条毫无关系的表达式，等价于下面代码：<br>

		function f(x){ return x + 1 }
	    (1)     //1

所以返回了无关紧要的答案；

### 1.语句和表达式
JavaScript对语句（statements）和表达式（expressions）有十分明确的划分。一个表达式返回一个值，可以在任何需要值的地方使用表达式，例如：作为函数调用时使用的参数。以下每一行都包含一个表达式：<br>

    myvar
    3 + x
    myfunc("a", "b")

我们可以粗略的将一个语句描述为一个行为，循环结构和if语句就是语句的例子。程序基本上是一系列语句的结合（基础声明除外）。无论何时，当JavaScript需要编写一条语句时，均可以写入一个表达式。这样的语句称为表达式语句（expression statement）。但是反之并不成立，你不能编写一条语句来代替表达式。例如：if语句不能成为函数的参数。<br>

### 2.相似的语句和表达式
为了加深对语句和表达式之间区别的理解，我们来举几个表达式和语句十分相似的例子。<br>

##### 2.1. if语句和条件运算符（conditional operator）<br>
下面是一个if语句的例子：<br>

    var x;
    if (y >= 0) {
        x = y;
    } else {
        x = -y;
    }

与表达式类似的是条件运算符。上述语句可用以下语句代替：<br>

    var x = (y >= 0 ? y : -y);

注意：**等号和分号之间的代码是一个表达式**。括号不是必要的，括号是为了使代码更加清晰易懂。<br>

##### 2.2.分号（semicolon）与逗号运算符（comma operator）
**在JavaScript中，分号用来连接不同的语句**：<br>
    
    foo(); bar();

**逗号运算符计算两个表达式的值并返回第二个表达式的值**。如下所示：（chrome调试器里直接运行代码）<br>

    > "a", "b"
    'b'
    
    > var x = ("a", "b");
    > x
    'b'
    
    > console.log(("a", "b"));.
    b

### 3.与语句类似的表达式
一些表达式看上去和语句十分相似，我们将在本节最后讨论这个问题。<br>

##### 3.1.1.对象字面量（object literal）和块状作用域（block）
下面的例子显示了一个对象字面量：<br>

    {
        foo: bar(3, 5)
    }

但是，上述代码同样也是一个合法的语句！上述例子由以下几个部分组成：<br>

- 代码块：花括号中的一系列语句；
- 标签：你可以在任意语句前添加标签，这里的标签是foo；
- 语句：表达式语句bar(3,5)；
    
{}可用于定义作用域或对象字面量，究竟代表什么取决于下列WAT（？）：<br>

	// 在看这个奇怪的范例之前，让我们先看看一些JavaScript的行为
    // 当我们把非数字相加时
    > 1 + 'string'
    '1string'

    > 1 + undefined
    NaN

    > 1 + null
    1

    > 1 + [2,3,]
    "12,3"

    > 1 + {name: 'andyyou'}
    "1[object Object]"

    // 上面范例得知，除了undefined和null，基本上js会把对象先`toString()`在相加

    > [].toString()
    ""

    > [1, 2, 3].toString()
    "1,2,3"

    > var o = {};
    > o.toString();
    "[object Object]"

    // 有了上面的基础知识后，让我们来看看这令人吓尿的行为

    > [] + {}
    "[object Object]"

    // 好！上面代码如我们所料，[] ===> "" 加上 {} ===> "[object Object]"

    // 先问你们个问题: + 两边的运算元能不能互换而结果不变
    // 你可能回答: 是！！！
    // 但....

    > {} + []
    0

上述代码显示了一个很奇怪的现象，众所周知，加号运算符两侧的语句应当是可交换的，但为何这两个语句输出了不同的结果呢？关键在于第二个语句，第二个语句相当于一个代码块{}，后面加上一个[],相当于：<br>

    > + []
    0

JavaScript允许一个块状作用域既不充当循环也不充当if语句的一部分而独立存在。下面的代码演示了这样一个例子，你可以通过标签命名块状作用域，并在合适的时机跳出这个作用域，返回到上层作用域中：<br>

    function test(printTwo) {
        printing: {
            console.log("One");
            if (!printTwo) break printing;
            console.log("Two");
        }
        console.log("Three");
    }

    > test(false)
        One
        Three
    > test(true)
        One
        Two
        Three

从上面验证了{}的语法如果遇到statements的位置，就会被当成statements，而如果在expressions的位置就会被当解析成一个值。<br>

    > {} + [];
    // 就是一个最好的例子，{} 被当作 statement 就是一个 block

    // 如果換成

    > var x = {};
    // 那他就是一个 expression 代表一个值 - 一个对象

##### 3.2.函数表达式（function expression）与函数声明（function declaration）
如下是一个函数声明：<br>

    function () { }

当然，你也可以为这个表达式加上一个名字，将它变成命名后的函数表达式：<br>

    function foo() { }    

在当作function expression时上面的function名称foo只存在function内部能使用，举例来说像是一个递归。<br>
你可能困惑了，我们到底在说啥？看看下面的例子，我们要说的是当function放在statements和expressions不同位置时的差异(放在=右边是expression)<br>

    var fn = function me(x) { return x <= 1 ? 1 : x * me(x-1)} // 等号右边是一个 expression 的位置
    fn(10); // 3628800

    console.log(me); // ReferenceError: me is not defined

具名的function expression和函数声明的写法看起来是没有区别的。但实际上这两者的效果截然不同，function expression产生一个值(一个function)。函数声明则产生一个行为，即建立一个变数，然后它的值是一个function。而且只有function expression可以被立即调用，函数声明不行。<br>

从上面这几点看来能够区分expression 和statement 挺重要的。<br>

### 4.使用对象字面量和函数表达式作为语句

我们已经看到，有些表达式和语句无法区分开，这意味着相同的代码由于其上下文环境不同，作用也是不同的。但是，表达式语句却将表达式写在了语句的上下文之中。为了避免歧义，JavaScript语法禁止表达式语句以大括号和关键字function开始。<br>
换句话说就是在javascript认定为statement的位置，使用了expression会变成expression statement。这并不是expression，所以产生一些特殊的状况{}会被当作block解释，function开头的语法会被当作函数定义。<br>

	ExpressionStatement :
    [lookahead ∉ {"{", "function"}]Expression ;

那么，如果你想写一个以这两个标记中的任何一个开始的表达式语句，你该怎么做？你可以把它放在括号里面，它不会改变它的结果，但确保它出现在只有表达式的上下文中。我们来看两个例子：eval并立即调用函数表达式。<br>

##### 4.1.eval
eval在语句上下文中解析它所收到的参数。如果你想让eval返回一个对象，则必须在对象字面量周围加上括号。<br>

    > eval("{ foo: 123 }")
    123
    > eval("({ foo: 123 })")
    { foo: 123 }

