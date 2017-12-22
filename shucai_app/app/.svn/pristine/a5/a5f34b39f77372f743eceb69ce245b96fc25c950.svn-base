(function () {

    var token = localStorage.getItem("token");
    var user_id = localStorage.getItem("user_id");
    var unique_id = localStorage.getItem("unique_id");
    var tag;
    var show_time;


    //订单列表
    var listUrl = URL.ApiUrl + '&c=Goods&a=my_lease_list';

    //删除订单
    var cancelUrl = URL.ApiUrl + '' + URL.cancelOrder;

    //确认收货
    var orderConfirm = URL.ApiUrl + '' + URL.orderConfirm;

    //申请归还

    var returnGood = URL.ApiUrl + '&c=Goods&a=lease_back';


    function add0(m) {
        return m < 10 ? '0' + m : m
    }

    function format(shijianchuo) {
//shijianchuo是整数，否则要parseInt转换
        var time = new Date(shijianchuo * 1000);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
    }


    console.log(format(1497526780));
    function ajax_post(mdata, url, success, beforsend) {
        $.ajax({
            type: 'post',
            url: url,
            dataType: 'json',
            data: mdata,
            error: function (data) {
                // alert("请求失败")
                $("#lodding").css({"display": "none"});
                mui.toast(data.msg, {duration: 'long', type: 'div'});
            },
            success: success,
            beforeSend: beforsend
        })
    }

    function payment_function() {
        //删除订单
        $(".off_order").off('click').on('click', function () {
            var this_button = $(this);

            mui.confirm('是否要取消订单', '温馨提示', ['确认', '取消'], function (e) {
                if (e.index == 0) {
                    var q = {'user_id': user_id, 'order_id': this_button.data('orderid'), 'token': token};
                    ajax_post(q, cancelUrl, function (data) {
                        if (data.status == '1') {
                            this_button.parents('.indent-list1').remove();
                            this_button.parents('.mui-input-group').remove();
                            mui.toast('取消成功', {duration: 'long', type: 'div'});
                        } else {
                            mui.alert(data.msg, '');
                        }
                    });
                } else {

                }
            })

        });


        //去支付
        $(".go_to_pay").on('click', function () {
            var order_id = $(this).data("orderid");
            window.location.href = 'rentOrderDetails.html?order_id=' + order_id;
        });


        //收货操作
        /*   $(".receive-order").on("click",function () {
         var this_button = $(this);

         mui.confirm('确认收货', '温馨提示', ['确认', '取消'], function (e) {
         if (e.index == 0) {
         // user_id         order_id        token
         var q = {'user_id': user_id, 'order_id': this_button.data('orderid'), 'token': token};
         ajax_post(q, orderConfirm, function (data) {
         if (data.status == '1') {
         this_button.parents('.indent-list1').remove();
         var btnArray = ['去评价', '再逛逛'];
         mui.confirm('确认收货成功', '温馨提示', btnArray, function(e) {
         if (e.index == 0) {
         window.location.href = 'evaluate.html?order_id='+this_button.data("orderid");
         }else {
         history.go(0);
         }
         });
         } else {
         mui.alert(data.msg);
         }
         });
         } else {

         }
         })

         })*/

    }

    function show_time() {
        $(".time_w").each(function () {

            var time_start = $(this).attr("data-leasetime") * 1;
            time_start = new Date(time_start).getTime() * 1000;//设定开始时间
            var time_end = new Date().getTime(); //设定结束时间(等于系统当前时间)
            //计算时间差
            var time_distance = time_end - time_start;
            if (time_distance > 0) {
                // 天时分秒换算
                var int_day = Math.floor(time_distance / 86400000)
                time_distance -= int_day * 86400000;

                var int_hour = Math.floor(time_distance / 3600000)
                time_distance -= int_hour * 3600000;

                var int_minute = Math.floor(time_distance / 60000)
                time_distance -= int_minute * 60000;

                var int_second = Math.floor(time_distance / 1000)
                // 时分秒为单数时、前面加零
                if (int_day < 10) {
                    int_day = "0" + int_day;
                }
                if (int_hour < 10) {
                    int_hour = "0" + int_hour;
                }
                if (int_minute < 10) {
                    int_minute = "0" + int_minute;
                }
                if (int_second < 10) {
                    int_second = "0" + int_second;
                }

                $(this).find('.time_d').html(int_day);
                $(this).find('.time_h').html(int_hour);
                $(this).find('.time_m').html(int_minute);
                $(this).find('.time_s').html(int_second);
                setTimeout(function () {
                    show_time();
                }, 1000);
            } else {
                $(this).find('.time_d').html('00');
                $(this).find('.time_h').html('00');
                $(this).find('.time_m').html('00');
                $(this).find('.time_s').html('00');
            }
        });
    }


   /* template.helper("test", function (a) {
        return parseInt(a);
    });*/


// console.log(index);
    template.helper("zuqitime", function (data) {

        //   outtimr = (data.result.goods_list[0].lease_zuqi*1)/60;
        return  parseInt(data)/60;
        // var outtimr = (data.result.goods_list[0].lease_zuqi*1);
        //   return handle;
        // return isInvalid;
    });

    template.helper("begintime", function (data) {

        //   outtimr = (data.result.goods_list[0].lease_zuqi*1)/60;
        return format(data);
        // var outtimr = (data.result.goods_list[0].lease_zuqi*1);
        //   return handle;
        // return isInvalid;
    });

    str = '<div class="noorder noorder_all"><div class="noorder-img"><img src="./images/noorder.png"></div><div class="noorder-title">您还没有相关订单</div></div>';

    ajax_post({user_id: user_id, token: token}, listUrl, function (data) {
        $("#lodding").css({"display": "none"});
        $("#tab_conbox").css({"display": "block"});
        console.log(data);
        if (data.status != 1 && data.status != 0) {
            mui.alert(data.msg, '', function () {
                window.location.href = 'login.html';
            });
        }

        // --------------------------------------------
        $("#dd_all").show()
        var html = template('all_tpl', data);



        //数据

        // var html = template('test', data);//渲染模板
        // document.getElementById('content').innerHTML = html;
        // --------------------------------------------
        $('#all_list').html(html);

        //订单状态渲染
        var lease_descArr = [];
        $(".lease_desc").each(function (i, v) {
            lease_descArr.push(data.result[i].lease_desc)
            $(this).text(lease_descArr[i]);
        })


        /* //租期转换
         $(".rentTime").each(function (i, v) {
         var zq = +$(this).text();
         $(this).text(parseInt(zq / 60));
         })*/


        if (data.result.length == 0) {
            console.log(123);
            $("#dd_all").show()
            $('.model').html('').append(str)
        }
        payment_function();

//租借开始时间转换
       /* $(".beginTime").each(function (i, v) {
            var beginTimes = +$(this).text();
            $(this).text(format(beginTimes));
        })*/
//租借结束时间
        $(".endTime").each(function (i, v) {
            var endTime = +$(this).text();
            $(this).text(format(endTime));
        })
        //最迟归还时间
        $(".laterTime").each(function (i, v) {
            var laterTime = +$(this).text();
            $(this).text(format(laterTime));

        })
        //已租借时间

        /* $(".time_w").each(function (i,v) {
         var yizutime=$(this).attr("data-leasetime");
         console.log(yizutime);
         $(this).attr("data-leasetime",format(yizutime*1));
         })*/

        show_time();
        $('.lease_btn').off('click').on('click', function () {

            console.log(123);
            var order_id = $(this).attr("data-orderid");
            $.ajax({
                type: 'post',
                url: returnGood,
                data: {order_id: order_id, token: token, user_id: user_id},
                dataType: 'json',
                success: function (res) {
                    console.log(res);
                    if (res.status == 1) {
                        mui.alert("申请成功,等待审核", '温馨提示', function () {
                            location.reload();
                        });
                    } else {
                        mui.toast(res.msg)
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    mui.toast('网络失败，请刷新页面后重试');
                }
            })
        })

        //无法归还

        $('.canNot_btn').off('click').on('click', function () {
            var order_id = $(this).attr("data-orderid");
            location.href = "rentoutPay.html?order_id=" + order_id + "";
        })


    }, function (data) {
        //console.log(ajaxArguments[index]);
        $("#lodding").css({"display": "block"});
        $("#tab_conbox").css({"display": "none"});

    })


    var oldIndex = -1, page = 1;


    tag = refresh({
        content: ".tab_conbox",
        down: ".pre_lodding",
        // up: ".up_lodding",
        null: ".null"
    }, {
        upCallback: null,
        downCallback: function (e) {
            var that = this;
            setTimeout(function () {
                that.back.call();

                // that.back.call();
                page++;
                // ajaxArguments[index].p = page;
                ajax_post({user_id: user_id, token: token, p: page}, listUrl, function (data) {
                    console.log(data);
                    if (data.status != 1 && data.status != 0) {
                        mui.alert(data.msg, '', function () {
                            window.location.href = 'login.html';
                        });
                    }
                    var html = template('all_tpl', data);
                    /*template.helper("zuqitime",function(data){

                     outtimr1 = (data.result.goods_list[0].lease_zuqi*1)/60;
                     return outtimr1;
                     });*/
                    $('#all_list').append(html);
                    payment_function();
                    show_time();
                    $('.lease_btn').off('click').on('click', function () {
                        var order_id = $(this).attr("data-orderid");
                        $.ajax({
                            type: 'post',
                            url: returnGood,
                            data: {order_id: order_id, token: token, user_id: user_id},
                            dataType: 'json',
                            success: function (res) {
                                console.log(res);
                                if (res.status == 1) {
                                    mui.alert("申请成功,等待审核", '温馨提示', function () {
                                        location.reload();
                                    });
                                } else {
                                    mui.toast(res.msg)
                                }
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                mui.toast('网络失败，请刷新页面后重试');
                            }
                        })
                    })


                    //无法归还
                    $('.canNot_btn').off('click').on('click', function () {
                        var order_id = $(this).attr("data-orderid");
                        location.href = "rentoutPay.html?order_id=" + order_id + "";
                    })
                    // var html = template(id + '_tpl', data);
                    // $('#' + id + '_list').append(html);
                    that.hideDown();
                    var $goods_list = data.result;

                    if (!$goods_list || !$goods_list.length) {
                        that.showNull();
                    }
                });
            }, 100);
        }
    });


})();