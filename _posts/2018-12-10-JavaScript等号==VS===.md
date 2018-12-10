##### Javascript中用于相等比较的操作符有两个==和===。==我们通常称为“等于”，而===我们通常称为“严格等于”。

### ===
===首先要求比较双方类型相同, 还要求比较双方值相等。 如果比较的双方是都是对象类型，只有指向同一个对象，才能严格相等。<br>

	console.log( 1 === 1 );                             // true
    console.log( true === true; );                      // true
    console.log( 'string' === 'string' );               // true
    console.log( null === null );                       // true
    console.log( undefined === undefined );             // true

    // 类型相同且为对象类型，必须是指向同一个的对象才严格相等
    console.log( {name:"obj"} !== {name: "obj"} );      // false  两个不同的{name:"obj"}对象
    console.log( null === undefined );                  // false 类型不同，不严格相等
    console.log( false === 0 );                         // false 类型不同，不严格相等
    console.log( 1 === "1" );                           // false 类型不同，不严格相等

### ==
==在进行比较时，如果比较的双方数据类型不同，通常会先转换成相同的类型再进行比较。如果比较的双方类型相同，这时与===相同：如果比较的双方是对象类型，只有指向同一个对象，才能相等;如果是其他类型，比较值是否相等。<br>

- Number类型与boolean类型，比较前先将Boolean转换为数值。
- Number类型与字符串类型，比较前先将字符串转换为数值
- Number类型与undefined类型，结果为 false
- Number类型与null类型，结果为 false
- 如果两个都是字符串，比较字符序列
- 如果两个都是对象，比较的是对象的引用地址
- null和undefined在比较的时候不会转换成其他类型。null只和undefined相等。
- NaN与任何值（包括NaN）比较结果都为false

**隐式类型转换优先转换成Number型**<br>

    console.log( '99' == 99 );  //  true  "99"转换成Number型为99
    console.log( "" == 0 );     //  true  ""转换成Number型为0
    console.log( true == 1 );   //  true  true转换成Number型为1
    console.log( false == "0" );    //  true  false转换成Number型，等于 Number(false)，等于0, "0"转换成Number型，等于Number("0"), 等于0, 值相等
    console.log( '\n\n\n' == false );   // true   Number(' \n\n\n')等于0, Number(false)等于0, 值相等

**null和undefined在比较的时候不会转换成其他类型。null只和undefined相等。**<br>

	console.log( null == undefined );           // true  null/undefined比较时不会做隐式类型转换
	console.log( 0 != null );                   // true 
	console.log( "undefined" != undefined );    // true 
	console.log( null != false );               // true 

### 总结
==和===的异同点：<br>

- 比较双方都是对象时，只有指向同一个对象才会相等(包含==/===)。
- ===要求比较双方类型相同并且值相等。
- ==在比较双方类型不同的时候通常会进行隐式类型转换。

易于记忆的==比较的原则：<br>

- null==undefined, null/undefined不进行隐式类型转换。
- 进行隐式类型或转换时，优先转换成Number型。
