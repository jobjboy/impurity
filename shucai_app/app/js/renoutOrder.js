/**
 * Created by lenovo on 2017/3/30.
 */
var grtURL = window.location.search;
grtURL = grtURL.split("?");
var arg = grtURL[1];
console.log(arg);
console.log(grtURL);
var urLstr = String(grtURL[1]).split("&");
// var goodsId =grtURL[1].split("=");
var goodsId = String(urLstr[0]).split("=")[1];
var userMoney = String(urLstr[1]).split("=")[1];
console.log(goodsId);
console.log(userMoney);
$("#totalPrice").text("应付押金￥" + userMoney + "");
function Trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

(function () {
    // var address_id;
    var strway;
    var token = localStorage.getItem("token");
    var user_id = localStorage.getItem("user_id");
    var data1 = {token: token, uesr_id: user_id};
    var urls = {
        url1: URL.SiteUrl + "/index.php?m=Api&c=User&a=user_baseinfo",
        url2: URL.ApiUrl + URL.rentoutOrder,
        payApi: URL.ApiUrl + "&c=User&a=check_paypwd"
    };

    //租借订单样式

    $(".payWay").css({"border-bottom": "1px solid #EBECF0"});
    //选择付款方式
    $(".payWayPic li").on("tap", function () {

        $(".payWayPic li em").removeClass("checkend");
        $(".payWayPic li em").eq($(this).index()).addClass("checkend");
        var wayName = $(".payWayPic li").eq($(this).index()).text();
        $(".payWayName").text("")
        $(".payWayName").append(wayName);
    })
    resdata(urls.url1, data1, function (data) {
        // console.log(JSON.stringify(data));
        console.log(data);
        //渲染模板数据
        var html = template('userad_info', data.result.addressList)
        $('#adress_info').html(html);
// return;
        $(".user_info").on("click", function () {
            location.href = "address_list.html#" + arg + "";
        })
        //密码框业务逻辑
        $(".bg").click(function () {
            $(".passwordBox").css("display", "none")
            $("#pincode-input2").val("");
        });
        $(".esc").on("click", function () {
            $(".passwordBox").css("display", "none")
            $("#pincode-input2").val("");
        })
        $("#pincode-input2").on("keyup", function () {
            console.log(1);
            var st = $(this).val();
            if (st.length == 6) {
                $(this).blur();
                console.log(2);
            }
        })

        // 传递的参数
        // var shipping_code = data.result.shippingList[0].code;
        if (!data.result.addressList.address_id) {
            mui.toast(data.msg, {duration: 'long', type: 'div'})
            location.href = "address_list.html#" + arg + "";
        }
        var address_id = data.result.addressList.address_id;
        // console.log(address_id);
        var user_money = data.result.userInfo.user_money;
        //计算购物车的金额+运费的
        // todo_calculate(address_id, 'order_price', shipping_code);
        //console.log(parseInt(grtURL[3]));
        var data2 = {token: token, uesr_id: user_id, goods_id: goodsId, goods_num: 1, address_id: address_id};
        var data3 = {
            token: token,
            uesr_id: user_id,
            goods_id: goodsId,
            goods_num: 1,
            address_id: address_id,
            user_money: +userMoney
        };
        //console.log(data3);
        //console.log($(".payWayName").text());
        // 点击提交订单
        $(".ys").on("click", function () {
            $(this).toggleClass("xz");
        })
        $("#sub").on("click", function () {
            if ($(".ys").hasClass("xz")) {
                strway = Trim($(".payWayName").text())
                if (strway == "账户余额") {
                    var sys = navigator.userAgent;
                    if (sys.indexOf("OS") !== -1 || sys.indexOf("4.4") !== -1) {
                        $("input[type='password']").css({"width":"238px","margin-left":"-119px","font-size":"14px"});
                    }
                    if (user_money < +userMoney) {
                        mui.toast("您的账户余额不足，请充值", {duration: 'long', type: 'div'})
                    } else {
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
                                $(".passwordBox").css("display", "block")
                                $(".payenter").off("click").on("click",function () {
                                    var password = $("#pincode-input2").val();
                                    console.log(password);
                                    if (password && password.length == 6) {
                                        resdata(urls.payApi, {
                                            token: token,
                                            user_id: user_id,
                                            paypasswd: password
                                        }, function (data) {
                                            console.log(data);
                                            if (data.status == 1) {
                                                mui.toast("支付成功", {duration: 'long', type: 'div'});
                                                payrent();

                                            } else {
                                                mui.toast(data.msg, {duration: 'long', type: 'div'});
                                                $("#pincode-input2").val("");
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
                    return false;
                } else {
                    data3.user_money = 0;
                }
                // console.log(strway);
                function payrent() {
                    resdata(urls.url2, data3, function (data) {
                        // console.log(123);
                        console.log(data);
                        if (!data.result) {
                            mui.toast(data.msg, {duration: 'long', type: 'div'})
                            return;
                        }
                        // console.log(JSON.stringify(data));
                        if (data.needpay == "0") {
                            location.href = "rentOrderDetails.html?order_id=" + data.result;
                        } else {

                            if (strway == "账户余额") {
                                if (+user_money < +userMoney) {
                                    mui.toast("您的账户余额不足，请充值", {duration: 'long', type: 'div'})
                                } else {
                                    location.href = "rentOrderDetails.html?order_id=" + data.result;

                                }

                            } else if (strway == "支付宝") {
                                lhhpay("alipay", data.result, "pay")

                            } else if (strway == "微信支付") {
                                lhhpay("wxpay", data.result, "pay")

                            }
                            /*else if (strway == "货到付款") {
                             var CODPAYSERVER = 'http://192.168.0.116/index.php?m=Api&c=Payment&a=getCode&pay_code=cod&appid=HBuilder&order_id=' + data.result + ''
                             // lhhpay("cod", data.result)
                             resdata(CODPAYSERVER, function (data) {
                             //console.log(data);
                             location.href = "rentOrderDetails.html?order_id=" + data.result;
                             })
                             return;
                             }*/
                            return;
                        }
                    })
                }

                payrent()
            } else {
                mui.toast("请同意租借商品协议", {duration: 'long', type: 'div'})
                console.log($("#radio1").attr("checked"));

            }

            // todo_calculate(address_id, 'submit_order', shipping_code);
        });


    })
//ajax方法
    function resdata(url, mdata, successCall) {
        $.ajax({
            type: "post",
            url: url,
            data: mdata,
            async: false,
            dataType: "json",
            error: function (data) {
                mui.toast(data.msg, {duration: 'long', type: 'div'})
            },
            success: successCall,
        })
    }
})()






