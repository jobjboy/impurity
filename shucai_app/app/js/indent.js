(function () {
    var tab = {
        type1: "WAITPAY",
        /*=> 待支付	的信息*/
        type2: "WAITSEND",
        /*=> 待发货  的信息*/
        type3: "WAITRECEIVE",
        /*=> 待收货 的信息*/
        type4: "WAITCCOMMENT",
        /*=>  待评价 的信息*/
        type5: "COMMENTED",
        /*=>  已评价 的信息*/
        type6: "ORDERRETURN",
        /*=>  已退货的信息*/
    }
    var token = localStorage.getItem("token");
    var user_id = localStorage.getItem("user_id");
    var unique_id = localStorage.getItem("unique_id");
    var tag;
    /*var ajaxArguments = {
     mdata1: {token: token, type: tab.type1, user_id: user_id, p: 1},
     mdata2: {token: token, type: tab.type2, user_id: user_id, p: 1},
     mdata3: {token: token, type: tab.type4, user_id: user_id, p: 1},
     mdata4: {token: token, type: tab.type6, user_id: user_id, p: 1},
     mdata5: {token: token, user_id: user_id, p: 1},
     };*/
    var ajaxArguments = [
        {token: token, user_id: user_id, p: 1},
        {token: token, type: tab.type1, user_id: user_id, p: 1},
        {token: token, type: tab.type2, user_id: user_id, p: 1},
        {token: token, type: tab.type3, user_id: user_id, p: 1},
        {token: token, type: tab.type4, user_id: user_id, p: 1},
        {token: token, type: tab.type6, user_id: user_id, p: 1},
    ];

    var islock = false;

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


    function ajax_post(mdata, url, success) {
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
            success: success
        })
    }

    function payment_function() {
        //删除订单
        $(".off_order").on('click', function () {
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


        //再次购买的回调

        function buyAgain() {
            var arr = [];
            $(this).parents(".mui-input-group").find(".indent-list-img").each(function (i, v) {
                arr.push({
                    'goods_num': $(v).find(".item_num").attr('data-num'),
                    'goods_id': $(v).find(".item_num").attr('data-id')
                });
            })
            console.log(arr);
            console.log(123);
            console.log($(this));
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
                    mui.toast(data.msg, {duration: 'long', type: 'div'});
                    //console.log(data);
                    window.location.href = "shopping_cart.html"
                },
                error: function (data) {
                    mui.toast(data.msg, {duration: 'long', type: 'div'})
                },
            });
        }

        $(".buyAgain").on("click", buyAgain)

        //去支付
        $(".go_to_pay").on('click', function () {
            var order_id = $(this).data("orderid");
            window.location.href = 'orderDetails.html?order_id=' + order_id;
        });

        //退货请求
        $(".refund").on('click', function () {
            var goodsid = $(this).data('goodsid');
            var order_id = $(this).data('order_id');
            var dataorder_sn = $(this).data('order_sn');
            console.log(goodsid);
            var refundData = {
                order_id: order_id,
                goods_id: goodsid,
                token: token,
                user_id: user_id,
                unique_id: unique_id
            }
            console.log(dataorder_sn);
            //是否可以退货
            var refundUrl = URL.ApiUrl + '&c=User&a=return_goods_status';
            ajax_post(refundData, refundUrl, function (data) {
                console.log(data);
                if (data.result == -1) {
                    location.href = "refund.html?" + order_id + "?" + goodsid + "?" + dataorder_sn + ""
                } else {
                    mui.toast("已申请退款...")
                }
            })
        });


        //收货操作
        $(".receive-order").on("click", function () {
            var this_button = $(this);

            mui.confirm('您确认已经收到货了吗?', '温馨提示', ['确认', '取消'], function (e) {
                if (e.index == 0) {
                    // user_id         order_id        token
                    var q = {'user_id': user_id, 'order_id': this_button.data('orderid'), 'token': token};
                    ajax_post(q, orderConfirm, function (data) {
                        if (data.status == '1') {
                            this_button.parents('.indent-list1').remove();
                            var btnArray = ['去评价', '再逛逛'];
                            mui.confirm('确认收货成功', '温馨提示', btnArray, function (e) {
                                if (e.index == 0) {
                                    window.location.href = 'evaluate.html?order_id=' + this_button.data("orderid");
                                } else {
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

        })


    }


    $(function () {
        var activeindex;
        // tab栏切换
        jQuery.jqtab = function (tabtit, tab_conbox, shijian) {
            $(tab_conbox).find("dd").hide();
            // $(tabtit).find("dd:first").addClass("thistab").show();
            // $(tab_conbox).find("dd:first").show();


            $(tabtit).find("dd").bind(shijian, function () {
                if (!islock) {
                    $(this).addClass("thistab").siblings("dd").removeClass("thistab");
                    activeindex = $(tabtit).find("dd").index(this);
                    $(tab_conbox).children().eq(activeindex).show().siblings().hide();
                }
                return false;
            });

        };
        $.jqtab("#tabs", "#tab_conbox", "click");

        var trigger = window.location.search.substring(1);
        var id, index;

        var events = function (_this, flag) {


            id = _this.attr('id');
            index = _this.index();
// console.log(index);

            str = '<div class="noorder noorder_all"><div class="noorder-img"><img src="./images/noorder.png"></div><div class="noorder-title">您还没有相关订单</div></div>';

            resdata(
                ajaxArguments[index],
                function () {

                    $("#lodding").css({"display": "block"});
                    $("#tab_conbox").css({"display": "none"});
                },
                function (data) {
                    //console.log(ajaxArguments[index]);

                    console.log(data);
                    if (data.status != 1 && data.status != 0) {
                        mui.alert(data.msg, '', function () {
                            window.location.href = 'login.html';
                        });
                    }
                    var html = template(id + '_tpl', data);
                    $('#' + id + '_list').html(html);
                    if (index == 5) {
                        $(".total_price").css({"display": "none"});
                        $(".item_num").css({"display": "none"});
                    }


                    //申请退款按钮
                    /*if (data.result.length!=0){
                     var arrBtn =[];
                     $(".refund_btn").each(function (i,v) {
                     arrBtn.push(data.result[i].refund_btn);
                     if (arrBtn[i]==1){
                     $(this).css("display","block");
                     }
                     })
                     console.log(arrBtn);
                     }*/

                    /*if(data.result.refund_btn==1){
                     $(".refund_btn").css("display","block");
                     }
                     if(data.result.cancel_refund_btn==1){
                     $(".cancel_refund_btn").css("display", "block");
                     }*/

//申请退款操作
                    $(".refund_btn").off("click").on("click", function () {
                        var order_id = $(this).attr("data-orderid");
                        var order_sn = $(this).attr("data-order_sn");
                        ajax_post({
                            order_id: order_id,
                            order_sn: order_sn,
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
                    $(".cancel_refund_btn").off("click").on("click", function () {
                        var order_id = $(this).attr("data-orderid");
                        var order_sn = $(this).attr("data-order_sn");

                        ajax_post({
                            order_id: order_id,
                            order_sn: order_sn,
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
                    $(".return_btn").off("click").on("click", function () {
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
                    $(".cancel_return_btn").off("click").on("click", function () {
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
                    // var ym = data.result.check_code;
                    // $(".yzm").text(ym);
                    payment_function();
                    if (flag) {
                        $("#dd_" + id).show().siblings('dd').hide();
                        $("#" + id).addClass('thistab').siblings('dd').removeClass();
                    }
                    islock = false;
                    (!data.result.length) ? $("#dd_" + id).children('.model').html('').append(str) : '';
                    $("#lodding").css({"display": "none"});
                    $("#tab_conbox").css({"display": "block"});

                })
        };

        if (trigger) {
            events($('#' + trigger), true);
        }

        $('#tabs dd').click(function () {

            if (!islock) {
                islock = true;
                events($(this));
                tag.hideNull();
            }
        });

        function resdata(mdata, before, success) {

            $.ajax({
                type: 'post',
                url: URL.SiteUrl + '/index.php?m=Api&c=User&a=getOrderList',
                dataType: 'json',
                data: mdata,
                error: function (data) {
                    // alert("请求失败")
                    mui.toast(data.msg, {duration: 'long', type: 'div'});

                },
                beforeSend: before,
                success: success
            })

        }

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
                    if (oldIndex != index) {
                        page = 1;
                    }
                    oldIndex = index;
                    that.back.call();
                    page++;
                    ajaxArguments[index].p = page;
                    resdata(ajaxArguments[index], function () {
                    }, function (data) {
                        console.log(data);
                        if (data.status != 1 && data.status != 0) {
                            mui.alert(data.msg, '', function () {
                                window.location.href = 'login.html';
                            });
                        }
                        console.log(id);
                        var html = template(id + '_tpl', data);
                        $('#' + id + '_list').append(html);
                        if (index == 5) {
                            $(".total_price").css({"display": "none"});
                            $(".item_num").css({"display": "none"});
                        }
                        
                        $(".refund_btn").off("click").on("click", function () {
                            var order_id = $(this).attr("data-orderid");
                            var order_sn = $(this).attr("data-order_sn");
                            ajax_post({
                                order_id: order_id,
                                order_sn: order_sn,
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
                        $(".cancel_refund_btn").off("click").on("click", function () {
                            var order_id = $(this).attr("data-orderid");
                            var order_sn = $(this).attr("data-order_sn");

                            ajax_post({
                                order_id: order_id,
                                order_sn: order_sn,
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
                        $(".return_btn").off("click").on("click", function () {
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
                        $(".cancel_return_btn").off("click").on("click", function () {
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
                        // var ym = data.result.check_code;
                        // $(".yzm").text(ym);
                        payment_function();

                        that.hideDown();
                        var $goods_list = data.result;

                        if (!$goods_list || !$goods_list.length) {
                            console.log(132);
                            that.showNull();
                        }
                    });
                }, 200);
            }
        });
    })


})();