一直以来，在公司使用ssh作为github提交与下载的我，今天突然给我报了这个错误：<br>

	ssh_exchange_identification: read: Connection reset by peer

年轻的我以为是个小case，可是，终究还是 too young too naive，搜寻了百度、掘金、github，基本都是围绕着这三个原因来处理：<br>

- 服务器防火墙限定，
- 是否达到ssh的最大连接数，超过之后会服务器端会拒绝新的连接，直到有新的连接释放出来
- /etc/hosts.allow和/etc/hosts.deny配置文件限定ip登录

遗憾的是，我围绕着这些原因试过了所有方法之后仍然解决不了我的问题；没办法，只能绕路走，ssh提交不行，那我就换https呗，只要能通罗马就行！<br>

## git ssh转https
### 步骤
#### 1.修改远程仓库地址
	
	git remote set-url origin [url]
	// 我这里使用 git remote set-url origin [url]命令，直接修改远程仓库为https的地址

#### 2.配置免密
在上面已经输入用户名和密码的基础上进行下面操作<br>
a.新建文件并保存密码<br>

	$ touch ~/.git-credentials
	$ vim ~/.git-credentials

b.添加内容<br>

	https://{username}:{passwd}@github.com

c.添加git配置<br>

	$ git config --global credential.helper store


