/**
 * Created by lenovo on 2017/4/3.
 */
(function () {


    //传递的参数
    var token = localStorage.getItem("token");
    var user_id = localStorage.getItem("user_id");
    var unique_id = localStorage.getItem("unique_id");
    var oauthInfo = sessionStorage.getItem("oauthData");
    var _yzm = 0;
    var urls = {
        url1: URL.SiteUrl + "/index.php?m=Api&c=User&a=bindPhone",
        url2: URL.ApiUrl + URL.sendSms,

    }
    $(function () {
        // ajax 获取数据
        function resdata(url, mdata, successCall) {
            $.ajax({
                type: "post",
                url: url,
                data: mdata,
                cache: false,
                dataType: "json",
                error: function (data) {
                    mui.toast("请求失败!")

                },
                success: successCall,
            })
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
        //密码栏失去焦点
        $(".password").blur(function () {
            var reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
            if (!reg.test($(".password").val())) {
                $(".password").attr("type", "text").val("请输入6~12位的数字、字母！").css("color", "#EC8924");
                $(".password").focus(function () {
                    $(".password").attr("type", "password");
                    $(".password").val("");
                    $(".password").css("color", "black")
                });
            }
        });
        //验证手机号码
        $(".mobile").blur(function () {
            yzPhone($(this), true, "phone");
            /*  if(!$('#yzm').val()){
             $(this).parent().next().remove();
             }*/
        });
        var times;
        //点击获取短信验证码
        $(".register-yzm").on("click", function () {
            times = 60;
            if (yzPhone($(".mobile"), false)) {
                var username = $(".mobile").val();
                var data1 = {mobile: username, unique_id: unique_id}
                console.log(data1);
                resdata(urls.url2, data1, function (data) {
                    console.log(data1);
                    console.log(data);
                    console.log("ok");
                    if (data.is_reg !== 0) {
                        $(".passwordbar").css("display", "block");
                        mui.toast("请设置登录密码", {duration: 'long', type: 'div'});
                    }
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

        // })


        //验证手机号码
        function yzPhone(that, tag, type) {
            var reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/i;//验证手机正则(输入前7位至11位)
            var reg2 = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if (type == "phone") {
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
            } else {
                var str = "";
                if (that.val() == "" || that.val() == "请输入手机号") {
                    // str = "手机号不能为空!";
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

        }


        //点击修改保存信息
        $(".user-button").on("click", function () {
            var mobile, yzm_;
            mobile = $(".mobile").val();
            yzm_ = $("#yzm").val();
            console.log(oauthInfo);

            oauthInfo=JSON.parse(oauthInfo);
            console.log(JSON.stringify(oauthInfo));

            var data2 = {
                mobile: mobile,
                unique_id: unique_id,
                code: yzm_,
                openid: oauthInfo.openid,
                from: oauthInfo.from,
                nickname: oauthInfo.nickname,
                head_pic: oauthInfo.head_pic,
            }

            console.log(JSON.stringify(data2));
            resdata(urls.url1, data2, function (data) {
                console.log(JSON.stringify(data));
                console.log("ok");
                // console.log(typeof data.result.shippingList[0].code);
                if (data.status == 1) {
                    // $("body").hide()
                    var v1 = data.result.token;
                    var v2 = data.result.user_id;
                    localStorage.setItem("token", v1);
                    localStorage.setItem("user_id", v2);
                    mui.toast("绑定成功", {duration: 'long', type: 'div'});

                    location.href="index.html";
                } else {
                    mui.toast(data.msg, {duration: 'long', type: 'div'});
                }

            })
        })
    })
})()


