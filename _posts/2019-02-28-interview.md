# JS
## 1.内置类型
JS 中分为七种内置类型，七种内置类型又分为两大类型：基本类型和对象（Object）。<br>

基本类型有六种： null，undefined，boolean，number，string，symbol。<br>

其中 JS 的数字类型是浮点类型的，没有整型。并且浮点类型基于 IEEE 754标准实现，在使用中会遇到某些 Bug。NaN 也属于 number 类型，并且 **NaN 不等于自身**。<br>

对于基本类型来说，如果使用字面量的方式，那么这个变量只是个字面量，只有在必要的时候才会转换为对应的类型<br>

    let a = 111 // 这只是字面量，不是 number 类型
    a.toString() // 使用时候才会转换为对象类型

对象（Object）是引用类型，在使用过程中会遇到浅拷贝和深拷贝的问题。<br>

    let a = { name: 'FE' }
    let b = a
    b.name = 'EF'
    console.log(a.name) // EF 

## 2.Typeof
typeof 对于基本类型，除了 null 都可以显示正确的类型<br>

    typeof 1 // 'number'
    typeof '1' // 'string'
    typeof undefined // 'undefined'
    typeof true // 'boolean'
    typeof Symbol() // 'symbol'
    typeof b // b 没有声明，但是还会显示 undefined

typeof 对于对象，除了函数都会显示 object<br>

    typeof [] // 'object'
    typeof {} // 'object'
    typeof console.log // 'function'

对于 null 来说，虽然它是基本类型，但是会显示 object，这是一个存在很久了的 Bug<br>

    typeof null // 'object'

PS：为什么会出现这种情况呢？因为在 JS 的最初版本中，使用的是 32 位系统，为了性能考虑使用低位存储了变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。<br>

如果我们想获得一个变量的正确类型，可以通过 Object.prototype.toString.call(xx)。这样我们就可以获得类似 [object Type] 的字符串。<br>

    let a
    // 我们也可以这样判断 undefined
    a === undefined
    // 但是 undefined 不是保留字，能够在低版本浏览器被赋值
    let undefined = 1
    // 这样判断就会出错
    // 所以可以用下面的方式来判断，并且代码量更少
    // 因为 void 后面随便跟上一个组成表达式
    // 返回就是 undefined
    a === void 0

## 2.类型转换
### a.转Boolean
在条件判断时，除了 undefined， null， false， NaN， ''， 0， -0，其他所有值都转为 true，包括所有对象。<br>

### b.对象转基本类型
对象在转换基本类型时，首先会调用 valueOf 然后调用 toString。并且这两个方法你是可以重写的。<br>

    let a = {
        valueOf() {
            return 0
        }
    }

当然你也可以重写 Symbol.toPrimitive ，该方法在转基本类型时调用优先级最高。<br>

    let a = {
        valueOf() {
            return 0;
        },
        toString() {
            return '1';
        },
        [Symbol.toPrimitive]() {
            return 2;
        }
    }
    1 + a // => 3
    '1' + a // => '12'

### c.四则运算符
只有当加法运算时，其中一方是字符串类型，就会把另一个也转为字符串类型。其他运算只要其中一方是数字，那么另一方就转为数字。并且加法运算会触发三种类型转换：将值转换为原始值，转换为数字，转换为字符串。<br>

    1 + '1' // '11'
    2 * '2' // 4
    [1, 2] + [2, 1] // '1,22,1'
    // [1, 2].toString() -> '1,2'
    // [2, 1].toString() -> '2,1'
    // '1,2' + '2,1' = '1,22,1'

对于加号需要注意这个表达式 'a' + + 'b'<br>

    'a' + + 'b' // -> "aNaN"
    // 因为 + 'b' -> NaN
    // 你也许在一些代码中看到过 + '1' -> 1

### d.== 操作符
![](https://i.imgur.com/BFiMHJg.png)<br>

上图中的 toPrimitive 就是对象转基本类型。<br>

这里来解析一道题目 [] == ![] // -> true ，下面是这个表达式为何为 true 的步骤<br>

    // [] 转成 true，然后取反变成 false
    [] == false
    // 根据第 8 条得出
    [] == ToNumber(false)
    [] == 0
    // 根据第 10 条得出
    ToPrimitive([]) == 0
    // [].toString() -> ''
    '' == 0
    // 根据第 6 条得出
    0 == 0 // -> true