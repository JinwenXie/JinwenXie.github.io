### vue
安装：

	cnpm install vue -g
	vue -V    // 查看vue版本

### webpack
安装： 

    cnpm install webpack -g

安装webpack-cli包：
        
    cnpm install -g webpack-cli 

查询webpack版本：

    webpack -v          // 成功 
        
注意： webpack和webpack-cli需要安装在同一个地方，两个要么都全局安装，要么都安装在同个项目中。<br>

新建一个vue项目
            
	vue init webpack HelloVue

localhost:8080无法访问问题<br>

![](https://i.imgur.com/5rXgtqU.png)<br>

项目中config/index.js中localhost修改为自己的ip<br>

![](https://i.imgur.com/Wy75Rr7.png)

重新运行 **npm run dev**<br>
浏览器输入192.168.30.54:8080 成功<br>

![](https://i.imgur.com/niPCY3o.png)
