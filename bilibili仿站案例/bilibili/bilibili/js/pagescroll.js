;(function(window,document,$,option){
	'use strict'

	//默认设置
	var _config = {
		'delay' : 400,     			  //滚动时间
		'ease' : 'linear',			  //滚动曲线
		'trigger' : 'scroll',		  //对应主体模块Class
		'tab': '.tab',				  //侧导航父元素类名
		'top' : '.gotop',			  //返回顶部元素类名
		'select' : 'on',			  //侧导航焦点类名
		'left' : 20					  //距离主体模块右侧距离
	};

	//侧导航构造函数 
	function PageScroll(ele,config){
		this._ele = ele;
		this._config = config||_config;
		this.init();
		this.config();
	}

	//侧导航原型
	PageScroll.prototype ={
		//初始化
		init : function(){
			var sW = $(window).width(),
				sH = $(window).height();
			this._bg = $('<div>', {id:'blackBg','width':sW,'height':sH}).css('display','none').appendTo($('body'));			//黑色覆盖模块
			this._ele.css('z-index',999);
			this.position();	
			this.screen();
		},
		//调整屏幕
		screen : function(){
			var This = this;
			window.resize(function(){
				This.position.call(This);
			});
		},
		//导航上下位置
		position : function(){
			var eleHeight = this._ele.height(),
				screenHeight = $(window).height(),
				minusHeight = screenHeight - eleHeight,
				initHeight = minusHeight>0?(screenHeight - eleHeight)/2:0;
				this._wH = screenHeight;
				this._ele.css('top',initHeight);
		},
		//导航左右位置
		margin : function(width,left){
			var mar = ($(window).width()+width)/2+eval(left);
			this._ele.css({
				'left':mar,
				'display':'block',
				'userSelect':'none'}).attr('onselectstart','return false');
		},
		//配置设置
		config : function(){
			var option = $.extend({},_config);
			if (typeof(this._config)=='string')
			{
				var key = this._config.split(';');
				$.each(key,function(){
					if(this){
						var attr = this.split(':');
						option[attr[0]] = attr[1];
			}})}else{
				this._config = _config;
			}
			this._nav = $(option.tab,this._ele);                       //侧导航部分节点
			this._trigger = $('.'+option.trigger);					   //目标层节点
			this._nav.css('position','relative');
			this.calu(option.left);
			this.click(option.delay,option.select,option.top,option.trigger);
		},
		//计算各模块高度
		calu : function(left){
			var width = this._trigger.eq(0).width(),
				This = this;
			this.tgH = new Array();
			this._trigger.each(function(){
				This.tgH.push(Math.floor($(this).offset().top-This._wH/3));
			})
			this.margin(width,left);
		},
		//点击滚动
		click : function(delay,select,top,trigger){
			var	$tab = this._nav.children().filter(function(i){
					if (this.className =='last change'){
						$(this).css({'position':'absolute','bottom':0})
					}else{
						return this};
				}),						 							  //侧导航按键节点
				$btn = $(top,this._ele),							 //回到顶部按钮
				hight = $tab.eq(0).height(),
				This = this;
				this._trigger = $('.'+trigger);    					//重构主体数组结构
			$tab.unbind().bind('click',function(){
				var that = $(this),
					target = This.tgH[that.index()];
					//that.addClass(select).siblings().removeClass(select);
				$('html,body').stop().animate({
					'scrollTop' : target
				},eval(delay));
			}).each(function(i){
					$(this).css({
						'position':'absolute',
						'top': hight*i,
						'left':1
					})
				}
			)
			$btn.bind('click',function(){
					$('html,body').stop().animate({
					'scrollTop' : 0
					},eval(delay));
				})
			this.scroll(select,$tab);
			this.change(delay,select,top,$tab,trigger);
		},
		//屏幕滚动触发
		scroll : function(select,tab){
			var This = this;
			window.on('scroll',function(){
				var top = window.scrollTop(),
					num = $.grep(This.tgH,function(value){
           		 		return value <= top;
       			 	}).length;	
				if(num){
					tab.eq(num-1).addClass(select).siblings().removeClass(select);
				}else{
					tab.eq(0).removeClass(select);
				}
			});
		},
		//兑换模块
		change : function(delay,select,top,tab,trigger){
			var $btn = $('.change',this._ele),			//排序触发按钮
				num = tab.length,					//对应节点总数量
				This = this;										
			$btn.bind('click',function(){
				var	img = $('.side-bg',This._ele).fadeIn();											//弹出模块
				This._bg.css('display','block');
				tab.css('cursor','move').unbind().bind('mousedown',function(e){
					var index = $(this).index(),					//点击模块index			
						h = $(this).height(),						//模块高度
						maxH = num*h,								//最高top
						w = $(this).width(),						//模块宽度
						maxW = w/2,									//最大位移left
						sX = e.clientX,								//开始X
						sY = e.clientY-h*index,						//开始Y
						That = $(this),X,Y;							//定义X Y
					$(window).on('mousemove',function(e){
						var msX = e.clientX-sX,
							msY = e.clientY-sY;
							X = (msX>0)? Math.min(msX,maxW):Math.max(msX,-maxW);
							Y = (msY>0)? Math.min(msY,maxH):Math.max(msY,-10);
						That.css({'top':Y,'left':X}).addClass('move');
					}).bind('mouseup',function(){
							$(window).off('mousemove');
							var t = parseInt(Y/h),          				//对应交换模块index
								g = tab.eq(t),								//对应节点对象
								a = This._trigger.eq(t),					//对应主体模块对象
								b = This._trigger.eq(index);				//交换主体模块对象
							That.removeClass('move');
							This.exchange(a,b);
							This.exchange(g,That);
							img.css('display','none');
							This._bg.css('display','none');
							tab.css('cursor','pointer')
							$(window).off('mouseup');
							This.click(delay,select,top,trigger);
						})
				})
				
			})
		},
		//节点交换
		exchange : function(a,b){
				if(b.index())
				{
                    var n = a.next(), p = b.prev();
                    b.insertBefore(n);
                    a.insertAfter(p);
                }else{
                	console.log(1);
                	var n = a.next(), p = b.next();
                	b.insertBefore(n);
                    a.insertBefore(p);
                }
         }
	}
	var a = new PageScroll(option.ele,option.config);

})($(window),$(document),jQuery,scrollOption);