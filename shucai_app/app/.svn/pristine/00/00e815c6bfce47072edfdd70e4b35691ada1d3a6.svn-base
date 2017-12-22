/**
 * Created by lenovo on 2017/3/24.
 */
(function () {
    $(function () {
        var $cancel = $('.cancel');
        var $show = $('.show');
        var $userInput = $('#username');
        var $passInput = $('#password');
        $userInput.on('input propertychange', function () {
            if ($(this).val().length > 0) {
                $cancel.css('display', 'block');
            }
            if ($(this).val().length == 0) {
                $cancel.css('display', 'none');
            }
        });
        $cancel.on('click', function () {
            $userInput.val('');
            $(this).css('display','none');
        });
        $show.on('click', function () {
            if($passInput.attr('type') == 'password'){
                $(this).removeClass('hide');
                $passInput.attr('type','text');
            }else{
                $(this).addClass('hide');
                $passInput.attr('type','password');
            }
        });
        // $a="{0},{1}".format("pan.decadework.com", "免费外链网盘");

        $("#login").click(function () {

            var userName = $("#username").val();
            var userPass = $("#password").val();
            var unique_id = localStorage.getItem("unique_id");
            if (userName == "" || userName == null) {
                $("#username").val("用户名不能为空").css("color", "#EC8924");
                $("#username").focus(function () {
                    $("#username").val("");
                    $("#username").css("color", "black")
                });
                return false;
            } else if (userPass == "" || userPass == null) {
                $("#password[type='password']").attr("type", "text").val("密码不能为空")
                $("#password").css("color", "#EC8924")
                $("#password").focus(function () {
                    $("#password").val("");
                    $("#password[type='text']").attr("type", "password");
                    $("#password").css("color", "black");
                });
                return false;
            } else {
                userPass = md5('shop' + userPass);
                $.ajax({
                    type: 'post',//用post方法获取
                    //获取首页数据
                    url: URL.ApiUrl + URL.login,
                    data: {username: userName, password: userPass, unique_id: unique_id},
                    dataType: 'json',
                    success: function (data) {
                        //console.log(data);
                        if (data.status == -1 || data.status == -2) {
                            $("#username").css("color", "#EC8924").val("用户名或密码错误");
                            $("#username").focus(function () {
                                $("#username").val("");
                                $("#username").css("color", "black")
                            });
                            $("#password").focus(function () {
                                $("#password").val("");
                                $("#password").css("color", "black")
                            });
                        } else if (data.status == 1) {
                            mui.toast("登录成功", {duration: 'long', type: 'div'});
                            //记录用户登录数据
                            var v1 = data.result.token;
                            var v2 = data.result.user_id;
                            localStorage.setItem("token", v1);
                            localStorage.setItem("user_id", v2);
                            location.href = "index.html"
                        }
                    },error: function (data) {
                        mui.toast(data.msg, {duration: 'long', type: 'div'});
                    }
                    
                })
            }
        })
    })
    //第三方登录


})()