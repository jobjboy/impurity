/**
 * Created by lenovo on 2017/4/11.
 */
function swiperLoading(pBox, cBox) {
    var pBox = document.querySelector(pBox)
    var cBox = pBox.querySelector(cBox)
    var pHeight = 670;
    var cHeight = cBox.offsetHeight;
    
    
    /*translateY 初始的定位 其实就是最大定位 0*/
    var maxY = 0;
    /*translateY 滑动到最下面的定位 其实就是最小定位 父容器高度-子容器高度*/
    var minY = pHeight-cHeight;
    /*自己定义缓冲的距离*/
    var distance = 100;
    /*translateY 最大滑动定位*/
    var maxSwipe = maxY + 100;
    /*translateY 最小滑动定位*/
    var minSwipe = minY
    //console.log("最小"+minY);
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    var isMove  = false;

    var currY = 0;/*记录当前的定位 全局  相当于轮播图当中的index*/

    /*定义公用的方法*/
    var addTransition = function(){
        cBox.style.webkitTransition = "all .2s";
        cBox.style.transition = "all .2s";
    }
    var removeTransition = function(){
        cBox.style.webkitTransition = "none";
        cBox.style.transition = "none";
    }
    var setTranslateY = function(y){
        cBox.style.webkitTransform = "translateY("+y+"px)";
        cBox.style.transform = "translateY("+y+"px)";
    }

    /*绑定事件*/
    cBox.addEventListener('touchstart',function(e){
        startY = e.touches[0].clientY;
    });
    cBox.addEventListener('touchmove',function(e){
        moveY = e.touches[0].clientY;
        distanceY = moveY-startY;
        //console.log(distanceY);
        /*清除过度*/
        removeTransition();
        /*设置定位*/
        /*第二步 2.当滑动到一定的距离的时候不能滑动  滑动区间*/
        /*当前要做定位的位子需要在滑动区间内*/
        if((currY + distanceY) < maxSwipe &&　(currY + distanceY) > minSwipe){
            setTranslateY(currY + distanceY);
        }

    });
    window.addEventListener('touchend',function(e){
        /*第二步 3.当触摸结束的时候  需要判断是否在定位区间内  否则吸附回去  定位回去*/
        /*当往下滑的时候 大于 最大定位*/
        //console.log("最小定位"+minY);
        //console.log("最大定位"+maxY);
        //console.log("移动距离"+distanceY);
        //console.log("移动距离"+distanceY);
        //console.log("记录距离"+currY);
        if(( currY + distanceY)>maxY){
            currY = maxY;
            addTransition();
            setTranslateY(currY);
        }
        /*当往上滑的时候 小于 最小定位*/
        else if(( currY + distanceY)>minY){
            //console.log("最小吸附回去");
            currY;
            addTransition();
            setTranslateY(currY);
        }
        else{
            /*记录当前的定位   上一次当前的定位 + 这一次改变的定位*/
            currY = currY + distanceY;
        }

        /*重置所有的参数  不重置currY */
        startY = 0;
        moveY =0;
        distanceY = 0;
        isMove = 0;
    });
    
    
} 