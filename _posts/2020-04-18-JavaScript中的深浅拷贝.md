JS 中的数据类型分为两种，基本数据类型和引用数据类型，基本数据类型是保存在栈的数据结构中的,是按值访问，所以不存在深浅拷贝问题。<br>
而比如对象，数组，函数，正则，时间对象这些都是引用数据类型，是保存在堆中的。所以，引用数据类型的复制，是内存地址的传递，并没有拷贝出一份新的数据。<br>
**操作拷贝之后的数据不会影响到原数据的值拷贝，就是深拷贝，反正，有影响则为浅拷贝。**

### 浅拷贝
思路很简单，遍历对象，然后把属性和属性值都放在一个新的对象就OK了<br>
	
	// 浅拷贝
	let obj = {
		name: 'xiejinwen',
		age: 26,
		family: {
		  son: 'gavin'
		}
	}
	
	function shallowCopy(obj) {
		if (typeof obj != 'object') return
		// instanceof 判断一个实例是否属于某种类型
		let newObj = obj instanceof Array ? [] : {}
		for (let key in obj) {
		  // hasOwnProperty 这个方法会查找一个对象是否有某个属性，但是不会去查找它的原型链。
		  if (obj.hasOwnProperty(key)) {
		    newObj[key] = obj[key]
		  }
		}
		return newObj
	}

	let newShallowObj = shallowCopy(obj)
	newShallowObj.name = 'gavin'
	newShallowObj.sex.value = '女'

	console.log(newShallowObj)

		// obj = {
		//   name: 'gavin', // 改变
		//   age: 26,
		//   sex: {
		//     value: '女' // 改变
		//   }
		// }
	
	console.log(obj)

		// obj = {
		//   name: 'xiejinwen', // 第一层属性是有遍历的，所以没有改变
		//   age: 26,
		//   sex: {
		//     value: '女' // 第二层属性是没有遍历的，所以随着newShallowObj.sex.value的改变而改变
		//   }
		// }


从上述代码中，我们能够得出浅拷贝不是直接赋值，浅拷贝新建了一个对象，然后将源对象的属性都一一复制过来,复制的是值，而不是引用。<br>
我们知道，对象都是按地址引用进行访问的，浅拷贝的复制只复制了第一层的属性，并没有递归将所有的值复制过来，所以，操作拷贝数据，对原数据产生了影响，故而为浅拷贝。<br>
其实，那些直接返回原数组的方法可以简单实现数组和对象浅拷贝。<br>

	// 1、 数组浅拷贝 - slice
	function shallowCopy(obj) {
	    return obj.slice();
	}
	
	// 2、 数组浅拷贝 - concat
	function shallowCopy(obj){
	    return obj.concat();
	}
	
	// 3、 数组浅拷贝 - 遍历
	function shallowCopy(obj){
	  var result = [];
	  for(var i = 0; i < obj.length; i++) {
	    result.push(obj[i]);
	  }
	  return result;
	}
	
	
	// 4、 对象浅拷贝 - Object.assign
	function shallowCopy(obj) {
	    return Object.assign({},obj)
	}


### 深拷贝
思路也很简单，就是在拷贝的时候判断一下属性值的类型，如果是对象，就递归调用深浅拷贝函数就ok了<br>

	let obj = {
	  name: 'xiejinwen',
	  age: 26,
	  sex: {
	    value: '男'
	  }
	}
	
	function deepCopy(obj) {
	  if (typeof obj != 'object') return
	  let newObj = obj instanceof Array ? [] : {}
	  for (let key in obj) {
	    if (obj.hasOwnProperty(key)) {
		  // 如果是对象，就递归调用深浅拷贝函数	
	      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
	    }
	  }
	  return newObj
	}
	
	let newDeepObj = deepCopy(obj)
	newDeepObj.name = 'gavin'
	newDeepObj.sex.value = '女'
	
	console.log(newDeepObj)
	
	  // obj = {
	  //   name: 'gavin', // 改变
	  //   age: 26,
	  //   sex: {
	  //     value: '女' // 改变
	  //   }
	  // }
	
	console.log(obj)
	
	  // obj = {
	  //   name: 'xiejinwen', // 第一层属性是有遍历的，所以没有改变
	  //   age: 26,
	  //   sex: {
	  //     value: '男' // 第二层属性有递归遍历，所以随着newShallowObj.sex.value的改变也不会改变
	  //   }
	  // }