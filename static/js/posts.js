const posts = {
    "data": [
        {
            "title": "ES6系列之es5作用域与es6块级作用域",
            "summary": "块级作用域：变量在离开定义的块级代码后立即被回收。即“ 花括号中间的部分是一个块级作用域”。例如：for 循环、 if 逻辑判断、while 循环等语句后面的花括号都是一个块级作用域。",
            "authorImage": "static/img/posts/mine_1.jpg",
            "articleImage": "static/img/posts/es6.png",
            "url": "https://jinwenxie.github.io/2019/01/24/ES6系列之es5作用域与es6块级作用域.html",
            "date": "2019-01-24",
            "author": "Gavin(xiejinwen)"
        },
        {
            "title": "ES6系列之函数的扩展",
            "summary": "ES6大力度地更新了函数特性，在ES5的基础上进行了许多改进，使用JS编程可以更少出错，同时也更加灵活。",
            "authorImage": "static/img/posts/mine_1.jpg",
            "articleImage": "static/img/posts/es6.png",
            "url": "https://jinwenxie.github.io/2019/01/23/ES6系列之函数的扩展.html",
            "date": "2019-01-23",
            "author": "Gavin(xiejinwen)"
        },
        {
            "title": "ES6系列之字符串的扩展",
            "summary": "ES6对字符串新增了一些函数和操作规范，使得开发者对字符串的操作更加方便，以往需要借助其他javascript代码才能实现的效果，现在利用这些函数即可快速实现。",
            "authorImage": "static/img/posts/mine_2.jpg",
            "articleImage": "static/img/posts/es6.png",
            "url": "https://jinwenxie.github.io/2019/01/21/ES6系列之字符串的扩展.html",
            "date": "2019-01-21",
            "author": "Gavin(xiejinwen)"
        },
        {
            "title": "ES6系列之let&const",
            "summary": "ES5中声明变量用var，ES6中用let声明变量，const声明常量。",
            "authorImage": "static/img/posts/mine_2.jpg",
            "articleImage": "static/img/posts/es6.png",
            "url": "https://jinwenxie.github.io/2019/01/20/ES6系列之let&const.html",
            "date": "2019-01-20",
            "author": "Gavin(xiejinwen)"
        },
        {
            "title": "彻底吃透JavaScript中的递归",
            "summary": "所谓递归，是当一个函数调用自身，并且该调用做了同样的事情，这个循环持续到基本条件满足时，调用循环返回",
            "authorImage": "static/img/posts/mine_2.jpg",
            "articleImage": "static/img/recursion/cover.png",
            "url": "https://jinwenxie.github.io/2019/01/17/彻底吃透JavaScript中的递归.html",
            "date": "2019-01-17",
            "author": "Gavin(xiejinwen)"
        },
        {
            "title": "移动端一些常见的功能效果",
            "summary": "本文着重于记录一些自己在工作或学习过程中实现的一些比较常见的移动端效果，以便自己将来再次使用的时候方便",
            "authorImage": "static/img/posts/mine_2.jpg",
            "articleImage": "static/img/posts/js_1.png",
            "url": "https://jinwenxie.github.io/2019/01/16/移动端一些常见的功能效果.html",
            "date": "2019-01-16",
            "author": "Gavin(xiejinwen)"
        },
        {
            "title": "JavaScript中的表达式和语句",
            "summary": "本文着重于在JavaScript语法中十分重要的语句（statements）和表达式（expressions）之间的区别。",
            "authorImage": "static/img/posts/mine_3.jpg",
            "articleImage": "static/img/posts/js.png",
            "url": "https://jinwenxie.github.io/2019/01/03/JavaScript中的表达式和语句.html",
            "date": "2019-01-03",
            "author": "Gavin(xiejinwen)"
        },
        {
            "title": "JavaScript数组方法总结",
            "summary": "转换方法—toLocaleString()、toString()、valueOf()；栈方法——push()、pop()；队列方法——shift()、unshift()；重排序方法——reverse()、sort()；操作方法——concat()、slice()、splice()；位置方法——indexOf()、lastIndexOf()；迭代方法——every()、filter()、forEach()、map()、some()；归并方法——reduce()、reduceRight()",
            "authorImage": "static/img/posts/mine_3.jpg",
            "articleImage": "static/img/posts/array.png",
            "url": "https://jinwenxie.github.io/2018/12/26/JavaScript数组方法总结.html",
            "date": "2018-12-26",
            "author": "Gavin(xiejinwen)"
        },
        {
            "title": "理解JavaScript中的this、call、apply和bind",
            "summary": "JavaScript 中最容易被误解的一点就是this关键字。在这篇文章中，你将会了解四种规则，弄清楚 this 关键字指的是什么。隐式绑定、显式绑定、new 绑定和 window 绑定。在介绍这些技术时，你还将学习一些 JavaScript 其他令人困惑的部分，例如 .call、.apply、.bind和 new 关键字。",
            "authorImage": "static/img/posts/mine_3.jpg",
            "articleImage": "static/img/posts/js_1.png",
            "url": "https://jinwenxie.github.io/2018/12/21/理解JavaScript中的this&call&apply&bind.html",
            "date": "2018-12-21",
            "author": "Gavin(xiejinwen)"
        },
        {
            "title": "JavaScript生成随机数",
            "summary": "记录JavaScript生成随机数生成随机数的方法以及原理",
            "authorImage": "static/img/posts/mine_3.jpg",
            "articleImage": "static/img/posts/random.png",
            "url": "https://jinwenxie.github.io/2018/12/19/JavaScript生成随机数.html",
            "date": "2018-12-19",
            "author": "Gavin(xiejinwen)"
        },
        {
            "title": "为小程序请求豆瓣接口配置Nginx",
            "summary": "通过豆瓣api可以获取很多电影、书籍等的数据信息。但是豆瓣设置了小程序的访问权限，在小程序上直接使用豆瓣api是会报错的；所以使用Nginx来做代理，从而请求到豆瓣的api数据",
            "authorImage": "static/img/posts/mine_3.jpg",
            "articleImage": "static/img/nginx/nginx.png",
            "url": "https://jinwenxie.github.io/2018/12/14/为小程序请求豆瓣接口配置Nginx.html",
            "date": "2018-12-14",
            "author": "Gavin(xiejinwen)"
        },
        {
            "title": "使用webpack创建vue项目",
            "summary": "在webpack的安装以及创建一个vue项目过程中的一些小问题",
            "authorImage": "static/img/posts/mine_2.jpg",
            "articleImage": "static/img/vue/vue.png",
            "url": "https://jinwenxie.github.io/2018/12/11/使用webpack创建vue项目.html",
            "date": "2018-12-11",
            "author": "Gavin(xiejinwen)"
        },
        {
            "title": "NodeJs以及cnpm安装",
            "summary": "记录一下自己安装和配置NodeJs、cnpm的过程，以备后边自己更换电脑的时候参考",
            "authorImage": "static/img/posts/mine_2.jpg",
            "articleImage": "static/img/nodejs/nodejs.png",
            "url": "https://jinwenxie.github.io/2018/12/11/NodeJs以及cnpm安装.html",
            "date": "2018-12-11",
            "author": "Gavin(xiejinwen)"
        },
        {
            "title": "CSS日常笔记",
            "summary": "在工作的时候总是会遇到一些效果，自己并不会一下就写的出来，需要查阅下资料才行。用这篇文章来记录以后在工作中遇到的一些CSS常见效果",
            "authorImage": "static/img/posts/mine_3.jpg",
            "articleImage": "static/img/posts/css.png",
            "url": "https://jinwenxie.github.io/2018/12/10/CSS日常笔记.html",
            "date": "2018-12-10",
            "author": "Gavin(xiejinwen)"
        },
        {
            "title": "JavaScript等号==VS===",
            "summary": "Javascript中用于相等比较的操作符有两个==和===。==我们通常称为“等于”，而===我们通常称为“严格等于”。",
            "authorImage": "static/img/posts/mine_2.jpg",
            "articleImage": "static/img/posts/js.png",
            "url": "https://jinwenxie.github.io/2018/12/10/JavaScript等号==VS===.html",
            "date": "2018-12-10",
            "author": "Gavin(xiejinwen)"
        },
        {
            "title": "JavaScript数据类型判断",
            "summary": "毫无疑问，JavaScript数据类型的判断在我们日常开发中是必不可免的，小到基本的数据类型，大到各种引用数据类型，都是需要我们掌握的知识点；现在就记录下自己对于JavaScript各种数据类型的检测方。",
            "authorImage": "static/img/posts/mine_3.png",
            "articleImage": "static/img/posts/dataTypeJudge.png",
            "url": "https://jinwenxie.github.io/2018/12/04/JavaScript数据类型判断.html",
            "date": "2018-12-04",
            "author": "Gavin(xiejinwen)"
        },
        {
            "title": "JavaScript数据类型",
            "summary": "越是基础的东西，就越是要理解吃透，不然后期总是容易吃亏；本文是介绍JavaScript的各种数据类型",
            "authorImage": "static/img/posts/mine_3.png",
            "articleImage": "static/img/posts/dataType.png",
            "url": "https://jinwenxie.github.io/2018/11/30/JavaScript数据类型.html",
            "date": "2018-11-30",
            "author": "Gavin(xiejinwen)"
        },
        {
            "title": "我尤其想理清楚javaScript的执行机制",
            "summary": "我看过很多关于JavaScript执行机制的资料，但是我总觉得自己不明觉厉，或者当下懂了，但是一段时间过后，往往又不知所以了；所以想用一篇文章来自己记录下。",
            "authorImage": "static/img/posts/mine_3.png",
            "articleImage": "static/img/posts/javascript_zxjz.jpg",
            "url": "https://jinwenxie.github.io/2018/11/14/javaScript执行机制.html",
            "date": "2018-11-14",
            "author": "Gavin(xiejinwen)"
        },
        {
            "title": "markdownPad2的安装和使用",
            "summary": "MarkdownPad 2是一款较不错的.md文件的编辑器，可快速将文本转换为美观的HTML/XHTML的网页格式代码，且操作方便，用户可以通过键盘快捷键和工具栏按钮来使用或者移除Markdown格式，左右栏的分割方式令用户可以实时看到 HTML 格式的 Markdown 文档。",
            "authorImage": "static/img/posts/mine_3.png",
            "articleImage": "static/img/posts/markdownPad2.jpg",
            "url": "https://jinwenxie.github.io/2018/11/12/markdownPad2的安装和使用.html",
            "date": "2018-11-12",
            "author": "Gavin(xiejinwen)"
        },
        {
            "title": "小程序学习之页面传参",
            "summary": "这是一篇专门用来记录学习以及开发小程序过程的文章",
            "authorImage": "static/img/posts/mine_3.png",
            "articleImage": "static/img/posts/wxApp.png",
            "url": "https://jinwenxie.github.io/2018/11/09/小程序学习之路.html",
            "date": "2018-11-09",
            "author": "Gavin(xiejinwen)"
        },
        {
            "title": "vscode的安装和使用",
            "summary": "之前的开发过程中一直用的是sublimeText3和webstorm，现在尝试使用下VS Code；本文介绍Vs Code的软件安装和一些插件的介绍",
            "authorImage": "static/img/posts/mine_3.png",
            "articleImage": "static/img/posts/vscode.jpg",
            "url": "https://jinwenxie.github.io/2018/11/08/vscode的安装和使用.html",
            "date": "2018-11-08",
            "author": "Gavin(xiejinwen)"
        },
        {
            "title": "使用Git过程中的一些问题",
            "summary": "SSH Key的创建、github连接超时、Github.com无法访问等问题",
            "authorImage": "static/img/posts/mine_2.jpg",
            "articleImage": "static/img/posts/git.png",
            "url": "https://jinwenxie.github.io/2018/11/06/使用Git过程中的一些问题.html",
            "date": "2018-11-06",
            "author": "Gavin(xiejinwen)"
        }
        
    ]
}