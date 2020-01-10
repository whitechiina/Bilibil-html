;(function(window,document,$){
	'use strict';

	var $comment =$('.comment','.list-pic'),
		$info = $comment.children();
	
	function init(){
		$info.css({'position':'absolute','left':'162px','overflow':'hidden'});
	}
	init();
	function move(){
		$comment.hover(function(){
			var $cd = $(this).children();
			$cd.each(function(i){
				var h = i%2,
					This = $(this);
				$(this).css('top',h*20);
				this.timer = setTimeout(function(){
						This.animate({'left':-300},10000-This.width()*13)
					},i*1200)			
			})},function(){
				var $cd = $(this).children();
				$cd.each(function(i){
					$(this).stop().css('left',162);
					clearTimeout(this.timer);
				})
			});
	}
	move();

})(window,document,jQuery)