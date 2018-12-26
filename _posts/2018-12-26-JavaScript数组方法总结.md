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