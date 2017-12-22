/**
 * Created by lenovo on 2017/4/27.
 */
/**
 * Created by lenovo on 2017/3/21.
 */
(function () {
    // $(".footNav").html(footerNav.str)
    var token = localStorage.getItem("token");
    var user_id = localStorage.getItem("user_id");
    var unique_id = localStorage.getItem("unique_id");
    var page;


    template.helper("zuqitime", function (data) {
        return parseInt(data) / 60;
    });
    
    
    $.ajax({
        type: 'get',
        url: URL.ApiUrl + URL.rentout,
        //指定传入的数据格式为json
        dataType: 'json',
        //成功后执行函数,获得一个返回数据对象data
        success: function (data) {
            console.log(data);
            $("#lodding").hide();
            $(".nomore").show()
            if(data.status==-1){
                $("#zanwu").css("display","block");
            }
            //console.log(data);
            // console.log(data);
//          banner图片渲染
            var html = template('snap_banner', data.result);
            $('#snapBanner').html(html);
// 			每日抢购数据
            var html = template('temp_snap', data.result);
            $('#hotItems').html(html);
            //添加到购物车
           /* $(".zuqi").each(function (i,v) {
                var zq= +$(this).text();
                $(this).text(parseInt(zq/60));
            })*/

            $(".shopping_buy").off("click").on("click", function () {
                var gid = $(this).attr("data_goods_id");
                var gprice = $(this).attr("data_shop_price");
                // console.log(goods_id)
                $.ajax({
                    type: 'post',
                    url: URL.ApiUrl + URL.rentouCanLease,
                    data: {
                        user_id: user_id,
                        unique_id: unique_id,
                        token: token,
                        goods_id: gid,
                        // goods_num: gooods_num
                    },
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.status==1){
                            plus.webview.open("rentoutOrder.html?rentoutOrder="+gid+"&price="+gprice+"");
                            // location.href="rentoutOrder.html?rentoutOrder="+gid+"&price="+gprice+"";
                        }else {
                            mui.toast(data.msg, {duration: 'long', type: 'div'});
                        }

                        // alert(data.msg)
                    }
                })
            })


//            顶部跳转部分 start
            var timer = null;

            function scroll() {
                return {
                    top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
                    left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
                }
            }

            function scrollTo(target, leader) {
                timer = setInterval(function () {
                    var step = (target - leader) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    leader = leader + step;
                    window.scrollTo(0, leader);
                    if (leader === target) {
                        clearInterval(timer);
                    }
                }, 20)
            }

            $('.back_top').on('click', function () {
                var top = scroll()
                scrollTo(0, top.top)
            });
//        	顶部跳转部分 end
        },

        beforeSend: function () {
            $("#lodding").show();
            $(".nomore").hide();
        },error:function (data) {
            $("#lodding").hide();
            mui.toast(data.msg, {duration: 'long', type: 'div'});
        }
    })
    addFooterNavListener(2);





    page=1;

    refresh({
        content: ".hot",
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
            console.log(123);
            setTimeout(function () {
                that.back.call();
                that.hideDown();
                var tag = true;

                if (tag) {
                    /**
                     * TODO
                     */

                    page++;
                    $.ajax({
                        type: 'get',
                        url: URL.ApiUrl + URL.rentout+"&p="+page+"",
                        //指定传入的数据格式为json
                        dataType: 'json',
                        //成功后执行函数,获得一个返回数据对象data
                        success: function (data) {

// 			每日抢购数据
                            console.log(data.result);  
                            if (data.status==1){
                                var html = template('temp_snap', data.result);
                                $('#hotItems').append(html);
                            }
                            that.hideDown();
                            var $goods_list = data.result;
                            if (!$goods_list || !$goods_list.length) {
                                console.log(132);
                                that.showNull();
                            }

                            $(".shopping_buy").off("click").on("click", function () {
                                var gid = $(this).attr("data_goods_id");
                                var gprice = $(this).attr("data_shop_price");
                                $.ajax({
                                    type: 'post',
                                    url: URL.ApiUrl + URL.rentouCanLease,
                                    data: {
                                        user_id: user_id,
                                        unique_id: unique_id,
                                        token: token,
                                        goods_id: gid,
                                    },
                                    dataType: 'json',
                                    success: function (data) {
                                        console.log(data);
                                        if (data.status==1){
                                            plus.webview.open("rentoutOrder.html?rentoutOrder="+gid+"&price="+gprice+"");
                                        }else {
                                            mui.toast(data.msg, {duration: 'long', type: 'div'});
                                        }


                                    }
                                })
                            })
                        }
                    });

                    tag = false;

                    // that.hideDown();

                    // that.showNull();
                }
            }, 1000);
        }
    });
})();