### node
安装：官网下载[http://nodejs.cn/download/](http://nodejs.cn/download/)<br>
安装完毕后在命令行输入以下命令测试是否安装成功，正确会出现版本号<br>

	node -v

![](https://i.imgur.com/wac0qJT.png)<br>

设置环境变量:<br>
nodejs下建立"node_global"及"node_cache"两个文件夹，输入以下命令改变npm配置<br>
![](https://i.imgur.com/PslzXP1.png)<br>

	npm config set prefix "D:\nodejs\node_global"
    npm config set cache "D:\nodejs\node_cache"

在系统环境变量添加**系统变量NODE_PATH**，输入路径D:\nodejs\node_global\node_modules，此后所安装的模块都会安装到改路径下 <br>
![](https://i.imgur.com/oedas65.png)<br>

在命令行输入以下命令试着安装express（注：“-g”这个参数意思是装到global目录下，也就是上面说设置的"D:\nodejs\node_global"里面。）<br>
	
	npm install express -g

![](https://i.imgur.com/KEMLjba.png)<br>

在命令行输入node进入编辑模式，输入以下代码测试是否能正常加载模块：<br>

	node
    require('express')

![](https://i.imgur.com/zLGNCEp.png)<br>

成功，可以看到有输出。出错，检查NODE_PATH的路径。<br>

### cnpm
安装：
	
	npm install -g cnpm --registry=https://registry.npm.taobao.org~

添加系统变量path的内容<br>
因为cnpm会被安装到H:nodejs\node_global下，而系统变量path并未包含该路径。在**系统变量path**下添加该路径即可正常使用cnpm。<br>
![](https://i.imgur.com/9gyuOJm.png)<br>

输入cnpm -v命令，查看结果<br>
	![](https://i.imgur.com/MwXL2uF.png)