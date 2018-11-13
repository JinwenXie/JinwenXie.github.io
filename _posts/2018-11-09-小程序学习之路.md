## 小程序学习流水账<br>

### 2018-11-08<br>
##### 小程序内部跳转页面传参：<br>
    // 当前wxml文件
	<view bindtap="goOtherPage" data-argument="1"></view>

	// 当前js文件
	goOtherPage: function(event){
		var agt = event.currentTarget.dataset.argument;// 使用该方法可以获取到当前标签上的自定义属性argument值
		wx.navigateTo({
			url: 'test?argument=' + agt
		})
	}

	// 跳转的js文件
	Page({
		onLoad: function(option){
			console.log(option.argument)
		}
	});
   


