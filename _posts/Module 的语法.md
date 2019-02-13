#### 以下内容基本转载阮一峰老师的《ECMAScript 6 入门》： [http://es6.ruanyifeng.com/](http://es6.ruanyifeng.com/t "http://es6.ruanyifeng.com/")

**在HTML文件中不能使用export，import，需要在webpack构建项目中使用，并且只作用于.vue和.js文件。**<br>
**如果非要使用且浏览器支持ES6，需要加上 type="module"。**<br>


- 概述
- 严格模式
- export 命令
- import 命令
- 模块的整体加载
- export default 命令
- export 与 import 的复合写法
- 模块的继承
- 跨模块常量
- import()


### 1.概述
历史上，JavaScript 一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来。其他语言都有这项功能，比如 Ruby 的require、Python 的import，甚至就连 CSS 都有@import，但是 JavaScript 任何这方面的支持都没有，这对开发大型的、复杂的项目形成了巨大障碍。<br>

在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。<br>

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。<br>

    // CommonJS模块
    let { stat, exists, readFile } = require('fs');

    // 等同于
    let _fs = require('fs');
    let stat = _fs.stat;
    let exists = _fs.exists;
    let readfile = _fs.readfile;

上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。<br>

ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。<br>

    // ES6模块
    import { stat, exists, readFile } from 'fs';

上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。<br>

由于 ES6 模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。<br>

除了静态加载带来的各种好处，ES6 模块还有以下好处。<br>

不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。<br>
将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。<br>
不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。<br>
本章介绍 ES6 模块的语法，下一章介绍如何在浏览器和 Node 之中，加载 ES6 模块。<br>


### 2.严格模式
ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。<br>

严格模式主要有以下限制。<br>

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用with语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀 0 表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
- eval不会在它的外层作用域引入变量
- eval和arguments不能被重新赋值
- arguments不会自动反映函数参数的变化
- 不能使用arguments.callee
- 不能使用arguments.caller
- 禁止this指向全局对象
- 不能使用fn.caller和fn.arguments获取函数调用的堆栈
- 增加了保留字（比如protected、static和interface）

上面这些限制，模块都必须遵守。由于严格模式是 ES5 引入的，不属于 ES6，所以请参阅相关 ES5 书籍，本书不再详细介绍了。<br>

其中，尤其需要注意this的限制。ES6 模块之中，顶层的this指向undefined，即不应该在顶层代码使用this。<br>


### 3.export 命令
模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。<br>

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。下面是一个 JS 文件，里面使用export命令输出变量。<br>

    // profile.js
    export var firstName = 'Michael';
    export var lastName = 'Jackson';
    export var year = 1958;

上面代码是profile.js文件，保存了用户信息。ES6 将其视为一个模块，里面用export命令对外部输出了三个变量。<br>

export的写法，除了像上面这样，还有另外一种。<br>

    // profile.js
    var firstName = 'Michael';
    var lastName = 'Jackson';
    var year = 1958;

    export {firstName, lastName, year};

上面代码在export命令后面，使用大括号指定所要输出的一组变量。它与前一种写法（直接放置在var语句前）是等价的，但是应该优先考虑使用这种写法。因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量。<br>

export命令除了输出变量，还可以输出函数或类（class）。<br>

    export function multiply(x, y) {
        return x * y;
    };

上面代码对外输出一个函数multiply。<br>

通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名。<br>

    function v1() { ... }
    function v2() { ... }

    export {
        v1 as streamV1,
        v2 as streamV2,
        v2 as streamLatestVersion
    };

上面代码使用as关键字，重命名了函数v1和v2的对外接口。重命名后，v2可以用不同的名字输出两次。<br>

需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。<br>

    // 报错
    export 1;

    // 报错
    var m = 1;
    export m;

上面两种写法都会报错，因为没有提供对外的接口。第一种写法直接输出 1，第二种写法通过变量m，还是直接输出 1。1只是一个值，不是接口。正确的写法是下面这样。<br>

    // 写法一
    export var m = 1;

    // 写法二
    var m = 1;
    export {m};

    // 写法三
    var n = 1;
    export {n as m};

上面三种写法都是正确的，规定了对外的接口m。其他脚本可以通过这个接口，取到值1。它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系。<br>

同样的，function和class的输出，也必须遵守这样的写法。<br>

    // 报错
    function f() {}
    export f;

    // 正确
    export function f() {};

    // 正确
    function f() {}
    export {f};

另外，export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。<br>

    export var foo = 'bar';
    setTimeout(() => foo = 'baz', 500);

上面代码输出变量foo，值为bar，500 毫秒之后变成baz。<br>

这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新，详见下文《Module 的加载实现》一节。<br>

最后，export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，下一节的import命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。<br>

    function foo() {
        export default 'bar' // SyntaxError
    }
    foo()

上面代码中，export语句放在函数之中，结果报错。<br>


### 4.import 命令
使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块。<br>

    // main.js
    import {firstName, lastName, year} from './profile.js';

    function setName(element) {
        element.textContent = firstName + ' ' + lastName;
    }

上面代码的import命令，用于加载profile.js文件，并从中输入变量。import命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。<br>

如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。<br>

    import { lastName as surname } from './profile.js';

import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。<br>

    import {a} from './xxx.js'

    a = {}; // Syntax Error : 'a' is read-only;

上面代码中，脚本加载了变量a，对其重新赋值就会报错，因为a是一个只读的接口。但是，如果a是一个对象，改写a的属性是允许的。<br>

    import {a} from './xxx.js'

    a.foo = 'hello'; // 合法操作

上面代码中，a的属性可以成功改写，并且其他模块也可以读到改写后的值。不过，这种写法很难查错，建议凡是输入的变量，都当作完全只读，轻易不要改变它的属性。<br>

import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径，.js后缀可以省略。如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。<br>

    import {myMethod} from 'util';

上面代码中，util是模块文件名，由于不带有路径，必须通过配置，告诉引擎怎么取到这个模块。<br>

注意，import命令具有提升效果，会提升到整个模块的头部，首先执行。<br>

    foo();

    import { foo } from 'my_module';

上面的代码不会报错，因为import的执行早于foo的调用。这种行为的本质是，import命令是编译阶段执行的，在代码运行之前。<br>

由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。<br>

    // 报错
    import { 'f' + 'oo' } from 'my_module';

    // 报错
    let module = 'my_module';
    import { foo } from module;

    // 报错
    if (x === 1) {
        import { foo } from 'module1';
    } else {
        import { foo } from 'module2';
    }

上面三种写法都会报错，因为它们用到了表达式、变量和if结构。在静态分析阶段，这些语法都是没法得到值的。<br>

最后，import语句会执行所加载的模块，因此可以有下面的写法。<br>

    import 'lodash';

上面代码仅仅执行lodash模块，但是不输入任何值。<br>

如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。<br>

    import 'lodash';
    import 'lodash';

上面代码加载了两次lodash，但是只会执行一次。<br>

    import { foo } from 'my_module';
    import { bar } from 'my_module';

    // 等同于
    import { foo, bar } from 'my_module';

上面代码中，虽然foo和bar在两个语句中加载，但是它们对应的是同一个my_module实例。也就是说，import语句是 Singleton 模式。<br>

目前阶段，通过 Babel 转码，CommonJS 模块的require命令和 ES6 模块的import命令，可以写在同一个模块里面，但是最好不要这样做。因为import在静态解析阶段执行，所以它是一个模块之中最早执行的。下面的代码可能不会得到预期结果。<br>

    require('core-js/modules/es6.symbol');
    require('core-js/modules/es6.promise');
    import React from 'React';


### 5.模块的整体加载
除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。<br>

下面是一个circle.js文件，它输出两个方法area和circumference。<br>

    // circle.js

    export function area(radius) {
        return Math.PI * radius * radius;
    }

    export function circumference(radius) {
        return 2 * Math.PI * radius;
    }

现在，加载这个模块。<br>

    // main.js

    import { area, circumference } from './circle';

    console.log('圆面积：' + area(4));
    console.log('圆周长：' + circumference(14));

上面写法是逐一指定要加载的方法，整体加载的写法如下。<br>

    import * as circle from './circle';

    console.log('圆面积：' + circle.area(4));
    console.log('圆周长：' + circle.circumference(14));

注意，模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的。<br>

    import * as circle from './circle';

    // 下面两行都是不允许的
    circle.foo = 'hello';
    circle.area = function () {}; 