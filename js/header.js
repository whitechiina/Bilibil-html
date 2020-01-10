$('.lii').mouseenter(function(){
    $('.down-img').stop().fadeIn();
})
$('.lii').mouseleave(function(){
    $('.down-img').stop().fadeOut();
})
// 定时器
var step = 0;
var timer = null;
   function autoplay(){
            timer = setInterval(function(){
                step++;
                if(step == li.length){
                    step = 0;
                }
                 changImg(step);
            },500);
}
autoplay()
var dot = document.getElementsByClassName('dot')[0];
var li = dot.getElementsByTagName('li');
for(var i = 0; i < li.length; i++){
    li[i].index = i;
    li[i].onmouseover = function(){
        step = this.index;
    }
}