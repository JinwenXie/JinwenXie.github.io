### 知识储备

- Math.ceil();  //向上取整。
- Math.floor();  //向下取整。
- Math.round();  //四舍五入。
- Math.random();  //0.0 ~ 1.0 之间的一个伪随机数。【包含0不包含1】 //比如0.8647578968666494
- Math.ceil(Math.random()*10);      // 获取从1到10的随机整数 ，取0的概率极小。
- Math.round(Math.random());   //可均衡获取0到1的随机整数。
- Math.floor(Math.random()*10);  //可均衡获取0到9的随机整数。
- Math.round(Math.random()*10);  //基本均衡获取0到10的随机整数，其中获取最小值0和最大值10的几率少一半。
            
因为结果在0~0.4 为0，0.5到1.4为1...8.5到9.4为9，9.5到9.9为10。所以头尾的分布区间只有其他数字的一半。

### 封装生成从minNum到maxNum的随机数

    //生成从minNum到maxNum的随机数
    function randomNum(minNum,maxNum){ 
        switch(arguments.length){ 
            case 1: 
                return parseInt(Math.random()*minNum+1,10); 
            break; 
            case 2: 
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
            break; 
            default: 
                return 0; 
            break; 
        } 
    }

**解析**

- Math.random()生成[0,1)的数，所以
- Math.random()*5生成{0,5)的数。
- 通常期望得到整数，所以要对得到的结果处理一下。
- parseInt()，Math.floor()，Math.ceil()和Math.round()都可得到整数。
- parseInt()和Math.floor()结果都是向下取整。
- 所以Math.random()*5生成的都是[0,4] 的随机整数。


### 生成[1,max]的随机数，公式如下：

    // max - 期望的最大值
    parseInt(Math.random()*max,10)+1;
    Math.floor(Math.random()*max)+1;
    Math.ceil(Math.random()*max);

### 生成[0,max]到任意数的随机数，公式如下：

    // max - 期望的最大值
    parseInt(Math.random()*(max+1),10);
    Math.floor(Math.random()*(max+1));

### 希望生成[min,max]的随机数，公式如下：

    // max - 期望的最大值
    // min - 期望的最小值
    parseInt(Math.random()*(max-min+1)+min,10);
    Math.floor(Math.random()*(max-min+1)+min);
