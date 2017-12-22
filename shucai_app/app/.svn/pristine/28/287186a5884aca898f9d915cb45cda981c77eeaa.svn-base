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
    //退款
    var refund_orderapi = URL.ApiUrl + '&c=User&a=refund_order';
    //取消退款
    var cancel_refundApi = URL.ApiUrl + '&c=User&a=cancel_refund';
//余额支付
    var payApi = URL.ApiUrl + "&c=User&a=check_paypwd"

    // ajax 获取数据
    function resdata(url, successCall) {
        $.ajax({
            type: "get",
            url: url,
            dataType: "json",
            error: function (data) {
                // console.log(data.response);
                console.log(data);
                if (data.responseText.indexOf("<script>") != -1) {
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

    //再次购买方法
    function buyAgain() {
        var arr = [];
        $(".item_info").each(function (i, v) {
            arr.push({
                'goods_num': $(v).find(".item_num").attr('data-num'),
                'goods_id': $(v).find(".indent-list-img").attr('data-id')
            });
        })
        // console.log(arr);
        $.ajax({
            type: 'post',
            url: URL.ApiUrl + URL.addCarts,
            data: {
                user_id: user_id,
                unique_id: unique_id,
                token: token,
                goods: arr
            },
            dataType: 'json',
            success: function (data) {
                //console.log(data);
                mui.alert(data.msg, '温馨提示', function () {
                    window.location.href = "shopping_cart.html"
                });
            },
            error: function (data) {
                mui.toast(data.msg, {duration: 'long', type: 'div'})
            },
        });
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
                            }else {
                                history.go(0);
                            }
                        });
                    } else {
                        mui.alert(data.msg, '');
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

            if (data.result.order_status_detail !==""){
                $(".sendStatus").text(data.result.order_status_detail);
            }


            if (data.result.invoice_url){
                $(".bill_info1").css("display","block");
                $(".bill_info1").on("click",function () {
                    // location.href=data.result.invoice_url;
                    // plus.webview.open("http://192.168.0.116/Public/upload/thumb/6bb7e1a5edde4975677d1d4be3634db2.jpeg");
                    localStorage.setItem("invoice",data.result.invoice_url);
                    location.href="show_imagefp.html";
                })
            }

            //下单时间
           /* function add0(m){return m<10?'0'+m:m }
            function format(shijianchuo) {
//shijianchuo是整数，否则要parseInt转换
                var time = new Date(shijianchuo*1000);
                var y = time.getFullYear();
                var m = time.getMonth()+1;
                var d = time.getDate();
                var h = time.getHours();
                var mm = time.getMinutes();
                var s = time.getSeconds();
                return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
            }*/

            // console.log(format(data.result.add_time));
            $(".orderTime").text(data.result.add_time_text)

            var sendTimes = String(data.result.ps).split("*")[1];
            var psTime1 = String(data.result.ps).split("*")[0];
            if (psTime1.indexOf("即时")!=-1){
                $(".sendTime").text("立即配送");
            }else {
                $(".sendTime").text(sendTimes);
            };

            if(data.result.shipping_time==0||data.result.shipping_time== null){
                $(".ssendTime").hide();
            }else {
                $(".sendTimest").text(data.result.shipping_time_text);
            }
            //申请退款按钮
            if (data.result.refund_btn == 1) {
                $(".refund_btn").css("display", "block");
            }
            if (data.result.cancel_refund_btn == 1) {
                $(".cancel_refund_btn").css("display", "block");
            }
//取消订单按钮
//             if (data.result.cancel_btn == 0) {
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

            //申请退款操作
            $(".refund_btn").on("click", function () {
                ajax_post({
                    order_id: order_id,
                    order_sn: data.result.order_sn,
                    token: token,
                    user_id: user_id
                }, refund_orderapi, function (data) {
                    console.log(data);
                    if (data.status == '1') {
                        mui.alert(data.msg, '温馨提示', function () {
                            location.reload();
                        });
                    } else {
                        mui.alert(data.msg, '');
                    }
                });
            })

            //取消退款操作
            $(".cancel_refund_btn").on("click", function () {
                ajax_post({
                    order_id: order_id,
                    order_sn: data.result.order_sn,
                    token: token,
                    user_id: user_id
                }, cancel_refundApi, function (data) {
                    console.log(data);
                    if (data.status == '1') {
                        mui.alert(data.msg, '温馨提示', function () {
                            location.reload();
                        });
                    } else {
                        mui.alert(data.msg, '');
                    }
                });
            })

            //申请退换货
            $(".return_btn").on("click", function () {
                var goodsid = $(this).attr('data-goods_id');
                var order_id = $(this).attr('data-orderid');
                var dataorder_sn = $(this).attr('data-order_sn');
                console.log(goodsid);
                var refundData = {
                    order_id: order_id,
                    goods_id: goodsid,
                    token: token,
                    user_id: user_id,
                    unique_id: unique_id
                }
                // console.log(dataorder_sn);
                var refundUrl = URL.ApiUrl + '&c=User&a=return_goods_status';
                ajax_post(refundData, refundUrl, function (data) {
                    console.log(data);
                    if (data.result == -1) {
                        location.href = "refund.html?" + order_id + "?" + goodsid + "?" + dataorder_sn + "";
                    } else {
                        mui.toast(data.msg)
                    }
                })
            })

            //取消退换货
            $(".cancel_return_btn").on("click", function () {
                var goodsid = $(this).attr('data-goods_id');
                var order_id = $(this).attr('data-orderid');
                var dataorder_sn = $(this).attr('data-order_sn');
                console.log(goodsid);
                var refundData = {
                    order_id: order_id,
                    goods_id: goodsid,
                    token: token,
                    user_id: user_id,
                    unique_id: unique_id,
                    order_sn: dataorder_sn
                }
                // console.log(dataorder_sn);
                var refundUrl = URL.ApiUrl + '&c=User&a=cancel_return';
                ajax_post(refundData, refundUrl, function (data) {
                    console.log(data);
                    if (data.status == 1) {
                        mui.alert(data.msg, '温馨提示', function () {
                            location.reload();
                        });
                    } else {
                        mui.toast(data.msg)
                    }
                })
            })

            //取消订单操作
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
                    // {{if $value.order_status == 0}}
                    //     待商家确认
                    // {{else if $value.order_status == 1}}
                    // {{if $value.shipping_status ==0}}
                    //     商家已确认,商品分拣中
                    // {{else if $value.shipping_status == 1}}
                    //     商品正在配送中
                    // {{else if $value.shipping_status == 2}}
                    //     订单的商品部分配送中
                    // {{/if}}
                    // {{else if $value.order_status == 2}}
                    //     已收货
                    // {{else if $value.order_status == 3}}
                    //     订单已取消
                    // {{else if $value.order_status == 4}}
                    //     订单已完成
                    // {{else if $value.order_status == 5}}
                    //     订单已作废
                    // {{/if}}
                    //console.log(data);
                    //console.log(data.result.order_status_desc);

                    var oStatus = '';
                    if (data.result.order_status_desc === '待支付') {
                        oStatus = '待支付';
                        $(".expressInfo_title").css("display", "inline-block")

                        bottonName({"one": "联系商家", "two": "", "three": "去支付"}, {
                            one_call: function () {
                                window.location.href = "mobile.html";
                            },
                            two_call: function () {
                                var q = {
                                    'user_id': user_id,
                                    'order_id': $(".user_info").data("orderid"),
                                    'token': token
                                };
                                ajax_post(q, cancelUrl, function (data) {
                                    if (data.status == '1') {
                                        mui.alert('删除成功', '', function () {
                                            window.location.href = 'personal.html';
                                        });
                                    } else {
                                        mui.alert(data.msg, '');
                                    }
                                });
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

                                } else if (type == '货到付款') {
                                    var CODPAYSERVER = 'http://192.168.0.116/index.php?m=Api&c=Payment&a=getCode&pay_code=cod&appid=HBuilder&order_id=' + order_id + '';
                                    resdata(CODPAYSERVER, function (data) {
                                        location.href = "orderDetails.html?order_id=" + order_id;
                                        location.reload();
                                    });
                                    return;
                                } else if (type == '余额付款') {
                                    var sys = navigator.userAgent;
                                    if (sys.indexOf("OS") !== -1 || sys.indexOf("4.4") !== -1) {
                                        $("input[type='password']").css({"width":"238px","margin-left":"-119px","font-size":"14px"});
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
                                                $(".payenter").off("click").on("click",function () {
                                                    var password = $("#pincode-input2").val();
                                                    console.log(password);
                                                    if (password && password.length == 6) {
                                                    } else {
                                                        mui.toast("请输入6位数密码", {duration: 'long', type: 'div'});
                                                    }
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
                                                                        location.href = "orderDetails.html?order_id=" + order_id;
                                                                    }, 1000);
                                                                } else {
                                                                    $("#pincode-input2").val("");
                                                                    mui.toast(data.msg, {duration: 'long', type: 'div'});
                                                                }
                                                                // location.href = "orderDetails.html?order_id=" + order_id;
                                                            });
                                                        }
                                                        mui.toast(data.msg, {duration: 'long', type: 'div'});
                                                    })
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
                                }/*else if (type == "货到付款") {
                                 // console.log(12);
                                 var urls = {
                                 url1: URL.SiteUrl + "/index.php?m=Api&c=Cart&a=cart2",
                                 calculate_url: URL.ApiUrl + URL.calculate,            //计算购物车金额
                                 };

                                 function resdata2(url, mdata, successCall) {
                                 $.ajax({
                                 type: "post",
                                 url: url,
                                 data: mdata,
                                 async: false,
                                 dataType: "json",
                                 error: function (data) {
                                 mui.toast("温馨提示，请求失败", {duration: 'long', type: 'div'})
                                 },
                                 success: successCall,
                                 })
                                 }

                                 var address_id;
                                 var shipping_code;
                                 var submit_order = "submit_order";
                                 var require_data = {};
                                 var data1 = {user_id: user_id, token: token}

                                 resdata2(urls.url1, data1, function (data) {
                                 console.log(123);
                                 console.log(data);
                                 // shipping_code = data.result.shippingList[0].code;
                                 //  address_id = data.result.addressList.address_id;
                                 return;
                                 require_data.user_id = user_id;
                                 require_data.token = token;
                                 require_data.address_id = address_id;
                                 require_data.act = submit_order;
                                 require_data.shipping_code = shipping_code;
                                 console.log(address_id);

                                 resdata2 (urls.calculate_url,require_data,function (data) {
                                 console.log(132);
                                 console.log(data);
                                 // return;
                                 // location.href = "orderDetails.html?order_id=" + order_id;
                                 history.go(0);
                                 })

                                 })


                                 // location.href = "orderDetails.html?order_id=" + order_id;
                                 } */ else {
                                    //console.log(type);
                                    mui.toast("请选择支付方式", {duration: 'long', type: 'div'});
                                }

                                // console.log(order_id);
                            }
                        });


                    } else if (data.result.order_status_desc == '待收货') {
                        console.log(123);
                        if (data.result.shipping_status) {
                            switch (data.result.shipping_status) {
                                case "0":
                                    oStatus = '商品分拣中'
                                    bottonName({"one": "联系商家", "two": "", "three": "再次购买"}, {
                                        one_call: function () {
                                            window.location.href = "mobile.html";
                                        },
                                        two_call: function () {
                                        },
                                        three_call: function () {
                                            buyAgain();
                                        }
                                    });
                                    break;
                                case "1":
                                    oStatus = '正在配送中'
                                    //确认收货
                                    bottonName({"one": "联系商家", "two": "再次购买", "three": ""}, {
                                        one_call: function () {
                                            window.location.href = "mobile.html";
                                        },
                                        two_call: function () {
                                            buyAgain();
                                        },
                                        three_call: function () {
                                            // confirm();
                                        }
                                    });
                                    break;
                                case "2":
                                    oStatus = '正在配送中';
                                    //确认收货
                                    bottonName({"one": "联系商家", "two": "再次购买", "three": ""}, {
                                        one_call: function () {
                                            window.location.href = "mobile.html";
                                        },
                                        two_call: function () {
                                            buyAgain();
                                        },
                                        three_call: function () {
                                            // confirm();
                                        }
                                    });
                                    break;
                            }
                        } else {
                            oStatus = '待收货'
                            //确认收货
                            bottonName({"one": "联系商家", "two": "再次购买", "three": ""}, {
                                one_call: function () {
                                    window.location.href = "mobile.html";
                                },
                                two_call: function () {
                                    buyAgain();
                                },
                                three_call: function () {
                                    // confirm();
                                }
                            });
                        }


                    } else if (data.result.order_status_desc === '待发货') {
                        oStatus = '待发货';
                        bottonName({"one": "联系商家", "two": "", "three": "再次购买"}, {
                            one_call: function () {
                                window.location.href = "mobile.html";
                            },
                            two_call: function () {
                            },
                            three_call: function () {
                                buyAgain();
                            }
                        });
                    } else if (data.result.order_status == 2) {

                        oStatus = '已收货';
                        // evaluate.html?order_id=801

                        bottonName({"one": "联系商家", "two": "晒单评论", "three": "再次购买"}, {
                            one_call: function () {
                                window.location.href = "mobile.html";
                            },
                            two_call: function () {
                                window.location.href = 'evaluate.html?order_id=' + $(".user_info").data("orderid");
                            },
                            three_call: function () {
                                buyAgain();
                            }
                        });

                    } else if (data.result.order_status_desc == "退款审核中") {
                        oStatus = '退款审核中';
                        bottonName({"one": "联系商家", "two": "", "three": "再次购买"}, {
                            one_call: function () {
                                window.location.href = "mobile.html";
                            },
                            two_call: function () {
                            },
                            three_call: function () {
                                buyAgain();
                            }
                        });

                    }

                    else if (data.result.order_status == 3) {
                        oStatus = '订单已取消';
                        bottonName({"one": "", "two": "", "three": "再次购买"}, {
                            one_call: function () {
                            },
                            two_call: function () {
                            },
                            three_call: function () {
                                buyAgain();
                            }
                        });
                    } else if (data.result.order_status == 4) {
                        // $(".yz").css("display", "block");


                        oStatus = '订单已完成';
                        bottonName({"one": "", "two": "", "three": "再次购买"}, {
                            one_call: function () {
                            },
                            two_call: function () {
                            },
                            three_call: function () {
                                buyAgain();
                            }
                        });

                    } else if (data.result.order_status == 5) {
                        oStatus = '订单已作废';
                    } else {
                        oStatus = data.result.order_status_desc;
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

                    //退货请求
                    $(".refund").on("click", function () {
                        var goodsid = $(this).prev().find(".indent-list-img").attr('data-id')
                        console.log(goodsid);
                        var refundData = {
                            order_id: order_id,
                            goods_id: goodsid,
                            token: token,
                            user_id: user_id,
                            unique_id: unique_id
                        }
                        var dataorder_sn = $(this).parent().siblings(".order_status").find(".order_sn").attr('data-order_sn')
                        console.log(dataorder_sn);
                        ajax_post(refundData, refundUrl, function (data) {
                            console.log(data);
                            if (data.result == -1) {
                                location.href = "refund.html?" + order_id + "?" + goodsid + "?" + dataorder_sn + ""
                            } else {
                                mui.toast("已申请退款...")
                            }

                        })
                    });


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

