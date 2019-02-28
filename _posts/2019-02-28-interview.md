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

