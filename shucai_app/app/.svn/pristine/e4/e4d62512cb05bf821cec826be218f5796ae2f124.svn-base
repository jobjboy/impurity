/**
 * Created by lenovo on 2017/4/3.
 */
(function () {
    //传递的参数
    var token = localStorage.getItem("token");
    var user_id = localStorage.getItem("user_id");
    var unique_id = localStorage.getItem("unique_id");
    var data1 = {info: {token: token, uesr_id: user_id}};
    var page;
    var urls = {
        url1: URL.ApiUrl + '' + URL.getGoodsCollect,
        url2: URL.ApiUrl + '' + URL.collectGoods,
    }
    $(function () {
        // ajax 获取数据
        function resdata(url, method, mdata, successCall,beforSend) {
            $.ajax({
                type: method,
                url: url,
                data: mdata,
                dataType: "json",
                error: function (data) {
                    $("#lodding").css("display","none");
                    mui.toast(data.msg, {duration: 'long', type: 'div'})
                },
                success: successCall,
                beforSend: beforSend,
            })
        }

        resdata(urls.url1, "post" ,data1.info, function (data) {
            if (data.result.length > 0) {
                $(".fail").css("display","none");
            } else {
                $(".fail").css("display","block");
            }
            $("#lodding").css("display","none");

            // console.log(data1.info);
            // console.log("ok");
            // 购物车有无商品

            if (data.status == -2) {
                mui.alert(data.msg, '温馨提示', function () {
                    location.href = "shopping_cart.html"
                });
            } else if (data.status == -102 || data.status == -101) {
                mui.alert(data.msg, '温馨提示', function () {
                    location.href = "login.html"
                });
            }
            //渲染模板数据
            var html = template('collect_list', data);
                // console.log(html);
            $('#collectList').html(html);


            //点击删除
            function deleteitem() {
                $(".collect_de").off("click").on("click" ,function () {
                    var goods_id = $(this).siblings(".goodsId").val()
                    var type = 1

                    // console.log(goods_id);

                    var data2 ={
                        token: token,
                        uesr_id: user_id,
                        goods_id:goods_id,
                        type:type
                    }
                    resdata(urls.url2, "get",data2, function (data) {
                        // //console.log(data);
                        // console.log("ok");
                        if (data.status == -2) {
                            mui.alert(data.msg, '温馨提示', function () {
                            });
                        } else if (data.status == -102) {
                            mui.alert(data.msg, '温馨提示', function () {
                                location.href = "login.html"
                            });
                        }else if (data.status == 1){
                            mui.alert(data.msg, '温馨提示', function () {
                                history.go(0);
                            });
                        }
                    })
                })

            }
            deleteitem();
    //      点击加入购物车
            function addcart() {
                $(".collect_add").off("click").on("click", function () {
                    var goods_id = $(this).next(".goodsId").val();
                    var gooods_num = 1;
                    //console.log(goods_id);
                    $.ajax({
                        type: 'post',
                        url: URL.ApiUrl + URL.addCart,
                        data: {
                            user_id: user_id,
                            unique_id: unique_id,
                            token: token,
                            goods_id: goods_id,
                            goods_num: gooods_num
                        },
                        dataType: 'json',
                        success: function (data) {
                            // console.log("ok");
                            // console.log(data);
                            mui.toast(data.msg,{ duration:'long', type:'div' });
                        }
                    });
                });
            }

            addcart();
        },function () {
            $("#lodding").css("display","block");

        })

        page=1

        refresh({
            content: "#tabbox",
            down: ".pre_lodding",
            // up: ".up_lodding",
            null:".null"
        }, {
            upCallback: null,
            downCallback: function (e) {
                var that = this;
                setTimeout(function () {
                    that.back.call();
                    that.hideDown();
                    var tag = true;
                    if (tag) {
                        page++;
                        /**
                         * TODO
                         */
                        resdata(urls.url1+"&p="+page+"", "post" ,data1.info, function (data) {
                            //渲染模板数据
                            var html = template('collect_list', data);
                            // console.log(html);
                            $('#collectList').append(html);


                            //点击删除
                            function deleteitem() {
                                $(".collect_de").off("click").on("click" ,function () {
                                    var goods_id = $(this).siblings(".goodsId").val()
                                    var type = 1

                                    // console.log(goods_id);

                                    var data2 ={
                                        token: token,
                                        uesr_id: user_id,
                                        goods_id:goods_id,
                                        type:type
                                    }
                                    resdata(urls.url2, "get",data2, function (data) {
                                        // //console.log(data);
                                        // console.log("ok");
                                        if (data.status == -2) {
                                            mui.alert(data.msg, '温馨提示', function () {
                                            });
                                        } else if (data.status == -102) {
                                            mui.alert(data.msg, '温馨提示', function () {
                                                location.href = "login.html"
                                            });
                                        }else if (data.status == 1){
                                            mui.alert(data.msg, '温馨提示', function () {
                                                history.go(0);
                                            });
                                        }
                                    })
                                })

                            }
                            deleteitem();
                            //      点击加入购物车
                            function addcart() {
                                $(".collect_add").off("click").on("click", function () {
                                    var goods_id = $(this).next(".goodsId").val();
                                    var gooods_num = 1;
                                    //console.log(goods_id);
                                    $.ajax({
                                        type: 'post',
                                        url: URL.ApiUrl + URL.addCart,
                                        data: {
                                            user_id: user_id,
                                            unique_id: unique_id,
                                            token: token,
                                            goods_id: goods_id,
                                            goods_num: gooods_num
                                        },
                                        dataType: 'json',
                                        success: function (data) {
                                            // console.log("ok");
                                            // console.log(data);
                                            mui.toast(data.msg,{ duration:'long', type:'div' });
                                        }
                                    });
                                });
                            }

                            addcart();
                        },function () {
                            $("#lodding").css("display","block");

                        })

                        tag = false;
                        that.showNull();
                    }
                }, 2000);
            }
        });
    })
})()