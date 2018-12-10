毫无疑问，JavaScript数据类型的判断在我们日常开发中是必不可免的，小到基本的数据类型，大到各种引用数据类型，都是需要我们掌握的知识点；现在就记录下自己对于JavaScript各种数据类型的检测方法；<br>

我们都知道找JavaScript中，共有6种基本数据类型：**string，number，boolean，null，undefined，symbol (ES6引入的第6种原始类)。而引用类型只有一种对象(Object)**。实际上，Object 中还包含了其它更为具体的引用类型，如 Array、Function、Date、RegExp、Error、Arguments 等。<br>

通常用来检测数据类型的方法，分别是** typeof 和 Object.prototype.toString**，让我们仔细来看看这两个方法。<br>

### typeof
**typeof 操作符返回一个字符串，表示未经计算的操作数的类型。**<br>
其使用方式是 typeof operand 或 typeof(operand)，operand 是一个表达式，表示对象或原始值，其类型将被返回，返回值是表示其数据类型的字符串的小写形式。<br>
那么让我们直接来看一下上述的 13 种数据类型使用 typeof 来检测后返回值分别是什么：<br>

	let undefi = undefined;
    let nul = null;
    let str = "string";
    let bool = true;
    let num = 3;
    let symbol = Symbol();

    let obj = {};
    let arr = [1,2,3];
    let fun = function(){};
    let reg = /a/g;
    let date = new Date();
    let error = new Error();
    let arg;
    (function getArg(){
        arg=arguments;
    })();
    
    console,log(typeof undefi);        // undefined
    console,log(typeof nul);           // object
    console,log(typeof str);           // string
    console,log(typeof bool);          // boolean
    console,log(typeof num);           // number
    console,log(typeof symbol);        // symbol

    console,log(typeof obj);           // object
    console,log(typeof arr);           // object
    console,log(typeof fun);           // function
    console,log(typeof reg);           // object
    console,log(typeof date);          // object
    console,log(typeof error);         // object
    console,log(typeof arg);           // object

可以看到，使用 typeof 方法来检测数据类型，基本类型大部分都能被准确检测并返回正确的字符串（除了 **Null 类型，其返回 object 字符串**），而引用类型大部分都不能够被准确检测（除了 Function 类型能够准确返回 function 字符串外，其它的都返回了 object 字符串）。<br>
 由此可得，typeof 方法并不能够完全精准地检测出上述 JavaScript 中的 13 中数据类型。<br>

### Object.prototype.toString
对于null、array、function、object来说，使用typeof都会统一返回object字符串。<br>
要想区分对象、数组、函数、单纯使用typeof是不行的。在JS中，可以通过Object.prototype.toString方法，判断某个对象之属于哪种内置类型。<br>
**Object.prototype.toString 返回形式为 [object,class] 的字符串**，class 指代的是其检测出的数据类型，这个是我们判断数据类型的关键。<br>

同样的，让我们来看下使用 Object.prototype.toString 来检测上述列举到的 13 种数据类型都会返回什么样的结果：<br>

	let toString = Object.prototype.toString;

    console.log(toString.call(undefi));       // [object Undefined]
    console.log(toString.call(nul));          // [object Null]
    console.log(toString.call(str));          // [object String]
    console.log(toString.call(bool));         // [object Boolean]
    console.log(toString.call(num));          // [object Number]
    console.log(toString.call(symbol));       // [object Symbol]

    console.log(toString.call(obj));          // [object Object]
    console.log(toString.call(arr));          // [object Array]
    console.log(toString.call(fun));          // [object Function]
    console.log(toString.call(reg));          // [object RegExp]
    console.log(toString.call(date));         // [object Date]
    console.log(toString.call(error));        // [object Error]
    console.log(toString.call(arg));          // [object Arguments]

可以看到，Object.prototype.toString 返回的 [object,class] 字符串中，class 准确的表示了各个数据的类型，与 typeof 不同的是，class 所代表的数据类型字符串首字母是大写的，而不像 typeof 返回的是小写字符串。<br>

### 数据类型检测方法封装
通过上述对两个检测数据类型方法的介绍，我们知道 typeof 能够被用来检测除 Null 类型外的其它基本类型，并且能够检测出引用类型中 Function 数据类型，而 Object.prototype.toString 能够检测出所有的数据类型，所以我们可以结合这两个方法来实现一个 JavaScript 数据类型检测的封装方法。<br>

	/**
    * @desc 数据类型检测
    * @param obj 待检测的数据
    * @return {String} 类型字符串
    * @toLowerCase() 方法用于把字符串转换为小写。
    */
    
    function type(obj) {
        return typeof obj !== "object" ? typeof obj : Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    }

补充一个在面试中经常遇到的问题：**如何判断一个数组？**
有以下几种方法：<br>

	console.log( Array.isArray(arr) ); // true
    console.log( arr instanceof Array );// instanceof 操作符判断
    console.log( arr.constructor === Array );// 对象构造函数的 constructor判断
    console.log( Object.prototype.toString.call(arr).slice(8,-1).toLowerCase() === "array" );
    console.log( Object.prototype.isPrototypeOf(arr) ); // Array 原型链上的 isPrototypeOf
    console.log( Object.getPrototypeOf(arr) === Array.prototype ); // Object.getPrototypeOf() 方法返回指定对象的原型与Array的原型比较
