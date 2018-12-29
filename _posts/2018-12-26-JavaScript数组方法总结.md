### JavaScript中提供了多种数组方法，如下：

- 转换方法—toLocaleString()方法、toString()方法、valueOf()方法
- 栈方法——push()方法、pop()方法
- 队列方法——shift()方法、unshift()方法
- 重排序方法——reverse()方法、sort()方法
- 操作方法——concat()方法、slice()方法、splice()方法
- 位置方法——indexOf()方法、lastIndexOf()方法
- 迭代方法——every()方法、filter()方法、forEach()方法、map()方法、some()方法
- 归并方法——reduce()方法、reduceRight()方法

#### 转换方法：

- **toString()**方法返回由数组中每个值的字符串形式拼接并且以逗号相隔的字符串
- **valueOf()** 方法返回 Array 对象的原始值。该原始值由 Array 对象派生的所有对象继承。通常由 JavaScript 在后台自动调用，并不显式地出现在代码中。
- **toLocaleString()**方法也会返回一个数组值以逗号相隔的字符串，但与toString()方法不同的是在返回日期对象时格式不同。

具体看一下列子：

    let names = ["Jinwen", "xiejinwen","Gavin"];

    console.log(names.toString());          // Jinwen,xiejinwen,Gavin
    console.log(names.valueOf());           // ["Jinwen", "xiejinwen", "Gavin"]
    console.log(names.toLocaleString());    // Jinwen,xiejinwen,Gavin

    // toLocaleString()方法在返回日期对象时格式不同
    let date = new Date();

    console.log(date.toString());           // Wed Dec 26 2018 16:34:23 GMT+0800 (中国标准时间)
    console.log(date.toLocaleString());     // 2018/12/26 下午4:34:23


#### 栈方法：

- **push()**方法可以接受任意数量的参数，逐个添加到数组末尾，返回修改后数组的长度
- **pop()**方法从数组末尾移除最后一项，返回被移除的项

具体看下面例子：

    let names = ["Jinwen"];
    let name_1 = "xiejinwen";
    let name_2 = "Gavin";
    let namesCount = names.push(name_1, name_2);
    
    console.log(names);                     // ["Jinwen", "xiejinwen", "Gavin"]
    console.log("count: " + namesCount);    // count: 3
    console.log(names.pop());               // Gavin    


#### 队列方法：

- **shift()**方法移除数组的第一项并返回该项
- **unshift()**方法在数组前端添加任意项，并返回新数组的长度

具体看一下例子：

	let names = ["Jinwen", "xiejinwen"];
	let name = "Gavin";
	let namesCount = names.unshift(name);
	
	console.log(names);                         // ["Gavin", "Jinwen", "xiejinwen"]
	console.log("count: " + namesCount);        // count: 3
	console.log(names.shift());                 // Gavin   


**由栈方法跟队列方法可知，在这两种方法中添加数组项的方法返回新数组的长度，移除数组项的方法返回被移除项**


#### 重排序方法:

- **reverse()方法** 用于反向列表中元素,没有返回值，但是会对列表的元素进行反向排序。
- **sort()方法** 用于对数组的元素进行排序, 改方法接收一个函数作为参数，如果没有参数的话**按照字符编码的顺序进行排序**;

具体看下例子：

    let names = ["Jinwen", "Gavin", "xiejinwen"];
    let nums = [3, 4, 8, 9, 7, 6, 20, 1, 5];

    console.log(names.reverse());                       // ["xiejinwen", "Gavin", "Jinwen"]
    console.log(nums.reverse());                        // [5, 1, 2, 6, 7, 9, 8, 4, 3]

    console.log(names.sort());                          // ["Gavin", "xiejinwen", "Jinwen"]
    console.log(nums.sort());                           // [1, 20, 3, 4, 5, 6, 7, 8, 9]

    // 由上面输出，很明显nums数组的排序并不正确，这是因为sort()方法如果没有传入参数，是按字符编码的顺序进行排序的；
    // 这时我们传入一个函数试试

    let sortNums = function(a,b){
        return a - b;
    }
    console.log(nums.sort(sortNums));                   // [1, 3, 4, 5, 6, 7, 8, 9, 20]


####操作方法：

- **concat()方法** 用于连接两个或多个数组。返回一个新的数组。该数组是通过把所有参数添加到数组中生成的。如果要进行 concat() 操作的参数是数组，那么添加的是数组中的元素，而不是数组。
- **slice()方法** 可从已有的数组中返回选定的元素。arrayObject.slice(start,end)返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。
- **splice()方法** 从数组中删除项目或向数组中添加元素。**该方法会改变原始数组。**

具体看下例子

	// concat()
	
	let names = ["Jinwen"];
	let name_1 = ["Gavin"];
	let name_2 = ["xiejinwen"];
	
	console.log(names.concat("xjw"));                   // ["Jinwen", "xjw"]
	console.log(names.concat(name_1));                  // ["Jinwen", "Gavin"]
	console.log(names.concat("xjw",name_1,name_2));     // ["Jinwen", "xjw", "Gavin", "xiejinwen"]

<br>

    // slice(start,end)
    // start必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。
    // end可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。

    let names = ["Jinwen", "xjw", "Gavin", "xiejinwen"];

    console.log(names.slice(2));        // ["Gavin", "xiejinwen"]
    console.log(names.slice(-1));       // ["xiejinwen"]
    console.log(names.slice(0,2));      // ["Jinwen", "xjw"]
    console.log(names.slice(0,-1));     // ["Jinwen", "xjw", "Gavin"]
<br>

	// .splice(index,howmany,item1,.....,itemX)
    // index	必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
    // howmany	必需。要删除的项目数量。如果设置为 0，则不会删除项目。
    // item1, ..., itemX	可选。向数组添加的新项目。

    const names = ["Jinwen", "Gavin", "xiejinwen"];

    // 删除
    console.log(names.splice(0,1));             // ["Jinwen"]
    console.log(names);                         // ["Gavin", "xiejinwen"]
    // 添加
    names.splice(0,0,"Jinwen");
    console.log(names);                         // ["Jinwen", "Gavin", "xiejinwen"]
    // 添加多个
    names.splice(0,0,"Jinwen1", "Jinwen2");     // ["Jinwen1", "Jinwen2", "Jinwen", "Gavin", "xiejinwen"]
    console.log(names);
    // 替换
    names.splice(4,1,"xjw");
    console.log(names);                         // ["Jinwen1", "Jinwen2", "Jinwen", "Gavin", "xjw"]


#### 位置方法:

- **indexOf()方法** 从开头（索引为0）的位置往后查找数组元素的位置，返回数组元素的索引或-1
- **lastIndexOf()方法** 从末尾开始向前查找数组元素的位置，返回数组元素的索引或-1

具体看下列例子：
                          
    // indexOf()方法跟lastIndexOf()方法都接受两个参数，要查找的项跟从数组什么位置查起
    // 在比较第一个参数与数组中的每一项时是使用全等操作符进行严格比较的，若没有找到则返回-1。

    let names = ["Jinwen", "Gavin", "xiejinwen", "xjw"];

    console.log(names.indexOf("Gavin"));                // 1
    console.log(names.indexOf("zhangsan"));             // -1
    console.log(names.indexOf("Gavin",0))               // 1
    console.log(names.indexOf("Gavin",3))               // -1

    console.log(names.lastIndexOf("Gavin"));                // 1
    console.log(names.lastIndexOf("zhangsan"));             // -1
    console.log(names.lastIndexOf("Gavin",0))               // -1
    console.log(names.lastIndexOf("Gavin",3))               // 1

#### 迭代方法：

ECMAScript 5为数组定义了五个迭代方法，每种方法接受两个参数，要在每一项上运行的函数跟运行该函数的作用对象--影响this的值（可选），而传入这些方法的函数要接收三个参数：数组项的值，该项在数组中的位置和数组对象本身。

- forEach()方法对数组中的每一项运行给定的函数，没有返回值。
- every()方法对数组中的每一项运行给定的函数，如果该函数对一项都返回true，则返回true。（相当于逻辑与）
- filter()方法对数组中的每一项运行给定的函数，返回该函数会返回true的项组成的数组。
- map()方法对数组中的每一项运行给定的函数，返回每次函数调用的结果组成的数组。
- some()方法对数组中的每一项运行给定的函数，如果该函数对一项返回true，则返回true。（相当于逻辑或）

具体看下列例子：
    
    // forEach() 让数组中的每一项做一件事
    let nums = [1, 2, 3, 4, 5];
    nums.forEach(function(item,index){
    	console.log(item);  // 1, 2, 3, 4, 5
    });

![](https://i.imgur.com/Vx11MVP.png)


