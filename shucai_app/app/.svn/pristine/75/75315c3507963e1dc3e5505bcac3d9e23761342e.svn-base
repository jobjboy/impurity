/**
 * Created by lenovo on 2017/4/3.
 */
(function () {
    //传递的参数
    var token = localStorage.getItem("token");
    var user_id = localStorage.getItem("user_id");
    var unique_id = localStorage.getItem("unique_id");
    var data1 = {token: token, uesr_id: user_id}
    var page;
    var urls = {
        url1: URL.ApiUrl + '' + URL.prizeCenter,
        url2: URL.ApiUrl + '' + URL.cashPrize,
        url3: URL.ApiUrl + "&c=User&a=getAddressList",
        url4: URL.ApiUrl + '' + URL.cashMoney,
        url5: URL.ApiUrl + "&c=Lottery&a=del_lottery"
    }
    $(function () {
        // ajax 获取数据
        function resdata(url, method, mdata, successCall) {
            $.ajax({
                type: method,
                url: url,
                data: mdata,
                dataType: "json",
                error: function (data) {
                    mui.toast(data.msg, {duration: 'long', type: 'div'})
                },
                success: successCall,
            })
        }

        lottery_is_empty = false;

        resdata(urls.url1, "post", data1, function (data) {
            console.log(data);
            console.log("ok");

            if (data.status == -2) {
                mui.alert(data.msg, '温馨提示', function () {
                    location.href = "shopping_cart.html"
                });
            } else if (data.status == -102) {  //没有中奖列表
                lottery_is_empty = true;
                mui.alert(data.msg, '温馨提示', function () {
                });

            } else if (data.status == -102 || data.status == -101) {
                mui.alert(data.msg, '温馨提示', function () {
                    location.href = "login.html"
                });
            }
            //渲染模板数据
            var html = template('collect_list', data);
            // console.log(html);
            $('#collectList').html(html);
            // 列表有无商品
            if (data.result.length > 0) {
                $(".fail").hide();
            } else {
                $(".fail").show();
            }
            //获取中奖列表
            resdata(urls.url3, "post", data1, function (data) {
                if (data.status == 0) {
                    mui.toast("温馨提示，暂无收货地址，请添加。", {duration: 'long', type: 'div'})
                }

                var html = template('address_list', data)
                $('.addressList').html(html);
                $("button").each(function (i, v) {
                    if ($(this).attr("disabled") == "disabled") {
                        console.log(123);
                        $(this).parent(".indent-list-button").prev().find("a").attr("href", "javascript:;")
                    }
                })
            });

            //点击兑奖
            $(".mui-btn-sj").on("click", function () {
                var address_id = $(this).parent().prev().find(".user_np").attr("data-id");
                //console.log(address_id);
                var lottery_user_id = $(this).parent().attr("data-jpid");
                // console.log(lottery_user_id);
                //console.log(this);
                var that = this;
                var data2 = {
                    token: token,
                    uesr_id: user_id,
                    lottery_user_id: lottery_user_id,
                    address_id: address_id
                }
                //点击配送奖品
                resdata(urls.url2, "post", data2, function (data) {
                    //console.log(data);
                    if (data.status == 1) {
                        $(that).hide();
                        $(that).next().attr({disabled: "disabled"}).text("奖品待发货")
                    }
                    mui.toast(data.msg, {duration: 'long', type: 'div'});

                })
            })

            //      点击兑换金币
            $(".mui-btn-zf").on("click", function () {
                var lottery_user_id = $(this).parent().attr("data-jpid");
                var data3 = {
                    token: token,
                    uesr_id: user_id,
                    lottery_user_id: lottery_user_id,
                }
                resdata(urls.url4, "post", data3, function (data) {
                    // console.log("ok");
                    //console.log(data);
                    mui.toast(data.msg, {duration: 'long', type: 'div'});
                    if (data.status == 1) {
                        mui.alert(data.msg, '温馨提示', function () {
                            history.go(0);
                        });

                    }
                })
            });

            //点击删除订单

            $(".mui-btn-del").on("click", function () {
                var lottery_user_id = $(this).parent().attr("data-jpid");
                var data3 = {
                    token: token,
                    uesr_id: user_id,
                    lottery_user_id: lottery_user_id,
                }
                resdata(urls.url5, "post", data3, function (data) {
                    // console.log("ok");
                    console.log(data);
                    // mui.toast(data.msg, {duration: 'long', type: 'div'});
                    if (data.status == 1) {
                        mui.alert(data.msg, '温馨提示', function () {
                            history.go(0);
                        });

                    }
                })
            });

        })

        page = 1;
        refresh({
            content: "#tabbox",
            down: ".pre_lodding",
            // up: ".up_lodding",
            null: ".null"
        }, {
            upCallback: null,
            downCallback: function (e) {
                var that = this;
                setTimeout(function () {
                    that.back.call();
                    that.hideDown();
                    var tag = true;
                    if (tag) {
                        /**
                         * TODO
                         */
                        page++;
                        resdata(urls.url1 + "&p=" + page + "", "post", data1, function (data) {
                            // console.log("ok");

                            //渲染模板数据
                            var html = template('collect_list', data);
                            // console.log(html);
                            $('#collectList').append(html);
                            var $goods_list = data.result;
                            tag = false;
                            if (!$goods_list || !$goods_list.length) {
                                that.showNull();
                            }


                            //获取中奖列表

                            resdata(urls.url3, "post", data1, function (data) {


                                if (data.status == 0) {
                                    mui.toast("暂无收货地址，请添加", {duration: 'long', type: 'div'})
                                }

                                var html = template('address_list', data)
                                $('.addressList').html(html);
                                $("button").each(function (i, v) {
                                    if ($(this).attr("disabled") == "disabled") {
                                        console.log(123);
                                        $(this).parent(".indent-list-button").prev().find("a").attr("href", "javascript:;")
                                    }
                                })


                            })

                            //点击兑奖
                            $(".mui-btn-sj").on("click", function () {
                                var address_id = $(this).parent().prev().find(".user_np").attr("data-id");
                                //console.log(address_id);
                                var lottery_user_id = $(this).parent().attr("data-jpid");
                                // console.log(lottery_user_id);
                                //console.log(this);
                                var that = this;
                                var data2 = {
                                    token: token,
                                    uesr_id: user_id,
                                    lottery_user_id: lottery_user_id,
                                    address_id: address_id
                                }
                                //点击配送奖品
                                resdata(urls.url2, "post", data2, function (data) {
                                    //console.log(data);
                                    if (data.status == 1) {
                                        $(that).hide();
                                        $(that).next().attr({disabled: "disabled"}).text("奖品待发货")
                                    }
                                    mui.toast(data.msg, {duration: 'long', type: 'div'});

                                })
                            })

                            //      点击兑换金币
                            $(".mui-btn-zf").on("click", function () {
                                var lottery_user_id = $(this).parent().attr("data-jpid");
                                var data3 = {
                                    token: token,
                                    uesr_id: user_id,
                                    lottery_user_id: lottery_user_id,
                                }
                                resdata(urls.url4, "post", data3, function (data) {
                                    // console.log("ok");
                                    //console.log(data);
                                    mui.toast(data.msg, {duration: 'long', type: 'div'});
                                    if (data.status == 1) {
                                        mui.alert(data.msg, '温馨提示', function () {
                                            history.go(0);
                                        });

                                    }
                                })
                            });

                            //点击删除订单

                            $(".mui-btn-del").on("click", function () {
                                var lottery_user_id = $(this).parent().attr("data-jpid");
                                var data3 = {
                                    token: token,
                                    uesr_id: user_id,
                                    lottery_user_id: lottery_user_id,
                                }
                                resdata(urls.url5, "post", data3, function (data) {
                                    // console.log("ok");
                                    console.log(data);
                                    // mui.toast(data.msg, {duration: 'long', type: 'div'});
                                    if (data.status == 1) {
                                        mui.alert(data.msg, '温馨提示', function () {
                                            history.go(0);
                                        });

                                    }
                                })
                            });

                        })

                    }
                }, 2000);
            }
        });
    })
})()
/**
 * Created by lenovo on 2017/4/28.
 */
