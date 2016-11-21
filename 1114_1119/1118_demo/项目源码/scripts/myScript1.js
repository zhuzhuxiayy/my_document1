$(function(){
	// 对输入框的处理
	$('#inputSearch').focus(function(){
		// 可以通过defaultValue获取输入框的默认值
		// this.defaultValue;
		if ($(this).val() == this.defaultValue) {}
			$(this).val('');
		// blur 失去焦点的处理
	}).blur(function(){
		if ($(this).val() == '') {
			$(this).val(this.defaultValue);
		}
	}).keydown(function(ev){
		if (ev.keyCode == 13) {
			alert('提交提示框');
		}
	});

	// 增加式样hot标志
	$('.jnCatainfo li a.promoted').append('<span class="hot"></span>');

	// 更换皮肤
	$('#skin li').click(function(){
		// 颜色数组
		var colorArray = ['#4A4A4A','#BE46D8','#E44072','#37C7D4','#F9AF2A','#B1D410'];
		// 获取当前li的次序
		var index = $(this).index();
		// 添加selected属性 其他兄弟取消此属性
		$(this).addClass('selected').siblings().removeClass('selected');
		// 修改导航中的背景颜色和h2中的背景颜色
		$('.mainNav').css({'background-color':colorArray[index]});
		$('#jnCatalog h2').css({'background-color':colorArray[index]});
	});

	// 显示子菜单
	$('.mainNav ul li a').hover(function(){
		$(this).next().show();
	},function(){
		$(this).next().hide();
	});

	// 轮播
	var index = 0;
	var timer = setInterval(doShow,2000);
	function doShow(){
		// 把当前的图片显示 其他的图片隐藏
		$('#jnImageroll img').eq(index).fadeIn().siblings().fadeOut();
		// 把对应的指示标签设置式样 背景色不透明 其他兄弟要有透明效果
		$('#jnImageroll div a').eq(index)
		.css({'background-color':'lightblue','opacity':1.0})
		.siblings().css({'background-color':'#444444','opacity':0.8});
		index++;
		if (index == 5) {
			index = 0;
		}
	}
	// 直接触发一次
	doShow();

	// 鼠标移到指示器上时
	$('#jnImageroll div a').hover(function(){
		clearInterval(timer);
		// 当前移到的指示器是哪一个
		index = $(this).index();
		// 把当前的图片显示 其他的图片隐藏
		$('#jnImageroll img').eq(index).fadeIn().siblings().fadeOut();
		// 把对应的指示标签设置式样 背景色不透明 其他兄弟要有透明效果
		$(this)
		.css({'background-color':'lightblue','opacity':1.0})
		.siblings()
		.css({'background-color':'#444444','opacity':0.8});
	},function(){
		// index在此处并无用到 可以省略
		// index = $(this).index();
		timer = setInterval(doShow,2000);
	});

	// 标题提示
	$('#jnNoticeInfo li a').mouseover(function(ev){
		// var title = $(this).attr('title');
		// 给this增加一个属性copyTitle，用于保存title的信息 
		this.copyTitle = $(this).attr('title');
		$(this).attr('title','');
		// $(htmlString) 通过一个字符串生成一个jQuery对象 只要调用一次$(htmlString) 就生成一个新的jQuery对象
		// 构建一个div
		var htmlString = '<div id="titleShowTip" style="display:none;position:absolute;top:0px;left:0px;border:1px solid black;background-color:yellow;">'+this.copyTitle+'</div>';
		$(document.body).append(htmlString);
		// 修改他的位置 pageX pageY 显示鼠标指针的位置
		$('#titleShowTip').css({"left":ev.pageX+10+'px',"top":ev.pageY+10+'px'});
		// 以动画的方式显示出来
		$('#titleShowTip').show('fast');
	}).mouseout(function(){
		$(this).attr('title',this.copyTitle);
		$('#titleShowTip').remove();
	}).mousemove(function(ev){
		$('#titleShowTip').css({"left":ev.pageX+10+'px',"top":ev.pageY+10+'px'});
	});

	// 品牌移动的操作
	$('#jnBrandTab li').click(function(){
		$(this).find('a').css({'background-color':'red'})
		.parent().siblings().find('a').css({'background-color':'#e4e4e4','color':'black'});

		// 获取点击的次序
		var index = $(this).index();
		// 获取一个对象的宽度 一张鞋子图片的宽度
		var width = $('#jnBrandContent li:first').outerWidth(true);
		var offsetX = -index*4*width;
		// 移动鞋子列表
		$('#jnBrandList').animate({'left':offsetX+'px'},'slow');
	});

	// 使用程序 在第一个li上触发事件
	$('#jnBrandContent li:first').trigger('click');

})