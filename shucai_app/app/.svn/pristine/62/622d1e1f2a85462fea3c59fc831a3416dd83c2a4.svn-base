/**
 * Created by Administrator on 2017/4/24 0024.
 */
(function () {
    var unique_id = localStorage.getItem("unique_id");
    var user_id = localStorage.getItem("user_id");
    var token = localStorage.getItem("token");
    var curentTab = getUrlParam("currenttab");
    var page = 1;
    var data_all = {
        all: [{'yuer': '16.56', 'jifen': 0, 'des': '扣除租金，押金退还', 'time': '2017-04-18'},
            {'yuer': '-16.56', 'jifen': 0, 'des': '下单消费', 'time': '2017-04-18'},
            {'yuer': '16.56', 'jifen': 0, 'des': '扣除租金，押金退还', 'time': '2017-04-18'},
            {'yuer': '-16.56', 'jifen': 0, 'des': '下单消费', 'time': '2017-04-18'},
            {'yuer': '16.56', 'jifen': 0, 'des': '扣除租金，押金退还', 'time': '2017-04-18'},
            {'yuer': '-16.56', 'jifen': 0, 'des': '下单消费', 'time': '2017-04-18'},
            {'yuer': '16.56', 'jifen': 0, 'des': '扣除租金，押金退还', 'time': '2017-04-18'},
            {'yuer': '-16.56', 'jifen': 0, 'des': '下单消费', 'time': '2017-04-18'},
        ]
    }
    var data_recharge = {
        all: [{'yuer': '16.56', 'status': '待支付', 'des': '支付宝支付', 'time': '2017-04-18'},
            {'yuer': '-16.56', 'status': '待支付', 'des': '微信支付', 'time': '2017-04-18'},
            {'yuer': '16.56', 'status': '待支付', 'des': '手机网站支付', 'time': '2017-04-18'},
            {'yuer': '16.56', 'status': '待支付', 'des': '支付宝支付', 'time': '2017-04-18'},
            {'yuer': '-16.56', 'status': '待支付', 'des': '微信支付', 'time': '2017-04-18'},
            {'yuer': '16.56', 'status': '待支付', 'des': '手机网站支付', 'time': '2017-04-18'},
            {'yuer': '16.56', 'status': '待支付', 'des': '支付宝支付', 'time': '2017-04-18'},
            {'yuer': '-16.56', 'status': '待支付', 'des': '微信支付', 'time': '2017-04-18'},
            {'yuer': '16.56', 'status': '待支付', 'des': '手机网站支付', 'time': '2017-04-18'}
        ],
    }
    var data_integral = {
        all: [{'yuer': '16.56', 'jifen': -1654, 'des': '下单消费', 'time': '2017-04-18'},
            {'yuer': '-16.56', 'jifen': 45, 'des': '积分', 'time': '2017-04-18'},
            {'yuer': '16.56', 'jifen': -1654, 'des': '下单消费', 'time': '2017-04-18'},
            {'yuer': '-16.56', 'jifen': 45, 'des': '积分', 'time': '2017-04-18'},
            {'yuer': '16.56', 'jifen': -1654, 'des': '下单消费', 'time': '2017-04-18'},
            {'yuer': '-16.56', 'jifen': 45, 'des': '积分', 'time': '2017-04-18'},
            {'yuer': '16.56', 'jifen': -1654, 'des': '下单消费', 'time': '2017-04-18'},
            {'yuer': '-16.56', 'jifen': 45, 'des': '积分', 'time': '2017-04-18'}
        ]
    }
    $.ajax({
        type: 'get',
        url: URL.SiteUrl + '/index.php?m=Api&c=User&a=userInfo',
        data: {
            user_id: user_id,
            token: token
        },
        dataType: 'json',
        success: function (data) {
            $("#pay_points").text(data.result.pay_points);
            $("#user_money").text(data.result.user_money);
            $(".container").css("display", "block");
            $("#lodding").css('display', 'none');
        },
        beforeSend: function () {
            $("#lodding").css('display', 'block');
        },error:function (data) {
            $("#lodding").css('display', 'none');
            mui.toast(data.msg, {duration: 'long', type: 'div'});
        }
    });
    var islock = false;
    // $.ajax({
    //     type: 'post',
    //     url: URL.SiteUrl + '/index.php?m=Api&c=User&a=account',
    //     data: {
    //         user_id: user_id,
    //         unique_id: unique_id,
    //         token: token,
    //         p: page
    //     },
    //     dataType: 'json',
    //     success: function (data) {
    //         $.each(data.result, function (index, obj) {
    //             obj.change_time = formatDate(obj.change_time);
    //         });
    //         var html = template('money_all', data);
    //         $("#all_content>ul").append(html);
    //     }
    // });
    var $tabs = $("#tabs");
    var tag, id = "all";
    $tabs.delegate("dd", "click", function (event) {
        if (!islock) {
            islock = true;
            if (tag) {
                tag.hideNull();
            }
            var $target = $(event.currentTarget);
            //console.log($target);
            $target.addClass("thistab").siblings().removeClass("thistab");
            id = $target.attr("id");
            var $currentPanel = $("#" + id + "_content");//=>#all_content
            $currentPanel.css({"display": "block"}).siblings().css({"display": "none"});
            /**
             * TODO ajax
             */
            page = 1;
            var money_type;
            // var $allUl = $("#all_content>ul");
            if(id == "all"){
                money_type = 0;
            }else if(id == "recharge"){
                money_type = 1;
            }else{
                money_type = 2;
            }
            //console.log(money_type);
            $.ajax({
                type: 'post',
                url: URL.SiteUrl + '/index.php?m=Api&c=User&a=account',
                data: {
                    user_id: user_id,	
                    unique_id: unique_id,
                    token: token,
                    p: page,
                    money_type: money_type
                },
                dataType: 'json',
                success: function (data) {
                    //console.log(data);
                    $.each(data.result, function (index, obj) {
                    	console.log(data.result);
                        obj.change_time = formatDate(obj.change_time);
                        console.log(obj.change_time);
                    });
                    var html = template("money_" + id, data);
                    $("#" + id + "_content>ul").html(html);
                    $("#money_content").css({"display": "block"});
                    islock = false;
                },
                beforeSend: function () {
                    $("#money_content").css({"display": "none"});
                },error:function (data) {
                    mui.toast(data.msg, {duration: 'long', type: 'div'});
                }
            });
         /*   if (id == "all") {

            } else {
                $.ajax({
                    type: 'post',
                    url: URL.SiteUrl + '/index.php?m=Api&c=User&a=account',
                    data: {
                        user_id: user_id,
                        unique_id: unique_id,
                        token: token,
                        p: page,
                        money_type: 1
                    },
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        $.each(data.result, function (index, obj) {
                            obj.change_time = formatDate(obj.change_time);
                        });
                        var html = template('money_all', data);
                        $allUl.html(html);
                        $("#money_content").css({"display": "block"});
                        islock = false;
                    },
                    beforeSend: function () {
                        $("#money_content").css({"display": "none"});
                    }
                });
                /!*setTimeout(function () {
                    var html = template("money_" + id, eval("data_" + id));
                    $("#" + id + "_content>ul").html(html);
                    islock = false;
                }, 100);*!/
            }*/
        }
    });
    if (curentTab == "integral") {
        $("#integral").click();
    } else if (curentTab == "money") {
        $("#recharge").click();
    }
    tag = refresh({
        content: "#money_content",
        down: ".pre_lodding",
        // up: ".up_lodding",
        null: ".null"
    }, {
        upCallback: function () {

        },
        downCallback: function (e) {
            //console.log(id);
            var that = this;
            setTimeout(function () {
                that.back.call();
                if (id == "all") {
                    page++;
                    $.ajax({
                        type: 'post',
                        url: URL.SiteUrl + '/index.php?m=Api&c=User&a=account',
                        data: {
                            user_id: user_id,
                            unique_id: unique_id,
                            token: token,
                            p: page
                        },
                        dataType: 'json',
                        success: function (data) {
                            $.each(data.result, function (index, obj) {
                                obj.change_time = formatDate(obj.change_time);
                            });
                            var html = template('money_all', data);
                            $("#all_content>ul").append(html);
                            that.hideDown();
                            if (data.result.length <= 0) {
                                that.showNull();
                            }
                        },error:function (data) {
                            mui.toast(data.msg, {duration: 'long', type: 'div'});
                        }
                    });
                } else if (id == "recharge") {
                    that.hideDown();
                    that.showNull();
                } else if (id == "integral") {
                    that.hideDown();
                    that.showNull();
                }

            }, 2000);
        }
    });
    
    //日期时间
    function formatDate(ns) {
        var d = new Date(ns * 1000);
        var dformat = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');
        return dformat;
    }

    // 获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        } else {
            return null;
        }
    }
})();