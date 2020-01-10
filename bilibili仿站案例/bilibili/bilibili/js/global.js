;(function(window,document,$){
	'use strict';

	//弹出层模块查找
	var popOption = new Array();
	var $pop = $('.pop')||{};
	$pop.each(function(){
		var popObj = [];
		popObj.ele = $($(this).get(0));
		popObj.config = popObj.ele.data('config')||'';
		popOption.push(popObj);
	})
	window.popOption = popOption;

	//轮播层模块查找
	var carouselOption = new Array();
	var $carousel = $('.carousel')||{};
	$carousel.each(function(){
		var carouselObj = [];
		carouselObj.ele = $($(this)[0]);
		carouselObj.config = carouselObj.ele.data('config')||'';
		carouselOption.push(carouselObj);
	})
	window.carouselOption = carouselOption;

	var scrollOption = {};
	var $scroll = $('.page-scroll');
	scrollOption.ele = $('.page-scroll');
	scrollOption.config = $('.page-scroll').data('config');
	window.scrollOption = scrollOption;

})(window,document,jQuery)