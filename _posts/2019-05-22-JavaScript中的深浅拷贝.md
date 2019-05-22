### 1.函数防抖和函数节流
##### 函数防抖：
debounce-函数防抖：将一个弹簧按下，继续加压，继续按下，只会在最后放手的一瞬反弹。即我们希望函数只会调用一次，即使在这之前反复调用它，最终也只会调用一次而已。<br>

某些代码不可以在没有间断的情况下连续重复执行。第一次调用函数，创建一个定时器，在指定的时间间隔之后运行代码。当第二次调用该函数时，它会清除前一次的定时器并设置另一个。如果前一个定时器已经执行过了，这个操作(清除定时器)就没有任何意义。然而，如果前一个定时器尚未执行，其实就是将其替换为一个新的定时器。目的是只有在执行函数的请求停止了一段时间之后才执行。<br>

	 function debounce(fn, delay) {
	    let timer = null;
	    return function () {
	      if (timer) clearTimeout(timer);
	      timer = setTimeout(() => {
	        fn.apply(this, arguments);
	      }, delay || 500);
	    }
	  }


##### 函数节流：
一个水龙头在滴水，可能一次性会滴很多滴，但是我们只希望它每隔 500ms 滴一滴水，保持这个频率。即我们希望函数在以一个可以接受的频率重复调用。<br>

	 function throttle(fn, cycle) {
        let timer, now, start = Date.now();
        return function () {
          now = Date.now();
          clearTimeout(timer);
          if (now - start >= cycle) {
            fn.apply(this, arguments);
            start = now;
          } else {
            timer = setTimeout(() => {
              fn.apply(this, arguments);
            }, cycle);
          }
        }
      }


### 2.手写一个v-module方法?

	  // html
      <input type="text" id="ipt" />
      <div id="box"></div>

      // js
      let oIpt = document.querySelector('#Jipt');
      let oBox = document.querySelector('#Jbox');
      let obj = {};

      /**
      * Object.defineProperty(obj, prop, descriptor)
      * obj: 被定义或修改属性的对象
      * prop: 要定义或修改的属性名称
      * descriptor: 对属性的描述
      */

      Object.defineProperty(obj, 'name', {
        get: function() {
          return val;
        },
        set: function(newVal) {
          oIpt.value = newVal;
          oBox.innerHTML = newVal;
        }
      });
      oIpt.addEventListener('input', event => {
        obj.name = event.target.value;
      });
      obj.name = 'xiejinwen';

### 3.如何实现数组的随机排序？

    let arr = [1,2,3,4,5,6,7,8,9,10];
    function randomSort(arr) {
	  if (!arr) return false;	
      for(let i=0, len=arr.length; i<len; i++) {
        let index = parseInt(Math.random() * len);
        let temp = arr[index];
        arr[index] = arr[i];
        arr[i] = temp;
      }
      return arr;
    }
    console.log(randomSort(arr))


###   4.递归
递归就是自己调自己，递归在前端里面算是一种比较常用的算法。假设现在有一堆数据要处理，要实现上一次请求完成了，才能去调下一个请求。但是有时候并不想引入Promise，能简单处理先简单处理。这个时候就可以用递归，如下代码所示：<br>

    let ids = [34112, 98325, 68125];
    (function sendRequest() {
      let id = ids.shift();
      if (id) {
        // 加入ajax请求
        console.log(1);
        sendRequest();
      } else {
        console.log('finished');
      }
    })();

##### 用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值
    
	let arr = [];
    function randomNum() {
      return Math.floor(Math.random() * 31 + 2);
    }
    function randomArr(arr, num) {
      if (arr.length >= 5) return arr;
      if (!arr.includes(num)) arr.push(num);
      return randomArr(arr, randomNum()); 
    }
    randomArr(arr, randomNum());
    console.log(arr); 


### 5.冒泡排序
冒泡排序的原理如下，从第一个元素开始，把当前元素和下一个索引元素进行比较。如果当前元素大，那么就交换位置，重复操作直到比较到最后一个元素，那么此时最后一个元素就是该数组中最大的数。下一轮重复以上操作，但是此时最后一个元素已经是最大数了，所以不需要再比较最后一个元素，只需要比较到 length - 1 的位置。<br>

	  let arr = [5,8,9,7,6,3,2,1,10,4];
	  function bubble(arr) {
	    if (!arr) return false;
	    for (let i = arr.length - 1; i > 0; i--) {
	      // 从 0 到 `length - 1` 遍历
	      for (let j = 0; j < i; j++) {
	        if (arr[j] > arr[j + 1]) {
	          let temp = arr[j + 1];
	          arr[j + 1] = arr[j];
	          arr[j] = temp;
	        }
	      }
	    }
	    return arr;
	  }
	  console.log(bubble(arr));

### 6、图片懒加载（监听滚动事件以及使用函数节流的方法）
将页面中的img标签src指向一张小图片或者src为空，然后定义data-src（这个属性可以自定义命名，我才用data-src）属性指向真实的图片。src指向一张默认的图片，否则当src为空时也会向服务器发送一次请求。可以指向loading的地址。<br>
当载入页面时，先把可视区域内的img标签的data-src属性值负给src，然后监听滚动事件，把用户即将看到的图片加载。这样便实现了懒加载。<br>
        
    // 简单的节流函数
    //fun 要执行的函数
    //delay 延迟
    //time  在time时间内必须执行一次
    function throttle(fn, delay, time) {
      let timer;
      let curTime;
      let startTime = new Date();

      return function() {
        curTime = new Date();
        clearTimeout(timer);
        if (curTime - startTime >= time) { // 如果达到了规定的触发时间间隔，触发 handler
          fn.apply(this, arguments);
          startTime = curTime;
        } else { // 没达到触发间隔，重新设定定时器
          timer = setTimeout(() => {
            fn.apply(this, arguments);
          }, delay || 500); 
        }
      };
    };
    // 实际想绑定在 scroll 事件上的 handler
    function lazyload(event) {
      for (var i = n; i < imgNum; i++) {
        if (img.eq(i).offset().top < parseInt($(window).height()) + parseInt($(window).scrollTop())) {
          if (img.eq(i).attr("src") == "default.jpg") {
            var src = img.eq(i).attr("data-src");
            img.eq(i).attr("src", src);
            n = i + 1;
          }
        }
      }
    }
    // 采用了节流函数
    window.addEventListener('scroll',throttle(lazyload,500,1000));

### 7.写一个方法去掉字符串中的空格
方法一：<br>

	  let str = ' abc de  g ';
	  function trim(str) {
	    if (!str || str.length <= 0 || (typeof str != 'string')) return false;
	    let reg = /\s+/g;
	    str = str.replace(reg,'');
	    return str;
	  }
	  console.log(trim(str)); 

方法二：<br>

	  function trimString(str) {
	    if (!str || str.length <= 0 || (typeof str != 'string')) return false;
	    let arr = str.split('');
	    arr = arr.filter(item => {
	      return item != ' ';
	    });
	    return arr.join('');
	  }
	  console.log(trimString(str));

### 8.获取url地址上的参数
	
	   /**
	    *   window.location.search // ?id=123554&name=xiejinwen
	    *   window.location.search.substr(1) // id=123554&name=xiejinwen
	    *   ^	匹配字符串的开始
	    *   $	匹配字符串的结束
	    *   [^&]* 表示匹配字符直到遇到 & 符号为止
	    *   ([^&]*) 表示捕获匹配到的结果
	    *   unescape() 函数可对通过 escape() 编码的字符串进行解码。
	    */
	
	    function getUrlAgt(agtName) {
	      if (!agtName) return false;
	      let reg = new RegExp('(^|&)' + agtName + '=([^&]*)(&|$)');
	      let arr = window.location.search.substr(1).match(reg);
	      if (arr) return unescape(arr[2]);
	      return false;
	    }
	    console.log(getUrlAgt('id'));

### 9.数组去重

      let arr = [1,2,3,3,4,5,4,5,6,7,8,4,7,9]
      function reviewSort(arr) {
        if (!arr) return false
        let newArr = []
        for (let i = 0, len = arr.length; i < len; i++) {
          if (!newArr.includes(arr[i])) newArr.push(arr[i])
        }
        return newArr
      }
      console.log(reviewSort(arr))
  