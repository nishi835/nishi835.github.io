// toggle
function toggle($this, $target) {
    var elm = document.getElementsByClassName($target);
    Array.prototype.forEach.call(elm, function(value){
        var style = value.currentStyle || document.defaultView.getComputedStyle(value, '');
        if (style.display == 'none') {
            value.style.display = 'block'
        } else {
            value.style.display = 'none'
        }
    });
    if ($this.className.indexOf('active') > 0) {
        $this.className = $this.className.replace(' active', '');
    } else {
        $this.className += ' active';
    }
}

// toggleを閉じる
function toggleMenu($target) {
    var elm = document.getElementsByClassName($target);
    Array.prototype.forEach.call(elm, function(value){
        var style = value.currentStyle || document.defaultView.getComputedStyle(value, '');
        if (style.display == 'block') {
            value.style.display = 'none'
        }
    });
}

// scrollAnimation
var scrollAnimationElm = document.querySelectorAll('.sa');
var scrollAnimationFunc = function() {
    for(var i = 0; i < scrollAnimationElm.length; i++) {
        var triggerMargin = 300;
        if(scrollAnimationElm[i].hasAttribute("data-triggermargin")){
            triggerMargin = Number(scrollAnimationElm[i].getAttribute("data-triggermargin"));
        }

        if(!scrollAnimationElm[i].hasAttribute("show")){
            if (window.innerHeight > scrollAnimationElm[i].getBoundingClientRect().top + triggerMargin) {
                var delayTime = scrollAnimationElm[i].getAttribute("data-delay");
                setTimeout(test, delayTime, scrollAnimationElm[i]);
            }
        }
    }
}
function test(value){
    value.classList.add('show');
}

window.addEventListener('load', scrollAnimationFunc);
window.addEventListener('scroll', scrollAnimationFunc);

// gnavの固定
var gnavElm = document.querySelector('.gnav');
var gnavFix = function(){
    if(0 <= gnavElm.getBoundingClientRect().top){
        gnavElm.classList.remove('bg-black');
    }
    if(10 > gnavElm.getBoundingClientRect().top){
        gnavElm.classList.add('bg-black');
    }
}
window.addEventListener('scroll', gnavFix);

// smoothScroll
var scrollElm = (function() {
    if('scrollingElement' in document) return document.scrollingElement;
    if(navigator.userAgent.indexOf('WebKit') != -1) return document.body;
    return document.documentElement;
})();
(function() {
    var duration = 500;
    var ignore = '.noscroll';
    var easing = function (t, b, c, d) { return c * (0.5 - Math.cos(t / d * Math.PI) / 2) + b; }; //jswing
    var smoothScrollElm = document.querySelectorAll('a[href^="#"]:not(' + ignore +')');
    Array.prototype.forEach.call(smoothScrollElm, function(elm) {
        elm.addEventListener('click', function(e) {
            e.preventDefault();
            var targetElm = document.querySelector(elm.getAttribute('href'));
            if(!targetElm) return;
            var targetPos = targetElm.getBoundingClientRect().top - 110 ;
            var startTime = Date.now();
            var scrollFrom = scrollElm.scrollTop;
            (function loop() {
                var currentTime = Date.now() - startTime;
                if(currentTime < duration) {
                    scrollTo(0, easing(currentTime, scrollFrom, targetPos, duration));
                    window.requestAnimationFrame(loop);
                } else {
                    scrollTo(0, targetPos + scrollFrom);
                }
            })();
        })
    });
})();

// twitter
function changeTwitterWidgetDesign(){
    var $twitter_widget = $('iframe.twitter-timeline');
    var $twitter_widget_contents = $twitter_widget.contents();
    
    if ($twitter_widget.length > 0 && $twitter_widget[0].contentWindow.document.body.innerHTML !== ""){
      $twitter_widget_contents.find('head').append('<link href="style.css" rel="stylesheet" type="text/css">');
    }
    else {
        setTimeout(function(){
            changeTwitterWidgetDesign();
            }, 350);
    }
}
  
changeTwitterWidgetDesign();

/*
// feathers
var opacity = 0;
var delay = 0;
var moveFlag = true;
var startTime = [];
var nowTime = [];
var opacityFeather = [];
var durationEach = [];
var featherFlag = [];

function returnFeather(){
    $('.feather').each(function(i, o){
        opacityFeater = 0.01;
        var moveX = Math.floor(Math.random() * 600) - 300;
        var moveY = -(Math.floor(Math.random() * 500) + 300);
        var scale = Math.random() * 1.5;
        durationEach.push(Math.random() * 4 + 2);
        var degX =  Math.floor(Math.random() * 120) - 60;
        var degY =  Math.floor(Math.random() * 120) - 60;
        var degZ =  Math.floor(Math.random() * 360) - 180;
        var returnPosX = Math.floor(Math.random() * 600) + 200;

        nowTime[i] = Date.now() / 1000;
        if(featherFlag[i] == false){
            opacityFeather = (nowTime[i] - startTime[i]);
            if(opacityFeather >= 1){
                featherFlag[i] = true;
            }
        }
        else{
            opacityFeather = (durationEach[i] - (nowTime[i] - startTime[i])) / 4;
        }

        $(o).css({'opacity': opacityFeather});

        if ($(o).css('opacity') <= 0){
            $(o).css({'transform': '', 'transition': ''});
            $(o).offset({top:2000, left:returnPosX});
            $(o).css({'transform': 'translateX(' + moveX + 'px) translateY(' + moveY + 'px) scale(' + scale + ',' + scale + ') rotateX(' + degX + 'deg) rotateY(' + degY + 'deg) rotateZ(' + degZ + 'deg)', 'opacity': '0',
            'transition': 'transform ' + durationEach[i] + 's ease ' + delay + 's'}); 
            startTime[i] = Date.now() / 1000; 
            featherFlag[i] = false;       
        }

        setTimeout(function(){
            returnFeather();
            }, 150);
    });
}

function moveFeathers() {
    // 実行したい処理
    $('.feather').each(function(i, o){
        var moveX = Math.floor(Math.random() * 600) - 300;
        var moveY = -(Math.floor(Math.random() * 500) + 300);
        var scale = Math.floor(Math.random() * 1.5);
        var duration = Math.floor(Math.random() * 4) + 2;
        var degX =  Math.floor(Math.random() * 120) - 60;
        var degY =  Math.floor(Math.random() * 120) - 60;
        var degZ =  Math.floor(Math.random() * 360) - 180;
        $(o).css({'transform': 'translateX(' + moveX + 'px) translateY(' + moveY + 'px) scale(' + scale + ',' + scale + ') rotateX(' + degX + 'deg) rotateY(' + degY + 'deg) rotateZ(' + degZ + 'deg)', 'opacity': '0',
        'transition': 'transform ' + duration + 's'});
        
        startTime.push(Date.now() / 1000);
        nowTime.push(0);
        featherFlag.push(false);
        opacityFeather.push(0);

    });

    returnFeather();
}

var watchMoveFeather = function(){
    if (moveFlag){
        moveFlag = false;
        moveFeathers();
    }
}

if (window.matchMedia('screen and (min-width:960px)').matches) { 
    window.addEventListener('scroll', watchMoveFeather);
}
*/

// 服装チェンジ 
$(function(){
    $(".button").on('click touchend',function(){
    var dataImg = $(this).attr('data-img');
    var dataName = $(this).attr('data-name');
    var nextImgUrl = 'images/chara/' + dataName + '/' + dataImg + '.png';
    $(".tachie").attr('src',nextImgUrl);
    });
});

// CG差し替え
$(function(){
    $(".thumbnail").on('click touchend',function(){
    var dataName = $(this).attr('data-name');
    var nextImgUrl = 'images/gallery/cg/' + dataName + '/' + dataName + '-1.png';
    $(".main-CG").attr('src',nextImgUrl);
    var img = document.getElementById("thumbnail-CG_01");
    img.onerror = function(){
        //img.removeAttribute('src');
        img.style.display = "none";
    }
    img.onload = function(){
        img.style.display = "block";
    }
    img.src = nextImgUrl;
    var nextImgUrl = 'images/gallery/cg/' + dataName + '/' + dataName + '-2.png';
    var img02 = document.getElementById("thumbnail-CG_02");
    img02.onerror = function(){
        //img02.removeAttribute('src');
        img02.style.display = "none";
        //img02.parentNode.removeChild(img02);
    }
    img02.onload = function(){
        img02.style.display = "block";
    }
    img02.src = nextImgUrl;
    var nextImgUrl = 'images/gallery/cg/' + dataName + '/' + dataName + '-3.png';
    var img03 = document.getElementById("thumbnail-CG_03");
    img03.onerror = function(){
        //img03.removeAttribute('src');
        img03.style.display = "none";
    }
    img03.onload = function(){
        img03.style.display = "block";
    }
    img03.src = nextImgUrl;
    var nextImgUrl = 'images/gallery/cg/' + dataName + '/' + dataName + '-4.png';
    var img04 = document.getElementById("thumbnail-CG_04");
    img04.onerror = function(){
        //img04.removeAttribute('src');
        img04.style.display = "none";
    }
    img04.onload = function(){
        img04.style.display = "block";
    }
    img04.src = nextImgUrl;

 //   $(".main-CG").attr('src',nextImgUrl);
 //   $(".thumbnail-CG.no01").attr('src',nextImgUrl);
 //   nextImgUrl = 'images/gallery/cg/' + dataName + '/' + dataName + '-2.png';
 //   $(".thumbnail-CG.no02").attr('src',nextImgUrl);
 //   nextImgUrl = 'images/gallery/cg/' + dataName + '/' + dataName + '-3.png';
 //   $(".thumbnail-CG.no03").attr('src',nextImgUrl);
 //   nextImgUrl = 'images/gallery/cg/' + dataName + '/' + dataName + '-4.png';
 //   $(".thumbnail-CG.no04").attr('src',nextImgUrl);

    var array = ['sayo_cg_2', 'rumi_cg_2', 'kyotsu_cg_1', 'ciel_cg_1'];
    if(array.includes(dataName)){
        nextImgUrl = 'images/gallery/cg/text_base.png';
    }
    else{
        nextImgUrl = 'images/gallery/cg/' + dataName + '_text.png';
    }
    $(".textimage").attr('src', nextImgUrl);
});

$(function(){
    $(".CG-thumbnail-button").on('click touchend',function(){
        var nextImgUrl = $(this).attr('src');
        $(".main-CG").attr('src',nextImgUrl);
    });
});

});