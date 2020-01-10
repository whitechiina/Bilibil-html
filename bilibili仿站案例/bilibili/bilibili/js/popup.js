;(function(window,document,$,option){
	'use strict'
	//默认设置
	var _config = {
		'effect':'',
		'event' : 'mouseenter',
		'delay' : '0',
		'time'  : 500,
		'trigger' : ''
	}

	//弹出层构造器
	function Popup(ele,config){
		this._ele = ele;
		this._config = config.replace(/hover/,'mouseenter')||_config;
		this.index = null;
		this.init();
		this.config();
	}

	//弹出层原型
	Popup.prototype = {
		//初始化样式
		init : function(){
			this._ele.css('display','none');
		},
		//判定设置
		config : function(){
			var option = $.extend({},_config);
			if(typeof(this._config)=='string'){
				var key = this._config.split(';');
				$.each(key,function(){
					if(this){
						var attr = this.split(':');
						option[attr[0]] = attr[1];
					}
				});
			}
			else{
				option = _config;
			};
			this.handler(option.effect,option.event,option.time,option.delay,option.trigger);
		},
		//事件触发
		handler : function(effect,event,time,delay,trigger){
			var $trigger = trigger&&$($('#'+trigger).get(0))||$(this._ele.parent().get(0)),
				ele = this._ele,
				This = this;
				$trigger.unbind().bind(event,function(){
				if (!This.index){
					window.prevPop&&window.prevPop.css('display','none');
					effect?ele[effect](eval(time)):ele.css('display','block');
					if(event == 'click'){
						This.index++;
						$trigger.unbind('mouseleave');}
					window.prevPop = ele; 
				}
				else{
					This.index--;
					ele.css('display','none');
				}
			}).bind('mouseleave',function(){
				setTimeout(function(){ele.fadeOut(200)},delay);
			})
		}
	};

	//生产弹出模块
	!function(option){
		$.each(option,function(){
			new Popup(this.ele,this.config);
		})
	}(option);

})(window,document,jQuery,popOption)