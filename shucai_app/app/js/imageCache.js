/**
 * Created by Administrator on 2017/5/4 0004.
 */
var Count = 0;
var Imgs;
var ImgLoaded =0;
var listss;
var cb;
//预加载图片
function preLoadImgs(list,callback)
{
    listss = list;
    Count = list.length;
    Imgs = new Array(Count);
    cb = callback;
    //console.log('图片加载中请稍等......');

    for(var i=0;i<list.length;i++){
        Imgs[i]=new Image();
        downloadImage(i);
    }
}

//加载单个图片
function downloadImage(i)
{
    if(listss[i].nav_img){
        Imgs[i].src = listss[i].nav_img;
        Imgs[i].onLoad=validateImages(i);
    }else{
        Imgs[i].src = "images/no_image.gif";
        Imgs[i].onLoad=validateImages(i);
    }
}

//验证是否成功加载完成，如不成功则重新加载
function validateImages(i){
    if (!Imgs[i].complete)
    {
        window.setTimeout('downloadImage('+i+')',200);
    }
    else if (typeof Imgs[i].naturalWidth != "undefined" && Imgs[i].naturalWidth == 0)
    {
        window.setTimeout('downloadImage('+i+')',200);
    }
    else
    {
        ImgLoaded++
        if(ImgLoaded == Count)
        {
            cb(Imgs);
            //console.log('图片加载完毕！');
        }
    }
}
