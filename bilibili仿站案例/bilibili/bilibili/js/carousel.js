;(function(window,document,$,option){
	'use strict'
	//默认设置
	var config = {
		'effect': 'scrollX',
		'event' : 'click',
		'time'  : 3000,
		'delay' : 500,
		'ease' : 'linear',
		'autoplay' : true,
		'prev' : '.prve',
		'next' : '.next'
	};

	//轮播构造函数
	function Carousel(_ele,_config){
		this.ele = _ele;
		this._img = $('.container',_ele);
		this._tab = $('.tab',_ele);
		this._config = _config.replace(/hover/,'mouseenter')||config;
		var index = $('.active',this._tab).index();
		this.index = index>-1?index:0;
		this.init();
	};

	Carousel.prototype = {
		//初始化
		init : function(){
			var $length = this._img.children().width();
			this._tab.children().eq(0).children().eq(0).show();
			this._img.css(
				{'position':'absolute',
				'left':-this.index*$length});
			this.config();
		},
		//配置设置
		config : function(){
			var option = $.extend({},config);
			if (typeof(this._config)=='string'){
				var key = this._config.split(';');
				$.each(key,function(){
					if (this){
						var attr = this.split(':');
						option[attr[0]] = attr[1];
					}
				})
			}else{
				option = option;
			}
			this.handler(option.effect,option.event,option.time,option.delay,option.ease,option.autoplay,option.prev,option.next);
		},
		//点击滚动
		handler : function(effect,event,time,delay,ease,autoplay,prev,next){
			//tab按键
			var $length = this._img.children().eq(0).width(),
			 	$tab = this._tab.children(),
				$tabNum = this._img.children().length,
				This = this;
			this._tab.delegate('li',event,function(){
				This.index = $(this).index();
				This.move($tab,$length,delay,ease);
			})	
			//btn按键
			var $prev = $(prev,this.ele)||$(prev),
				$next = $(next,this.ele)||$(next);
			$prev.bind('click',function(){
				This.index = This.index==0?$tabNum-1:This.index-1;
				This.move($tab,$length,delay,ease);
			})
			$next.bind('click',function(){
				This.index ++;
				This.index%= $tabNum;
				This.move($tab,$length,delay,ease);
			})
			//自动轮播
			eval(autoplay)&&this.auto(time,$tab,$tabNum,$length,delay,ease);
			this.ele.hover(function(){clearInterval(This.timer);},function(){
			eval(autoplay)&&This.auto(time,$tab,$tabNum,$length,delay,ease);
			})
		},
		//自动滚动
		auto : function(time,tab,num,length,delay,ease){
			var This = this;
			this.timer = setInterval(function(){
				This.index++;
				This.index%= num;
				This.move(tab,length,delay,ease);
			},time);
		},
		//Dom操作
		move : function(tab,length,delay,ease){
			tab.eq(this.index).addClass('active').siblings().removeClass('active');
			tab.eq(this.index).children().show().parent().siblings().children().hide()
			this._img.stop().animate({'left':-length*this.index},eval(delay),ease);
		},
	}

	!function(option){
		$.each(option,function(){
			 new Carousel(this.ele,this.config)
		})
	}(option);

})(window,document,jQuery,carouselOption);