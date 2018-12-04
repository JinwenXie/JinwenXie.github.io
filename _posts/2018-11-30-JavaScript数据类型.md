**基本数据类型:** 是指非对象并且无方法的数据。在JavaScript中，共有6种基本数据类型：**string，number，boolean，null，undefined，symbol** (ECMAScript 2015新增)。<br/>
**引用数据类型：**对象(Object)、数组(Array)、函数(Function)。<br/>

大多数时候，基本类型的值直接代表语言实现的最底层，所有的基本类型都是不可改变的（即不能被改变）。<br/>

### typeof 运算符
鉴于 JavaScript 是松散类型的，因此需要有一种手段来检测给定变量的数据类型，typeof 就是负责提供这方面信息的运算符。对一个值使用 
typeof 运算符可能返回下列某个字符串：<br/>

- "undefined"，如果这个值未声明或已声明但未初始化。
- "boolean"，如果这个值是布尔值。
- "string"，如果这个值是字符串。
- "number"，如果这个值是数值。
- "object"，如果这个值是对象或 null。
- "function"，如果这个值是函数。

**值得注意的是：**<br/>
**typeof null 结果是 "object"**，这是历史遗留 Bug，在 ECMAScript 6中，曾经有提案为历史平反, 将 type null 的值纠正为 "null"，但最后该提案被拒。理由是历史遗留代码太多，不如继续将错就错。
现在，**null 被认为是对象的占位符**，从而解释了这一矛盾，但从技术上来说，它仍然是原始值。

### undefined类型:
Undefined 类型只有1个值，即 undefined。**使用 var/let 声明变量但未对其加以初始化时，这个变量的值就是 undefined**，直接使用未声明的变量会产生错误。对未声明或已声明但未初始化的变量执行 typeof 运算符会返回 "undefined" 值，例如：

    let message;// 这个变量声明之后默认取得了 undefined 值
    // let age  // 这个变量并没有声明
    
    console.log(message);   // "undefined"
    console.log(age);   // 产生错误
    console.log(typeof message);// "undefined"
    console.log(typeof age);// "undefined"

### Null 类型
Null 类型只有一个专用值 null，即它的字面量。值 undefined 实际上是从值 null 派生来的，因此 ECMAScript 把它们定义为相等的。<br/>

    alert(null == undefined);  //输出 "true"

尽管这两个值相等，但它们的含义不同。**undefined 是声明了变量但未对其初始化时赋予该变量的值，null 则用于表示尚未存在的对象**。如果函数或方法要返回的是对象，那么找不到该对象时，返回的通常是 null。<br/>

**下列场景中应当使用 null：**

- 用来初始化一个变量，这个变量可能赋值为一个对象。
- 用来和一个已经初始化的变量比较，这个变量可以是也可以不是一个对象。
- 当函数的参数期望是对象时，作用参数传入。
- 当函数的返回值期望是对象时，作用返回值传出。

**在下列场景中不应当使用 null：**

- 不要使用 null 来检测是否传入了某个参数。
- 不要使用 null 来检测一个未初始化的变量。

### Boolean 类型
Boolean 类型是 JavaScript 中使用得最多的一种类型，**该类型只有两个字面值：true 和 false**。需要注意的是，他们是区分大小写的，也就是说 True 和 False（以及其他的混合大小写形式）都不是 Boolean 值，只是标识符。<br/>
虽然 Boolean 类型的字面值只有两个，但 JavaScript 中所有类型的值都能使用 if 语句或 Boolean() 函数转换为对应的 Boolean 值，例如：<br/>

    let msg = "Hello world!";
    if(msg){
    	console.log("true");  // 被执行
    }
    let msgBoolean = Boolean(msg);
    console.log(msgBoolean);  // true

下表给出了各种数据类型及其对应的转换规则：<br/>
![](https://i.imgur.com/ZQhWxEL.png)<br/>

### Number 类型
Number 类型是 JavaScript 中最令人关注的数据类型，这种类型既可以表示 32 位的整数，还可以表示 64 位的浮点数。和其他编程语言不同，JavaScript 中的所有数字均用浮点数值表示。

##### 整数
在**JavaScript中进行算术计算时，所有以八进制和十六进制表示的数值最终都将被转换成十进制数值**。例如：<br/>

    let a = 10; // 十进制
    let b = 023;// 八进制
    let c = 0x12ac; // 十六进制
    console.log(b); // 19
    console.log(c); // 4780

**八进制第一位必须是0，后面跟八进制序列0到7**，如果超出了范围，则忽略前导0，后面的数值当做十进制解析，例如：089会被解析为89。（八进制字面量在严格模式下是无效的，会抛出错误。）<br/>
**十六进制前两位必须是0x或0X，后跟十六进制序列0~9、a~f（不区分大小写）**，如果超出了范围，则会报语法错误。<br/>

##### 浮点数
所谓浮点数值，就是该数值中必须包含一个小数点，并且小数点后面必须至少有一位数字。虽然小数点前面可以没有整数，但我们不推荐这种写法。例如：<br/>

	let a = 1.1;
	let b = 0.1;
	let c = .1;     // 有效，但不推荐

JavaScript会不失时机的将浮点数转换成整数。例如：<br/>

    let a = 5.;      // 解析成整数5
    let b = 5.0;     // 解析成整数5
    
对于**极大或者极小的数值，可采用科学技术法（也称e表示法）**。JavaScript 会将那些小数点后面带有6个零以上的小于1的浮点数值转换为以e表示法表示的数值。例如：<br/>

    let a = 3.14e7;             // 等于31400000
    let b = 3.14E-7;            // 等于0.000000314
    console.log(0.0000003);     // 3e-7
    
浮点数值的最高精度是17位小数，但在进行算术计算时其精确度远远不如整数，例如：<br/>

    console.log(0.1 + 0.2);     // 0.30000000000000004
    
    这个舍入误差会导致无法测试特定的浮点数值，因此，永远不要测试某个特定的浮点数值


##### 特殊的 Number 值
几个特殊值也被定义为 Number 类型:<br/>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Number.MAX_VALUE(最大值)**<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Number.MIN_VALUE(最小值)**<br/>

它们定义了 Number 值集合的外边界，所有 **ECMAScript 数都必须在这两个值之间**。不过计算生成的数值结果可以不落在这两个值之间。<br/>

当计算生成的数大于 Number.MAX_VALUE 时，它将被赋予值 Number.POSITIVE_INFINITY，意味着不再有数字值。同样，生成的数值小于 Number.MIN_VALUE 的计算也会被赋予值 Number.NEGATIVE_INFINITY，也意味着不再有数字值。如果计算返回的是无穷大值，那么生成的结果不能再用于其他计算。<br/>

事实上，有专门的值表示无穷大，即 Infinity。<br/>

    Number.POSITIVE_INFINITY = Infinity;
    Number.NEGATIVE_INFINITY = -Infinity;

由于无穷大数可以是正数也可以是负数，所以可用一个方法判断一个数是否是有穷的（而不是单独测试每个无穷数）。可以对任何数调用 isFinite() 方法，以确保该数不是无穷大。例如：<br/>
	
	console.log(isFinite(100));         // true
	console.log(isFinite(Infinity));    // false

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**NaN**<br/>

表示非数（Not a Number）。NaN 是个奇怪的特殊值。一般说来，这种情况发生在类型（String、Boolean 等）转换失败时。例如，要把单词 blue 转换成数值就会失败，因为没有与之等价的数值。之所以称它为「非数值」，是因为它不能参与算数运算，**任何涉及 NaN 的操作都返回 NaN。并且 NaN 与任何值都不相等（包括自身）**。例如：<br/>

    console.log(typeof NaN);      // "number"

    console.log(0 / 0);                 // NaN
    console.log(NaN - NaN);             // NaN
    console.log(Infinity - Infinity);   // NaN

出于这个原因，不推荐使用 NaN 值本身。函数 isNaN() 会做得相当好：<br/>

    console.log(isNaN("blue"));  //输出 "true"
    console.log(isNaN("666"));  //输出 "false"


### String 类型
String 类型的独特之处在于，它是唯一没有固定大小的原始类型。可以用字符串存储 0 或更多的16位 Unicode 字符组成的字符序列。<br/>

字符串中每个字符都有特定的位置，首字符从位置 0 开始，第二个字符在位置 1，依此类推。这意味着字符串中的最后一个字符的位置一定是字符串的长度减 1：<br/>
![](https://i.imgur.com/qN5fjNB.png)<br/>

**字符串字面量是由双引号（"）或单引号（'）声明的**。而 Java 则是用双引号声明字符串，用单引号声明字符。但是由于 ECMAScript 没有字符类型，所以可使用这两种表示法中的任何一种。例如，下面的两行代码都有效：<br/>

    let sColor1 = "red";
    let sColor2 = 'red';

下面列出了 ECMAScript 的字符字面量：<br/>

![](https://i.imgur.com/dlmvH1Z.png)<br/>

### Object 类型
JavaScript 中所有对象都继承自 Object 类型，每个对象都具有下列基本的属性和方法：

- constructor：保存着用于创建当前对象的函数（构造函数）。
- hasOwnProperty()：用于检查给定的属性在当前对象实例中是否存在。
- propertyIsEnumerable()：用于检查给定的属性是否能够使用for-in语句来枚举。
- isPrototypeOf()：用于检查对象是否是传入对象的原型。
- toString() 方法：返回对象的字符串表示。
- toLocaleString()：返回对象的本地字符串表示。
- valueOf()：返回对象的字符串、数值或布尔值表示（通常与toString()方法的返回值相同）。

 Object 本质上是由一组无序的名值对组成，「名称」部分是一个 JavaScript 字符串，「值」部分可以是任何 JavaScript 的数据类型（包括对象和方法）。这使用户可以根据具体需求，创建出相当复杂的数据结构。<br/>
以下两种方法都可以创建一个空对象，这两种方法在语义上是相同的。第二种更方便的方法叫作**「对象字面量」**法。这也是 JSON 格式的核心语法，一般我们优先选择第二种方法。例如：<br/>

    let obj = new Object();
    let obj = {};   // 好的写法
    
「对象字面量」也可以用来在对象实例中定义一个对象：<br/>

    let obj = {
        name: "Tom",
        details: {
            "age": 2,
            "color": "black"
        }
    }
    
对象的属性可以通过链式（chain）表示方法进行访问：<br/>

    obj.details.color;       // black
    obj["details"]["age"];  // 2
    
完成创建后，对象属性可以通过如下两种方式进行赋值和访问<br/>

    obj.name = "Gavin"      // 赋值
    let name = obj.name;    // 访问

    obj["name"] = "Gavin";  // 赋值
    let name = obj["name"]; // 访问

### 总结： 
**基本数据类型: 是指非对象并且无方法的数据。在JavaScript中，共有6种基本数据类型：string，number，boolean，null，undefined，symbol (ES6新增)。**<br/>
**引用数据类型：对象(Object)。**<br/>

#### 值得注意的是：<br/>
1、 **值 undefined 实际上是从值 null 派生来的，因此 ECMAScript 把它们定义为相等的。
undefined 是声明了变量但未对其初始化时赋予该变量的值，null 则用于表示尚未存在的对象。如果函数或方法要返回的是对象，那么找不到该对象时，返回的通常是 null。**<br/>

    console.log(null == undefined);  // true

2、**typeof null 结果是 "object"**，这是历史遗留 Bug<br/>

    console.log(typeof null);  // object

3、**Number 类型是 JavaScript 中最令人关注的数据类型，这种类型既可以表示 32 位的整数，还可以表示 64 位的浮点数。和其他编程语言不同，JavaScript 中的所有数字均用浮点数值表示**

4、number类型中有一个特殊值： **NaN**<br>
**任何涉及 NaN 的操作都返回 NaN。并且 NaN 与任何值都不相等（包括自身）**<br>

    console.log(typeof NaN);            // "number"

    console.log(0 / 0);                 // NaN
    console.log(NaN - NaN);             // NaN

    console.log(NaN === NaN);           // false

出于这个原因，不推荐使用 NaN 值本身。**函数 isNaN()** 会做得相当好：<br>

    console.log(isNaN("blue"));        // true
    console.log(isNaN("666"));         // false

最后附上一张JavaScript数据类型结构图：<br>
![](https://i.imgur.com/QQqfIKA.png)