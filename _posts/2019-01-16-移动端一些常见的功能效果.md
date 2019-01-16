### 遮罩层内容可以滑动，body不可以滑动并保持之前滑动的位置不变
	
	var isShow = true;
    var top = 0;//给top变量一个初始值，以便下方赋值并引用。
    $('#Jheader .tab').on('click', function(){
        if(isShow){
            $(this).addClass('close');
            $('#Jheader .label-block').show();
            isShow = false;
            top = $(window).scrollTop();//获取页面的scrollTop；
            $('body').css("top",-top+"px");
            $('body').addClass('position-fixed'); 
        } else {
            $(this).removeClass('close');
            $('#Jheader .label-block').hide();
            isShow = true;
            $('body').removeClass('position-fixed');
            $(window).scrollTop(top);//设置页面滚动的高度，如果不设置，关闭弹出层时页面会回到顶部。
        }
        
    });
	// 别忘记了在滑动容器css中添加ios滑动增强效果代码：-webkit-overflow-scrolling : touch;