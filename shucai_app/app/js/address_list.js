/**
 * Created by lenovo on 2017/3/30.
 */
(function () {
    //传递的参数
    var token = localStorage.getItem("token");
    var user_id = localStorage.getItem("user_id");
    var data1 = {info: {token: token, uesr_id: user_id}}
    var urls = {
        url1: URL.SiteUrl + "/index.php?m=Api&c=User&a=getAddressList",
        url2: URL.SiteUrl + "/index.php?m=Api&c=Cart&a=cart3",
        url3: URL.SiteUrl + "/index.php?m=Api&c=User&a=setDefaultAddress",
        url4: URL.SiteUrl + "/index.php?m=Api&c=User&a=del_address"
    }
    $(function () {





        // ajax 获取数据
        function resdata(url, mdata, successCall) {
            $.ajax({
                type: "get",
                url: url,
                data: mdata,
                dataType: "json",
                error: function (data) {
                    mui.toast('网络繁忙...');
                },
                success: successCall,

                beforeSend: function () {
                    $("#lodding").show();
                }, error: function (data) {
                    $("#lodding").hide();
                    mui.toast(data.msg, {duration: 'long', type: 'div'});
                }
            })
        }

        function resdata_del(url, mdata, successCall) {
            $.ajax({
                type: "get",
                url: url,
                data: mdata,
                dataType: "json",
                error: function (data) {
                    mui.toast('网络繁忙...');
                },
                success: successCall
                , error: function (data) {
                    $("#lodding").hide();
                    mui.toast(data.msg, {duration: 'long', type: 'div'});
                }
            })
        }


        function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            } else {
                return null;
            }
        }

        var _tag = getUrlParam("tag");

        var tgs = location.hash;
        var tg = String(tgs.split("=")[3]);
        var oid = String(tgs.split("=")[1]);
        var rent = tgs.split("#")[1];
        console.log(_tag);

        $('.return_btn').on('click', function () {
           /* if (_tag == 2) {
                window.location.href = "personal.html";
            }
            else if (tg == 3) {
                window.location.href = "orderDetails.html?order_id=" + oid + "";
            }
            else if (_tag == "car") {
                window.location.href = "order.html";
            } else if (tgs.indexOf("rentoutOrder") !== -1) {
                window.location.href = "rentoutOrder.html?" + rent + "";
            } else if (_tag == 5) {
                // plus.webview.currentWebview().close();
                // window.location.href = "prizeCenter.html";
                // plus.webview.open("prizeCenter.html", "tt")
                window.history.go(-1);

            }

            else {
                window.history.go(-1);
            }*/
            window.history.go(-1);

        });

        $('.address-button').on('click', function () {
            if (_tag == "2") {
                window.location.href = "add_address.html?tag=2";
            } else if (_tag == "car") {
                window.location.href = "add_address.html?tag=car";
            } else if (_tag == 5) {
                window.location.href = "add_address.html?tag=5";
            }
            else if (tg == 3) {
                window.location.href = "add_address.html" + tgs + "";
            } else if (tgs.indexOf("rentoutOrder") !== -1) {
                window.location.href = "add_address.html" + tgs + "";
            }
            else {
                window.location.href = "add_address.html";
            }
        });


        resdata(urls.url1, data1.info, function (data) {
            console.log(data);

            $("#lodding").hide();
            if (data.status == 0) {
                // console.log(123);
                $("#zanwu").css("display", "block");
            }
            if (data.status == -2) {

                mui.alert(data.msg, '温馨提示', function () {
                    location.href = "shopping_cart.html"
                });
            } else if (data.status == -102 || data.status == -101) {
                location.href = "login.html"
            }


            //渲染模板数据
            var html = template('address_list', data)
            $('#addressList').html(html)

            $(".edit_li").delegate(".addButton", "click", function (e) {
                if (_tag == "2") {
                    window.location.href = $(e.currentTarget).attr("data-addid") + "?tag=2";
                } else if (tg == 3) {
                    window.location.href = $(e.currentTarget).attr("data-addid") + tgs + "";
                }
                else if (_tag == "car") {
                    window.location.href = $(e.currentTarget).attr("data-addid") + "?tag=car";
                } else if (_tag == 5) {
                    window.location.href = $(e.currentTarget).attr("data-addid") + "?tag=5";
                }
                else if (tgs.indexOf("rentoutOrder") !== -1) {
                    window.location.href = $(e.currentTarget).attr("data-addid") + tgs + "";
                }
            })

            /**
             * 设为默认地址
             */
            $('.add-list-line input,.add-list-line label').on('tap', function (event) {

                var _that = $(this);
                var address_id = _that.data('id');
                //保存传递的参数
                var info1 = {
                    token: token,
                    user_id: user_id,
                    address_id: address_id
                };

                resdata2(urls.url3, info1, function (data) {

                    if (data.status == 1) {

                        mui.toast("设为默认地址" + data.msg);
                        setTimeout(function () {
                            location.reload();
                        }, 1000);

                    } else if (data.status == -1) {
                        mui.toast(data.msg);

                    } else if (data.status == -102 || data.status == -101) {
                        alert(data.msg);

                    }
                })
            });

            //点击删除图标地址
            $(".add-list-line a.delButton").on("tap", function () {
                var _that = $(this);
                var addressId = _that.data('id');
                del_address_id = addressId;
            });

            /**
             * 这才是删除
             */
            $("a#del_address").on("tap", function () {

                if (del_address_id) {

                    var info2 = {
                        token: token,
                        user_id: user_id,
                        id: del_address_id
                    }
                    resdata_del(urls.url4, info2, function (data) {


                        if (data.status == 1) {

                            mui('#delete').popover('hide');
                            mui.toast("删除成功");
                            $("#li_" + del_address_id).remove();

                        } else if (data.status == -102 || data.status == -101) {

                            mui.alert(data.msg, '温馨提示', function () {
                                location.href = "login.html"
                            });
                        }
                    })
                } else {
                    mui.toast("删除失败");
                }

            });


            // ajax 获取数据
            function resdata2(url, mdata, successCall) {
                $.ajax({
                    type: "post",
                    url: url,
                    data: mdata,
                    dataType: "json",
                    error: function (data) {
                        mui.toast(data.msg, {duration: 'long', type: 'div'})
                    },
                    success: successCall

                })
            }

            //  默认值选中
            $(".ys").each(function () {
                if (parseInt($($(this)).siblings(".mr").val()) == 1) {
                    $(this).addClass("xz");
                }
            })

        })

    })
})()



