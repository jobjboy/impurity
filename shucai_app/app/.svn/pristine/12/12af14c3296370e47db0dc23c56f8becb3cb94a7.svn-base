/**
 * Created by lenovo on 2017/3/22.
 */

$(document).ready(function () {
    $(".footNav").html(footerNav.str)


    addFooterNavListener(4);

    var token = localStorage.getItem("token");
    var user_id = localStorage.getItem("user_id");
    var unique_id = localStorage.getItem("unique_id");
    if (!token || !user_id) {
        location.href = "login.html";
    }
    $.ajax({
        type: 'get',
        url: URL.SiteUrl + '/index.php?m=Api&c=User&a=userInfo',
        cache: false,
        dataType: 'json',
        data: {token: token, user_id: user_id},
        success: function (data) {
            console.log(data);

            $("#lodding").hide();
            $(".mui-content").show();



            if (data.status == -102 || data.status == -101) {
                mui.toast("请重新登录");
                localStorage.removeItem("token");
                location.href = "login.html"
            }
            var html = template("user_info", data.result);
            $("#userInfo").html(html);
            var head_pic;
            // console.log(data.result.head_pic);
            if (data.result.head_pic) {
                $("#header_pic img").attr("src",data.result.head_pic+'?t='+new Date().getTime())
                // "-webkit-background-size": "90px ",
                // "background-size": "90px"
            } else {
                $("#header_pic img").attr("src","images/personal/toux.png");
            }
            //增加数字角标
            function numMay(num, type) {
                var $$ = $(".nav li:nth-child(" + num + ") .mui-badge-danger")
                if (type !== "0") {
                    $$.css("display", "block");
                    $$.text(type);
                }
            }

            numMay(1, data.result.waitPay);
            numMay(2, data.result.waitSend);
            numMay(3, data.result.waitReceive);
            numMay(4, data.result.waitComment);
            numMay(5, data.result.returnGoods);

            /*   $('body').delegate('a','click',function(event){
             if($(event.currentTarget).attr('class') == "setting_icon"){
             // $('.message_alert').show();
             // $('.ban').show();
             location.href="mobile.html"
             }
             });*/
            /*$('.ban').on('click',function(){
             $('.message_alert').hide();
             $(this).hide();
             });*/


            $("#header_pic").on("click",function () {
                location.href="user.html";
            })
        },
        error: function (data) {
            $("#lodding").hide();
            mui.toast(data.msg, {duration: 'long', type: 'div'})
        },
        beforeSend: function () {
            $("#lodding").show();
            $(".mui-content").hide();
        }
    })

    $.ajax({
        type: 'post',//用post方法获取
        //获取首页数据
        url: URL.SiteUrl + '/index.php?m=Api&c=Index&a=get_laster_cartnum',
        //指定传入的数据格式为json
        dataType: 'json',
        data:{unique_id:unique_id,user_id:user_id},

        //成功后执行函数,获得一个返回数据对象data
        success: function (data) {
            if(data.status==1){
                if (data.result!==0){
                    $(".car_count").text(data.result)
                    $(".car_count").show();
                }
            }
            console.log(data);
        }
    });

    /*  refresh({
     content: "#hotItems",
     down: ".pre_lodding",
     up: ".up_lodding",
     null:".null"
     }, {
     upCallback: function (e) {
     var that = this;
     setTimeout(function () {
     that.back.call();
     that.hideUp();
     }, 2000);
     },
     downCallback: function (e) {
     var that = this;
     setTimeout(function () {
     that.back.call();
     page++;
     $.ajax({
     type: 'get',
     url: URL.ApiUrl + URL.guessYouLike,
     data: {p: page},
     dataType: 'json',
     success: function (data) {
     that.hideDown();
     var html = template('temp_recommend', data);
     // console.log(html);
     $('#hotItems').append(html);
     var $goods_list = data.result;

     if (!$goods_list || !$goods_list.length) {
     that.showNull();
     }


     },
     error: function (data) {
     mui.toast("温馨提示，请求失败", {duration: 'long', type: 'div'})function () {
     });
     },
     });
     }, 2000);
     }
     });*/
});


