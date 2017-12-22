/**
 * Created by Administrator on 2017/5/15 0015.
 */
(function(){
    var token = localStorage.getItem("token");
    $(".kefu_click").on('click',function(){
        console.log(token);
        if(token){
            window.location.href = "mobile.html";
        }else{
            mui.toast("请登录", {duration: 'long', type: 'div'});
        }
    });
})();
