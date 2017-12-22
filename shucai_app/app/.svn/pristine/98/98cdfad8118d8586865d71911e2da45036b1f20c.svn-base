/**
 * Created by lenovo on 2017/3/30.
 */
(function () {
//传递的参数
    var token, user_id, consignee, province, city, district, address, mobile
    token = localStorage.getItem("token");
    user_id = localStorage.getItem("user_id");

    var urls = {
        url1: URL.SiteUrl + "/index.php?m=Api&c=User&a=addAddress",
    }
var a;
    if(a){
        console.log(789);
    }
    var flag=true;
    console.log(flag);
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


    //验证手机号码
    $(".mobile").blur(function () {
        console.log(123);
        yzPhone($(this), true);
    });

    $(function () {
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
        // console.log(tag);
        // 暂时不要删除

        /* if (tag == "car") {
         mui.init({
         keyEventBind: {
         backbutton: true //打开back按键监听
         }
         });
         mui.back = function () {
         // plus.webview.hide("order1")
         // plus.webview.close("order1")
         location.href = "address_list.html?tag=car";
         }
         }*/


        var tgs = location.hash;
        var tg = String(tgs.split("=")[3]);
        var oid = String(tgs.split("=")[1]);
        // console.log(tgs);
        // console.log(tg);
        // console.log(oid);
        // console.log(_tag);
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


        $(".address-button").on("click", function () {
            consignee = $("#consignee").val(); //收件人
            if (!$.trim(consignee)) {
                mui.toast('请填写收货人信息!', {duration: 'long', type: 'div'});
                return;
            }

            address = $("#address_detail").val(); //详细地址
            if (!$.trim(address)) {
                mui.toast('请填写收货人详细地址!', {duration: 'long', type: 'div'});
                return;
            }

            mobile = $("#mobile").val();
            if (!$.trim(mobile)) {
                mui.toast('请填写收货人手机号码!', {duration: 'long', type: 'div'});
                return;
            }

            province = $("#address_edit").attr("data-p");
            city = $("#address_edit").attr("data-c");
            district = $("#address_edit").attr("data-d");
            var data1 = {
                token: token,
                uesr_id: user_id,
                consignee: consignee,
                province: province,
                city: city,
                district: district,
                street: street.id,//街道ID
                streetNum: streetNum.id, //区域ID
                address: address,
                mobile: mobile
            }

            /* console.log(data1);
             return;*/
            console.log(flag);

            if (flag) {

                resdata(urls.url1, data1, function (data) {
                    //console.log(data.status);

                    if (data.status == -2) {

                        mui.toast(data.msg, {duration: 'long', type: 'div'});

                    } else if (data.status == -102) {

                        mui.alert(data.msg, '温馨提示', function () {
                            location.href = "login.html";
                        });

                    } else if (data.status == 1) {

                        /*mui.alert(data.msg, '温馨提示', function () {
                         if (tag == "car") {
                         location.href = "order.html";
                         }
                         else if (tag == 2) {
                         location.href = "address_list.html?tag=2";
                         } else if (tg == 3) {
                         location.href = "address_list.html?" + tgs + "";
                         } else if (tag == 5) {
                         location.href = "address_list.html?tag=5";
                         }
                         else if (tgs.indexOf("rentoutOrder") !== -1) {
                         window.location.href = "address_list.html" + tgs + "";
                         }
                         else {
                         location.href = "address_list.html";
                         }
                         });*/
                        mui.toast(data.msg, {duration: 'long', type: 'div'});
                        flag = false;
                        console.log(flag);
                    } else {
                        mui.toast(data.msg, {duration: 'long', type: 'div'});
                        console.log(123);
                    }
                })
            } else {
                mui.toast("已添加成功", {duration: 'long', type: 'div'})
            }
        })


    })
})()
