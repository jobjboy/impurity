/**
 * Created by lenovo on 2017/4/3.
 */
(function () {


    //传递的参数
    var token = localStorage.getItem("token");
    var user_id = localStorage.getItem("user_id");
    var unique_id = localStorage.getItem("unique_id");

    var data1 = {info: {token: token, user_id: user_id}}
    var urls = {
        url1: URL.SiteUrl + "/index.php?m=Api&c=User&a=userInfo",
        url2: URL.SiteUrl + "/index.php?m=Api&c=User&a=updateUserInfo",

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
                    mui.toast("网络请求失败!")
                },
                success: successCall,
            })
        }

        resdata(urls.url1, data1.info, function (data) {
            console.log(data);
            // console.log("ok");
            // nickname=data.result.nickname;
            if (data.status == -2) {
                // $("body").hide()

                mui.toast(data.msg);
                setTimeout(function () {
                    location.href = "shopping_cart.html"
                }, 3000)

            } else if (data.status == -102 || data.status == -101) {

                mui.toast(data.msg + "请重新登录");
                setTimeout(function () {
                    location.href = "login.html"
                }, 3000)

            }

            //渲染模板数据
            var html = template('userInfo', data.result)
            $('#use_info').html(html);


            var _yzm = 0;
            $('.mobile').on('click', function () {
                $(this).blur();
                showmask({}, {
                    title: "更换手机号码",
                    content: "<label style='border-bottom:1px solid #e3e3e3;display: inline-block;font-size: 14px;padding-bottom: 5px' for='phone'><input style='display: inline-block;border: none;padding: 0;' id='phone' type='number' maxlength='13' placeholder='请输入手机号码'/></label>" +
                    "<label style='position: relative;padding-top: 10px;display: inline-block;font-size: 14px;' for='yzm'><input style='display: inline-block;border: none;padding: 0;' id='yzm' type='number' maxlength='4'  placeholder='输入验证码'/><button type='button' class='register-yzm'>获取验证码</button></label>",
                    contentImage: "",
                    enterButton: "确定",
                    cancelButton: "取消"
                }, {
                    enterCb: function () {
                        console.log();
                        var username = $("#phone").val();
                        var code1=   $('#yzm').val();
                        if (code1==_yzm){
                            $.ajax({
                                type: "post",
                                url: urls.url2,
                                data: {
                                    mobile: username,
                                    unique_id: unique_id,
                                    success: "ok",
                                    code: _yzm,
                                    token: token,
                                    user_id: user_id
                                },
                                dataType: "json",
                                error: function (data) {
                                    mui.toast(data.msg, {duration: 'long', type: 'div'})
                                },
                                success: function (data) {
                                    if (data.status == 1) {
                                        mui.alert("更换手机号成功,请重新登录", '温馨提示', function () {
                                            localStorage.removeItem("user_id");
                                            localStorage.removeItem("token");
                                            location.href = "login.html"
                                        });
                                    } else {
                                        mui.toast(data.msg, {duration: 'long', type: 'div'})
                                    }
                                }
                            })
                        }else {
                            mui.toast("验证码错误", {duration: 'long', type: 'div'})
                        }

                    },
                    cancelCb: function () {
                        $(".background").remove();
                    }
                }).show();
                //验证手机号码
                $("#phone").on("blur", function () {
                    yzPhone($(this), true, "phone");
                });
                var Yzm = $('#yzm');
                //验证验证码
               /* Yzm.on("blur", function () {
                    console.log(123);
                    var reg = /^\d{4}$/;
                    if (Yzm.val() == "" || Yzm.val() == null) {
                        mui.toast("验证码不能为空", {duration: 'long', type: 'div'});
                    }
                    else if (Yzm.val().length < 4) {
                        mui.toast("验证码长度有误", {duration: 'long', type: 'div'});
                    }
                    else if (!reg.test(Yzm.val())) {
                        mui.toast("验证码不存在", {duration: 'long', type: 'div'});
                    }
                });*/
                var times;
                $('.register-yzm').on('click', function () {
                    console.log(123);
                    times = 60;
                    if (yzPhone($("#phone"), false, "phone")) {
                        var username = $("#phone").val();
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
                            }
                        })
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

                        timeEnd();
                        // console.log(data1.mobile);
                    }

                })
            });
            if (!data.result.mobile) {
                mui.toast("请填写手机号码", {duration: 'long', type: 'div'});
            }
            if (data.result.head_pic == null || data.result.head_pic == "") {
                $("#header_pic img").attr("src", "images/personal/head_pic.png");
            } else {
                $("#header_pic img").attr("src", data.result.head_pic + '?t=' + new Date().getTime())
            }


            /*//性别判断默认选中
             var sex1 = data.result.sex;
             if (sex1 == 0) {
             $(".secret").attr("checked", "checked")
             } else if (sex1 == 1) {
             $(".man").attr("checked", "checked")
             } else if (sex1 == 2) {
             $(".woman").attr("checked", "checked")
             }*/

            /*  $(".radio").click(function () {
             // console.log($(".sexsz").val())
             // console.log(123)
             $(".woman").attr("checked")
             if (typeof($(".secret").attr("checked")) !== "undefined") {
             $(".sexsz").val(0)
             // console.log(5)

             } /!*else if (typeof($(".man").attr("checked")) !== "undefined") {
             $(".sexsz").val(1)
             } else if (typeof($(".woman").attr("checked")) !== "undefined") {
             $(".sexsz").val(2)
             }*!/
             })*/

            // $(".picture-img").on("click",function () {
            function plusReady() {
                // 弹出系统选择按钮框
                mui("body").on("tap", ".picture-img", function () {
                    page.imgUp();
                })

            }

            var page = null;
            page = {
                imgUp: function () {
                    var m = this;
                    plus.nativeUI.actionSheet({
                        cancel: "取消", buttons: [
                            {title: "拍照"},
                            {title: "从相册中选择"}
                        ]
                    }, function (e) {//1 是拍照  2 从相册中选择
                        switch (e.index) {
                            case 1:
                                clickCamera();
                                break;
                            case 2:
                                clickGallery();
                                break;
                        }
                    });
                }
                //摄像头
            }


            //发送照片
            function clickGallery() {
                plus.gallery.pick(function (path) {
                    plus.zip.compressImage({
                        src: path,
                        dst: "_doc/chat/gallery/" + path,
                        quality: 20,
                        overwrite: true
                    }, function (e) {
                        $("#lodding").css("display", "block")
                        console.log(token);
                        var task = plus.uploader.createUpload(urls.url2, {
                            method: "post",
                            blocksize: 204800,
                            priority: 100,
                            timeout: 60000,
                        }, function (t, sta) {
                            //console.log(JSON.stringify(t))
                            if (sta == 200) {
                                $("#lodding").css("display", "none");
                                t.responseText = JSON.parse(t.responseText);
                                if (t.responseText.status == 1) {
                                    mui.toast("上传成功！！");
                                    // resdata(http://chat.xionggouba.com:8066/api/chat/modifyuser)
                                    //{"userId":user_id,"nickname":"zx","headPic":"t.responseText.result"}
                                    console.log(t.responseText);
                                    console.log(JSON.stringify(t.responseText));

                                    // return;
                                    location.href = "personal.html";
                                } else {
                                    mui.toast(t.responseText.msg);
                                }
                                /*var msg = t.responseText;
                                 var oImg = JSON.parse(msg);
                                 var imgUrl = oImg.urls;
                                 var re = new RegExp("\\\\", "g");
                                 imgUrl = imgUrl.replace(re, "/");
                                 uploadMsg(2, imgUrl);*/

                            } else {
                                mui.toast("上传失败！！");
                                //console.log(t.responseText);
                            }
                        });
                        task.addFile(e.target, {});
                        task.addData("token", token);
                        task.addData("uesr_id", user_id);
                        task.start();
                    }, function (err) {
                        console.error("压缩失败：" + err.message);
                        mui.toast(err.message);
                    });

                }, function (err) {
                });
            };


            // 拍照
            function clickCamera() {
                var cmr = plus.camera.getCamera();
                var res = cmr.supportedImageResolutions[0];
                var fmt = cmr.supportedImageFormats[0];
                cmr.captureImage(function (path) {
                    //plus.io.resolveLocalFileSystemURL(path, function(entry) {
                    plus.io.resolveLocalFileSystemURL(path, function (entry) {
                        var localUrl = entry.toLocalURL();
                        plus.zip.compressImage({
                            src: localUrl,
                            dst: "_doc/chat/camera/" + localUrl,
                            quality: 20,
                            overwrite: true
                        }, function (e) {
                            $("#lodding").css("display", "block")
                            var task = plus.uploader.createUpload(urls.url2, {
                                method: "post",
                                blocksize: 204800,
                                priority: 100,
                                timeout: 60000,
                            }, function (t, sta) {
                                if (sta == 200) {
                                    $("#lodding").css("display", "none")
                                    mui.toast("上传成功！！");
                                    location.href = "personal.html";
                                } else {
                                    mui.toast("上传失败！！");
                                    //console.log(t.responseText);
                                }
                            });
                            task.addFile(e.target, {});
                            task.addData("token", token);
                            task.addData("uesr_id", user_id);
                            task.start();
                        }, function (err) {
                            //console.log("压缩失败：  " + err.message);
                            mui.toast(err.message);
                        });
                    });
                }, function (err) {
                    console.error("拍照失败：" + err.message);
                    mui.toast(err.message);
                }, {
                    index: 1
                });
            };


            if (window.plus) {
                plusReady();
            } else {
                document.addEventListener("plusready", plusReady, false);
            }
            //验证手机号码
            $(".mobile").blur(function () {
                yzPhone($(this), true, "phone");
                /*  if(!$('#yzm').val()){
                 $(this).parent().next().remove();
                 }*/
            });
            var times;

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


            //验证邮箱号码
            $(".email").blur(function () {
                console.log(123);
                yzPhone($(this), true);
            });
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
                } else if (!reg2.test(that.val())) {
                    str = "邮箱不存在!";
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
            var nickname, qq, mobile, sex, email, yzm_;
            nickname = $(".nickname").val();
            qq = $(".qq").val();
            mobile = $(".mobile").val();
            // sex = $(".sex").val();
            var data1 = {
                token: token,
                uesr_id: user_id,
                nickname: nickname,
                qq: qq,
                mobile: mobile
            }

            resdata(urls.url2, data1, function (data) {

                // console.log("ok");
                // console.log(typeof data.result.shippingList[0].code);
                if (data.status == -2) {
                    // $("body").hide()
                    mui.toast(data.msg);

                } else if (data.status == -102) {

                    mui.toast(data.msg);

                    setTimeout(function () {
                        location.href = "login.html"
                    }, 3000);

                } else if (data.status == 1) {

                    mui.toast(data.msg);
                    setTimeout(function () {
                        location.href = "personal.html"
                    }, 3000);
                }


            })
        })
    })
})()


