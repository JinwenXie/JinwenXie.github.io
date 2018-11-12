## 使用git上遇到的一些问题<br>
### 一、创建SSH Key
由于本地Git仓库和github仓库之间的传输是通过SSH加密的，所以我们需要创建SSH Key。我们先在用户主目录下看看有没有.ssh目录,如果有,再看看这个目录下是不是有如下图三个文件：<br>
![](https://i.imgur.com/HaOeaEo.png)
果有的话，直接跳过如下命令，如果没有的话，打开命令行，输入如下命令：<br>
    ssh-keygen  -t rsa –C “youremail@example.com”<br>
这个时候，有些用户，又会出现一个问题，那就是**ssh-keygen 不是内部或外部命令**<br>
#### ssh-keygen 不是内部或外部命令的解决办法
1. 在你自己的git安装目录下*usr/bin*目录下的ssh-keygen.exe，**复制该路径**
![](https://i.imgur.com/isYDs1h.png)<br>
2. 属性-->高级系统设置-->环境变量-->系统变量,找到Path变量，进行编辑，End到最后，输入分号，粘贴复制的ssh-keygen所在的路径，保存；<br>
![](https://i.imgur.com/yQbay4k.png)
![](https://i.imgur.com/sRUKUSw.png)
3. 在cmd上重新执行命令:<br>
    ssh-keygen  -t rsa –C “youremail@example.com”
成功后会看到如下图:
![](https://i.imgur.com/q5EfOiK.png)

### 二、github连接超时<br>
检查连接github是否成功  
在命令行输入：   `ssh -T git@github.com`  
如果出现：You've successfully authenticated，那么连接成功可以使用了；  
如果出现：ssh: connect to host github.com port 22: Connection timed out，很遗憾连接超时；  

**解决方法：**  
首先我们得要找到git的安装目录，找到/etc/ssh/ssh_config文件（如果忘记了自己git的安装目录，我们可以在命令行输入：`where git`就可以打印出git的安装目录）;<br>
![](https://i.imgur.com/XmVFspc.png)  

然后在ssh_config文件末尾处添加：<br>
	`Host github.com `
	`User git`  
	`Hostname ssh.github.com`  
	`PreferredAuthentications publickey`  
	`IdentityFile ~/.ssh/id_rsa`  
	`Port 443`  
保存后，命令行重跑 `ssh -T git@github.com`  
出现如下图情况：  
![](https://i.imgur.com/VdlicvC.png)  
输入： `yes` 即可  
出现如下图文字，即表示连接成功  
![](https://i.imgur.com/JqMRAAr.png)

### 三、Github.com无法访问
在网上查阅了一波，基本都是说修改hosts文件，往后边添加如下代码：<br>
    74.125.237.1 dl-ssl.google.com<br>
	173.194.127.200 groups.google.com<br>
	192.30.252.131 github.com<br>
	185.31.16.185 github.global.ssl.fastly.net<br>
	74.125.128.95 ajax.googleapis.com<br>
然而，没有啥用，可能我自己电脑的问题吧。晚上回去再看看



