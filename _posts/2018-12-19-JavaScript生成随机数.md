### 下载Nginx
下载地址：[http://nginx.org/en/download.html](http://nginx.org/en/download.html)

![](https://i.imgur.com/fOnkIIk.png)

### 下载到本地解压
![](https://i.imgur.com/IwpbaXd.png)

### 为小程序请求豆瓣api做配置
使用编辑器打开文件/conf/nginx.conf<br>

在文件中找到server{}，在server{}下添加<br>

	location  /v2/ {
        proxy_store off;
        proxy_redirect off;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Referer 'no-referrer-when-downgrade';
        proxy_set_header User-Agent 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36';
        proxy_connect_timeout 600;
        proxy_read_timeout 600;
        proxy_send_timeout 600;
        proxy_pass https://api.douban.com;
    }

### 启动
直击双击Nginx目录下的nginx.exe，启动后会有命令窗口一闪而过<br>
或者使用cmd命令工具，**进入到nginx文件夹下**<br>
启动命令：<br>

	start nginx

查看nginx是否启动：
	
	tasklist /fi "imagename eq nginx.exe"

启动成功的标志：<br>
![](https://i.imgur.com/jVd0FXI.png)

然后小程序中请求的豆瓣接口就可以使用<br>
**http://localhost:80 代替 https://api.douban.com**

### nginx常用命令

1. nginx -s reload  ：修改配置后重新加载生效	
2. nginx -s reopen  ：重新打开日志文件
3. nginx -t -c /ath/to/nginx.conf 测试nginx配置文件是否正确
4. nginx -s stop  :快速停止nginx
5. nginx -s quit  ：完整有序的停止nginx
