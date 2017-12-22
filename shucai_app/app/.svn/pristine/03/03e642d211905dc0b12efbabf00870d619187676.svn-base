/**
 * Created by Administrator on 2017/6/2 0002.
 */
(function () {
    var times, _yzm;
    var unique_id = localStorage.getItem("unique_id");

    function timeEnd() {
        if (times == 0) {
            $(".register-yzm").removeAttr("disabled");
            $(".register-yzm").text("获取短信验证码");
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

    function yzPhone(that, tag) {
        var reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/i;//验证手机正则(输入前7位至11位)
        var str = "";
        if (that.val() == "" || that.val() == "请输入手机号") {
            str = "手机号不能为空";
        } else if (that.val().length < 11) {
            str = "手机号码长度有误";
        } else if (!reg.test(that.val())) {
            str = "手机号码不存在";
        }
        if (!str) {
            return true;
        }
        if (tag) {
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

    $('.register-yzm').on('click', function () {
        times = 60;
        var username = $(".mobile").val();
        var unique_id = window.localStorage.getItem("unique_id");
        $.ajax({
            type: "get",
            url: URL.ApiUrl + '' + URL.sendSms,
            data: {mobile: username, unique_id: unique_id},
            dataType: "json",
            error: function (data) {
                mui.toast(data.msg, {duration: 'long', type: 'div'})
            },
            success: function (data) {
                _yzm = data.msg;
                console.log(_yzm);
                timeEnd();
            }
        })
    });

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
    $(".confirm").blur(function () {
        var pwd1 = $(".password").val()
        var pwd2 = $(this).val();
        if (($(this).val() == '请再次输入密码' || $(this).val() == "") && (pwd1 == "请输入密码" || pwd1 == "")) {
            return;
        } else if (pwd1 != pwd2) {
            $(".confirm").attr("type", "text").val("两次密码输入不一致！").css("color", "#EC8924");
            $(".confirm").focus(function () {
                $(".confirm").attr("type", "password");
                $(".confirm").val("");
                $(".confirm").css("color", "black")
            })
        }
    });


    $(".mobile").blur(function () {
        yzPhone($(this), true);
    });


    $('.user-button').on('click', function () {
        var phonenum = $('.mobile').val();
        var yzm = $('#yzm').val();
        var password = $('.password').val();
        var confirm = $('.confirm').val();
        if (phonenum != "" && yzm != "" && password != "" && confirm != "") {
            if (yzm == _yzm && password == confirm) {
                $.ajax({
                    type: "post",
                    url: URL.SiteUrl + "index.php?m=Api&c=User&a=forgetPasswd",
                    data: {username: phonenum, code: yzm, password: password, password2: confirm, unique_id: unique_id},
                    dataType: "json",
                    error: function (data) {
                        mui.toast(data.msg, {duration: 'long', type: 'div'})
                    },
                    success: function (data) {
                        if(data.status == 1){
                            mui.toast(data.msg, {duration: 'long', type: 'div'});
                            window.location.href = "login.html";
                        }else{
                            mui.toast(data.msg, {duration: 'long', type: 'div'})
                        }
                    }
                })
            }
        }
    });
})();