/**
 * Created by lenovo on 2017/5/17.
 */
/**
 * Created by lenovo on 2017/4/2.
 */
(function () {
//传递的参数
    var token, user_id, paypasswd, c_paypasswd, o_paypasswd,unique_id;
    token = localStorage.getItem("token");
    user_id = localStorage.getItem("user_id");
    unique_id = localStorage.getItem("unique_id");

    var urls = {
        url1: URL.ApiUrl + URL.cashPassword,
        url2: URL.SiteUrl + '/index.php?m=Api&c=User&a=userInfo',
        url3: URL.ApiUrl + URL.sendSms,
    }
    $(function () {
        //判断目标
        function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            } else {
                return null;
            }
        }

        var tag = getUrlParam("tag");
        console.log(tag);
       /* if (tag == "order") {
            $(".mui-title").text("重置支付密码");
            $("#set").text("重置密码");
        }*/


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

//获取个人信息
        var paypasswd ,phone;
        resdata(urls.url2, {token: token, uesr_id: user_id,}, function (data) {
            console.log(data);
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
                paypasswd = data.result.paypasswd;
                phone = data.result.mobile;
                if (paypasswd !== "") {
                    $(".mui-title").text("重置支付密码");
                    $("#set").text("重置密码");
                }
            }


        })
        //点击获取短信验证码
        var times, code;
        $(".register-yzm").on("click", function () {
            times = 60;
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
        })
        $(".user-input").on("blur",function () {
            if ($(this).val().length<6){
                mui.toast("请输入6位数字密码", {duration: 'long', type: 'div'});
            }
        })

        //提交修改密码
        $("#set").on("click", function () {

            paypasswd = $(".paypasswd").val();
            c_paypasswd = $(".c_paypasswd").val();
            if (paypasswd.length<6){
                mui.toast("请输入6位数字密码", {duration: 'long', type: 'div'});
                return;
            }

            // console.log(old_password);
            var code2 = $(".test").val();
            if (code2 == code) {
                var data1 = {
                    token: token,
                    uesr_id: user_id,
                    paypasswd: paypasswd,
                    c_paypasswd: c_paypasswd,
                    do: "add",
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
                        if (tag == "order") {
                            mui.toast(data.msg, {duration: 'long', type: 'div'});
                            location.href = "order.html";
                            return false;
                        } else {
                            mui.alert(data.msg, '温馨提示', function () {
                                // location.href = "withdrawal.html"
                            });
                        }
                    } else {
                        mui.toast(data.msg, {duration: 'long', type: 'div'});
                    }
                })

            }else {
                mui.toast("验证码错误", {duration: 'long', type: 'div'});
            }
        })


    })
})()
