### 1.函数防抖和函数节流
#### 函数防抖：
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


#### 函数节流：
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