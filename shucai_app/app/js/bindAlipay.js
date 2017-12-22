/**
 * Created by lenovo on 2017/5/17.
 */
/**
 * Created by lenovo on 2017/5/17.
 */
/**
 * Created by lenovo on 2017/4/2.
 */
(function () {
//传递的参数
    var token, user_id, account_bank, account_name, unique_id;
    token = localStorage.getItem("token");
    user_id = localStorage.getItem("user_id");
    unique_id = localStorage.getItem("unique_id");

    var urls = {
        url1: URL.ApiUrl + URL.Alipay,
        url2: URL.SiteUrl + '/index.php?m=Api&c=User&a=userInfo',
        url3: URL.ApiUrl + URL.sendSms,
    }
    $(function () {
        // ajax 获取数据
        function resdata(url, mdata, successCall) {
            $.ajax({
                type: "post",
                url: url,
                data: mdata,
                dataType: "json",
                error: function (data) {
                    mui.toast(data.msg, {duration: 'long', type: 'div'})
                },
                success: successCall,
            })
        }

//手机验证
        function yzPhone(that, tag) {
            var reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/i;//验证手机正则(输入前7位至11位)
            var str = "";
            if (that.val() == "" || that.val() == "请输入手机号") {
                str = "手机号不能为空!";
            } else if (that.val().length < 11) {
                str = "手机号码长度有误!";
            } else if (!reg.test(that.val())) {
                str = "手机号码不存在!";
            }
            if (!str) {
                return true;
            }
            if (tag) {
                mui.toast(str, {duration: 'long', type: 'div'});
                that.focus(function () {
                    that.val("");
                    that.css("color", "black")
                });
                that.val(str).css("color", "#EC8924");
            } else {
                mui.toast(str, {duration: 'long', type: 'div'});
            }
            return false;
        }


//验证验证码
        $(".test").blur(function () {
            var reg = /^\d{4}$/;
            if ($(".test").val() == "" || $(".test").val() == null) {
                $(".test").val("验证码不能为空").css("color", "#EC8924");
                $(".test").focus(function () {
                    $(".test").val("");
                    $(".test").css("color", "black")
                });
            }
            else if ($(".test").val().length < 4) {
                $(".test").val("验证码长度有误").css("color", "#EC8924");
                $(".test").focus(function () {
                    $(".test").val("");
                    $(".test").css("color", "black")
                });
            }
            else if (!reg.test($(".test").val())) {
                $(".test").val("验证码不存在").css("color", "#EC8924");
                $(".test").focus(function () {
                    $(".test").val("");
                    $(".test").css("color", "black")
                });
            }
        });
        //验证手机号码
        $(".account_bank").blur(function () {
            console.log(123);
            yzPhone($(this), true);
        });
        var phone;
        resdata(urls.url2, {token: token, uesr_id: user_id,}, function (data) {
            //console.log(data);
            // console.log("ok");
            // console.log(typeof data.result.shippingList[0].code);
            if (data.status == -2) {
                mui.alert(data.msg, '温馨提示', function () {
                });
            } else if (data.status == -102 || data.status == -101) {
                mui.alert(data.msg, '温馨提示', function () {
                    location.href = "login.html"
                });
            } else if (data.status == 1) {
                phone = data.result.mobile;

            }
        })
        //点击获取短信验证码
        var times, code;
        $(".register-yzm").on("click", function () {
            times = 60;
            if (yzPhone($(".ali"), false)) {
                var data1 = {mobile: phone, unique_id: unique_id, token: token}
                console.log(data1);
                resdata(urls.url3, data1, function (data) {
                    // console.log(data1);
                    // console.log(data);
                    console.log("ok");
                    /* if (data.is_reg !== 0) {
                     $(".passwordbar").css("display", "block");
                     mui.toast("请设置登录密码", {duration: 'long', type: 'div'});
                     }*/
                    code = data.msg;
                })

                function timeEnd() {
                    if (times == 0) {
                        $(".register-yzm").removeAttr("disabled");
                        $(".register-yzm").text("获取验证码");
                        times = 60;
                    } else {
                        $(".register-yzm").attr("disabled", "disabled");
                        $(".register-yzm").text("重新获取(" + times + "秒)");
                        times--;
                        setTimeout(function () {
                            timeEnd();
                        }, 1000)
                    }
                }

                timeEnd();
            }
        })

        $("#set").on("click", function () {
            account_bank = $(".account_bank").val();
            account_name = $(".account_name").val();
            var code2 = $(".test").val();
            if (code2 == code) {
                // console.log(account_bank);
                // console.log(account_name);
                var data1 = {
                    token: token,
                    uesr_id: user_id,
                    account_bank: account_bank,
                    account_name: account_name,
                    bankname: "支付宝",
                    code: code2
                }
                resdata(urls.url1, data1, function (data) {
                    //console.log(data);
                    // console.log("ok");
                    // console.log(typeof data.result.shippingList[0].code);
                    if (data.status == -2) {
                        mui.alert(data.msg, '温馨提示', function () {
                        });
                    } else if (data.status == -102 || data.status == -101) {
                        mui.alert(data.msg, '温馨提示', function () {
                            location.href = "login.html"
                        });
                    } else if (data.status == 1) {
                        mui.alert(data.msg, '温馨提示', function () {
                            location.href = "withdrawal.html"
                        });

                    }
                })
            }else {
                mui.toast("验证码错误", {duration: 'long', type: 'div'});
            }

        })

    })
})()
