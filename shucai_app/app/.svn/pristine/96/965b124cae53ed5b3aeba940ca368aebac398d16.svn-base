/**
 * Created by lenovo on 2017/3/30.
 */
(function () {
    //传递的参数
    var token = localStorage.getItem("token");
    var user_id = localStorage.getItem("user_id");
    var unique_id = localStorage.getItem("unique_id");
    var order_detail_url = URL.ApiUrl + '' + URL.orderDetail;    //链接
    //删除订单
    var cancelUrl = URL.ApiUrl + '' + URL.cancelOrder;
    //确认收货
    var orderConfirm = URL.ApiUrl + '' + URL.orderConfirm;
    //是否可以退货
    var refundUrl = URL.ApiUrl + '&c=User&a=return_goods_status';
    //申请归还
    var returnGood = URL.ApiUrl + '&c=Goods&a=lease_back';

//余额支付
    var payApi = URL.ApiUrl + "&c=User&a=check_paypwd"
    // ajax 获取数据
    function resdata(url, successCall) {
        $.ajax({
            type: "get",
            url: url,
            dataType: "json",
            error: function (data) {
                if (data.response.indexOf("<script>") != -1) {
                    location.reload();
                    return;
                }
                mui.toast(data.msg, {duration: 'long', type: 'div'});
            },
            success: successCall,
        });
    }


    //动态改变按钮
    function bottonName(params, callback) {
        if (params.one && callback.one_call) {
            invoke("one", params.one);
            $(".indent_way_one").on("click", callback.one_call);
        }
        if (params.two && callback.two_call) {
            invoke("two", params.two);
            $(".indent_way_two").on("click", callback.two_call);
        }
        if (params.three && callback.three_call) {
            invoke("three", params.three);
            $(".indent_way_three").on("click", callback.three_call);
        }
        function invoke(className, text) {
            $(".indent_way_" + className).text(text);
            $(".indent_way_" + className).css({"display": "block"});

        }
    }


    //确认收货回调函数
    function confirm() {
        mui.confirm('确认收货', '温馨提示', ['确认', '取消'], function (e) {
            if (e.index == 0) {
                var q = {'user_id': user_id, 'order_id': $(".user_info").data("orderid"), 'token': token};
                ajax_post(q, orderConfirm, function (data) {
                    if (data.status == '1') {
                        var btnArray = ['去评价', '再逛逛'];
                        mui.confirm('确认收货成功', '温馨提示', btnArray, function (e) {
                            if (e.index == 0) {
                                window.location.href = 'evaluate.html?order_id=' + $(".user_info").data("orderid");
                            }
                        });
                    } else {
                        mui.alert(data.msg, '');
                        history.go(0);
                    }
                });
            } else {

            }
        })

    }

//封装ajax 方法


    function ajax_post(mdata, url, success) {
        $.ajax({
            type: 'post',
            url: url,
            dataType: 'json',
            data: mdata,
            error: function (data) {
                mui.alert(data.msg);
            },
            success: success
        })
    }

    $(function () {
        //获取url中的order_id参数
        try {
            var order_id = getUrlParam('order_id');
        } catch (e) {
            mui.alert('参数错误', '温馨提示');
        }
        var url = order_detail_url.format(order_id, user_id, token); //url动态替换

        //获取订单详情
        resdata(url, function (data) {
            console.log(data);
            var type = "支付宝";
            $(".expressInfo_title").on("click", function () {
                $(".payWayCon").toggle()
            })
            $(".payWayCon").delegate("li", "click", function (e) {
                $(".payWay").text($(this).text());
                $(this).children("em").addClass("checkend");
                $(this).siblings().children("em").removeClass("checkend");
                e.stopPropagation();
                type = $(".payWay").text();
            })

            var html = template('order_goods', data.result);
            $('#itemsInfo').html(html);
            //下单时间
            /* function getLocalTime(nS) {
             return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
             }*/

            $(".orderTime").text(data.result.add_time_text)


            // if (data.result.cancel_btn == 0) {
            $(".indent_way_four").css("display", "none")
            // }
//密码框业务逻辑
            $(".bg").click(function () {
                $(".passwordBox").css("display", "none")
            });
            $(".esc").on("click", function () {
                $(".passwordBox").css("display", "none")
            })
            $("#pincode-input2").on("keyup", function () {
                console.log(1);
                var st = $(this).val();
                if (st.length == 6) {
                    $(this).blur();
                    console.log(2);
                }
            })

            $(".indent_way_four").on('click', function () {
                mui.confirm('是否要取消订单', '温馨提示', ['确认', '取消'], function (e) {
                    if (e.index == 0) {
                        var q = {
                            'user_id': user_id,
                            'order_id': $(".user_info").data("orderid"),
                            'token': token
                        };
                        ajax_post(q, cancelUrl, function (data) {
                            if (data.status == '1') {
                                mui.alert('取消成功', '', function () {
                                    location.reload();
                                });
                            } else {
                                mui.alert(data.msg, '');
                            }
                        });
                    } else {

                    }
                })

            })

            switch (data.status) {
                case -1:
                    mui.alert(data.msg, '温馨提示', function () {
                        location.href = "index.html";
                    });
                    break;
                case 1:
                    var oStatus = data.result.lease_desc;
                    if (data.result.order_status_desc === '待支付') {
                        // oStatus = '待支付';
                        $(".refund").css("display", "none");
                        $(".expressInfo_title").css("display", "inline-block")

                        bottonName({"one": "联系商家", "two": "", "three": "去支付"}, {
                            one_call: function () {
                                window.location.href = "mobile.html";
                            }, two_call: function () {
                            },
                            three_call: function () {
                                //去支付
                                var order_id = $(".user_info").data("orderid");

                                if (type == "支付宝") {
                                    //console.log(123);
                                    lhhpay("alipay", order_id, "pay")

                                } else if (type == "微信支付") {
                                    // mui.toast("抱歉,微信支付正在开发中...", {duration: 'long', type: 'div'})
                                    // return;
                                    lhhpay("wxpay", order_id, "pay")

                                } else if (type == '余额付款') {
                                    var sys = navigator.userAgent;
                                    if (sys.indexOf("OS") !== -1 || sys.indexOf("4.4") !== -1) {
                                        $("input[type='password']").css({
                                            "width": "238px",
                                            "margin-left": "-119px",
                                            "font-size": "14px"
                                        });
                                    }
                                    $.ajax({
                                        type: 'get',
                                        url: URL.SiteUrl + '/index.php?m=Api&c=User&a=userInfo',
                                        cache: false,
                                        dataType: 'json',
                                        data: {token: token, user_id: user_id},
                                        success: function (data) {
                                            console.log(data);
                                            if (data.result.paypasswd != '') {
                                                $(".passwordBox").css("display", "block");
                                                $(".payenter").on("click", function () {
                                                    var password = $("#pincode-input2").val();
                                                    console.log(password);
                                                    if (password && password.length == 6) {
                                                        ajax_post({
                                                            token: token,
                                                            user_id: user_id,
                                                            paypasswd: password
                                                        }, payApi, function (data) {
                                                            console.log(data);
                                                            if (data.status == 1) {
                                                                var CODPAYSERVER = URL.ApiUrl + '&c=User&a=check_pay&order_id=' + order_id + '&token=' + token + '&user_id=' + user_id + '&unique_id=' + unique_id;
                                                                resdata(CODPAYSERVER, function (data) {
                                                                    if (data.status == 1) {
                                                                        mui.toast('支付成功', {duration: 'long', type: 'div'});
                                                                        setTimeout(function () {
                                                                            location.href = "rentOrderDetails.html?order_id=" + order_id;
                                                                        }, 1000);
                                                                    } else {
                                                                        $("#pincode-input2").val("");
                                                                        mui.toast(data.msg, {duration: 'long', type: 'div'});
                                                                    }
                                                                    // location.href = "orderDetails.html?order_id=" + order_id;
                                                                });
                                                            } else {
                                                                mui.toast(data.msg, {duration: 'long', type: 'div'});
                                                            }
                                                        })
                                                    } else {
                                                        mui.toast("请输入6位数密码", {duration: 'long', type: 'div'});
                                                    }

                                                })
                                            } else {
                                                mui.alert("请设置支付密码", '温馨提示', function () {
                                                    location.href = "drawCashPassword.html?tag=order";
                                                });
                                            }
                                        }, error: function (data) {
                                            mui.toast(data.msg);
                                        }
                                    })

                                    return;

                                    return;
                                } else {
                                    //console.log(type);
                                    mui.toast("请选择支付方式", {duration: 'long', type: 'div'});
                                }

                            }
                        });


                    } else if (data.result.order_status_desc == '待收货') {
                        console.log(123);
                        if (data.result.shipping_status) {
                            switch (data.result.shipping_status) {
                                case "0":
                                    // oStatus = '商品分拣中'
                                    bottonName({"one": "联系商家", "two": "", "three": ""}, {
                                        one_call: function () {
                                            window.location.href = "mobile.html";
                                        },
                                        two_call: function () {
                                        },
                                        three_call: function () {
                                        }
                                    });
                                    break;
                                case "1":
                                    // oStatus = '正在配送中'
                                    bottonName({"one": "联系商家", "two": "", "three": ""}, {
                                        one_call: function () {
                                            window.location.href = "mobile.html";
                                        },
                                        two_call: function () {
                                        },
                                        three_call: function () {
                                            // confirm();
                                        }
                                    });
                                    break;
                                case "2":
                                    // oStatus = '正在配送中';
                                    bottonName({"one": "联系商家", "two": "", "three": ""}, {
                                        one_call: function () {
                                            window.location.href = "mobile.html";
                                        },
                                        two_call: function () {
                                        },
                                        three_call: function () {
                                            // confirm();
                                        }
                                    });
                                    break;
                            }
                        } else {
                            // oStatus = '待收货'
                            bottonName({"one": "联系商家", "two": "", "three": ""}, {
                                one_call: function () {
                                    window.location.href = "mobile.html";
                                },
                                two_call: function () {
                                },
                                three_call: function () {
                                    // confirm();
                                }
                            });
                        }
                    } else if (data.result.order_status_desc === '待发货') {
                        // oStatus = '待发货';
                        bottonName({"one": "联系商家", "two": "", "three": ""}, {
                            one_call: function () {
                                window.location.href = "mobile.html";
                            },
                            two_call: function () {
                            },
                            three_call: function () {
                            }
                        });
                    } else if (data.result.order_status == 2) {

                        // oStatus = '已收货';
                        // evaluate.html?order_id=801

                        bottonName({"one": "联系商家", "two": "晒单评论", "three": ""}, {
                            one_call: function () {
                                window.location.href = "mobile.html";
                            },
                            two_call: function () {
                                window.location.href = 'evaluate.html?order_id=' + $(".user_info").data("orderid");
                            },
                            three_call: function () {
                            }
                        });

                    }
                    else if (data.result.order_status == 3) {
                        // oStatus = '订单已取消';
                    } else if (data.result.order_status == 4) {
                        // $(".yz").css("display", "block");


                        // oStatus = '订单已完成';
                        bottonName({"one": "", "two": "", "three": ""}, {
                            one_call: function () {
                            },
                            two_call: function () {
                            },
                            three_call: function () {
                            }
                        });

                    } else if (data.result.order_status == 5) {
                        // oStatus = '订单已作废';
                    }


                    //console.log(data);
                    var province = data.result.province_name;  //省ID
                    var city = data.result.city_name;  //市ID
                    var district = data.result.district_name;  //县ID

                    //地址拼接
                    data.result.temp = province + city + district;

                    $(".oStatus").html(oStatus);

                    $(".order_sn").html('订单号：' + data.result.order_sn);

                    $(".order_sn").attr("data-order_sn", data.result.order_sn)
                    var html = template('userad_info', data.result);
                    $('#adress_info').html(html);


                    var html = template('calculate_money', data.result);
                    $('.payInfo').html(html);


                    $(".rentTime").each(function (i, v) {
                        var zq = +$(this).text();
                        $(this).text(parseInt(zq / 60));
                    })
                    //无法归还
                    if (data.result.lease_btn == 1) {
                        $('.lease_btn').css("display", "block");
                        $('.canNot_btn').css("display", "block");
                    }

                    //归还请求
                    $('.lease_btn').on('click', function () {

                        var order_id = $(".user_info").data("orderid");
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
                    var price = data.result.goods_list[0].market_price;
                    $('.canNot_btn').on('click', function () {
                        var order_id = $(".user_info").data("orderid");
                        location.href = "rentoutPay.html?order_id=" + order_id + "&markprice=" + price + "";
                    })


                    break;
                default:
                    mui.alert(data.msg, '温馨提示', function () {
                        location.href = "index.html";
                    });
                    break;
            }
        });


    });
})();

//**

