/**
 * Created by Administrator on 2017/4/24 0024.
 */
(function () {
    var unique_id = localStorage.getItem("unique_id");
    var user_id = localStorage.getItem("user_id");
    var token = localStorage.getItem("token");
   /* var datas = {
        data: [{'money': '1', 'fullmoney': '12', 'time': '2017-4-30'},
            {'money': '10', 'fullmoney': '30', 'time': '2017-3-30'},
            {'money': '20', 'fullmoney': '100', 'time': '2017-4-10'},
            {'money': '12', 'fullmoney': '50', 'time': '2017-4-23'},
            {'money': '15', 'fullmoney': '60', 'time': '2017-4-14'}]
    };*/
    $("#offercard_content_dontuse").css({"display": "block"}).children().addClass("offercard_dontuse");
    var $tabs = $("#tabs");
    var tag , page = 1,page2=1;
    $.ajax({
        type: 'get',
        url: URL.SiteUrl + '/index.php?m=Api&c=User&a=getCouponList',
        data: {
            user_id: user_id,
            token: token,
            type: 0
        },
        dataType: 'json',
        success: function (data) {
            $("#lodding").css("display","none");
            if (data.result.length > 0) {
                $(".fail").css("display","none");
            } else {
                $(".fail").css("display","block");
            }
            //console.log(data);
            $.each(data.result, function (index, obj) {
                obj.use_end_time = formatDate(obj.use_end_time);
                
                obj.money = obj.money.split(".")[0];
            });
            var html = template("offercard_item", data);
            $("#offercard_content_dontuse").append(html);
            $("#offercard_content_dontuse").children().addClass("offercard_dontuse");
            
            
            tag = refresh({
                content: "#offercard_content_dontuse",
                down: ".pre_lodding",
                // up: ".up_lodding",
                null: ".null"
            }, {
                upCallback: null,
                downCallback: function (e)
                {
                    var that = this;
                    setTimeout(function () {
                        that.back.call();
                        that.hideDown();
                        var tag = true;
                        if (tag) {
                            /**
                             * TODO
                             */
                            page++;
                            $.ajax({
                                type: "post",
                                url: URL.SiteUrl + '/index.php?m=Api&c=User&a=getCouponList&page='+page+'',
                                data: {
                                    user_id: user_id,
                                    token: token,
                                    type: 0
                                },
                                dataType: 'json',
                                success: function (data) {
                                    that.hideDown();
                                    $.each(data.result, function (index, obj) {
                                        obj.use_end_time = formatDate(obj.use_end_time);
                                        obj.money = obj.money.split(".")[0];
                                    });
                                    var html = template("offercard_item", data);
                                    $("#offercard_content_dontuse").append(html);
                                    $("#offercard_content_dontuse").children().addClass("offercard_dontuse");

                                   
                                    /* if (!$goods_list || !$goods_list.length) {
                                     that.showNull();
                                     }*/
                                },
                                error: function (data) {
                                    mui.toast(data.msg, {duration: 'long', type: 'div'})
                                },
                            });
                            tag = false;
                            that.showNull();
                        }
                    }, 2000);
                }
            });
        },
        beforeSend:function(){
            $("#lodding").css("display","block");
        },error:function (data) {
            $("#lodding").css("display","none");
                mui.toast("网络请求失败！", {duration: 'long', type: 'div'});
        }
    });
    var id = 0;
    $tabs.delegate("dd", "click", function (event) {
        if (tag) {
            tag.hideNull();
        }
        var $target = $(event.currentTarget);
        $target.addClass("thistab").siblings().removeClass("thistab");
        var $id = $target.attr("id");
        var $currentPanel = $("#offercard_content_" + $id);
        $currentPanel.css({"display": "block"}).siblings().css({"display": "none"});


        if($id == "dontuse"){
            id = 0;
        }
        if($id == "hasuse"){
            id = 1;
        }
        if($id == "expired"){
            id = 2;
        }
        $.ajax({
            type: 'get',
            url: URL.SiteUrl + '/index.php?m=Api&c=User&a=getCouponList',
            data: {
                user_id: user_id,
                token: token,
                type: id
            },
            dataType: 'json',
            success: function (data) {
                $("#lodding").css("display","none");
                if (data.result.length > 0) {
                    $(".fail").css("display","none");
                } else {
                    $(".fail").css("display","block");
                }
                //console.log(data);
                $.each(data.result, function (index, obj) {
                    obj.use_end_time = formatDate(obj.use_end_time);
                    obj.money = obj.money.split(".")[0];
                });
                var html = template("offercard_item", data);
                $currentPanel.html(html);
                $currentPanel.children().addClass("offercard_" + $id);

                // $currentPanel.css("display","block");

                tag = refresh({
                    content: $currentPanel,
                    down: ".pre_lodding",
                    // up: ".up_lodding",
                    null: ".null"
                }, {
                    upCallback: null,
                    downCallback: function (e) {
                        var that = this;
                        setTimeout(function () {
                            that.back.call();
                            that.hideDown();
                            var tag = true;
                            page2++;
                            if (tag) {
                                /**
                                 * TODO
                                 */
                                if($id == "dontuse"){
                                    id = 0;
                                }
                                if($id == "hasuse"){
                                    id = 1;
                                }
                                if($id == "expired"){
                                    id = 2;
                                }
                                $.ajax({
                                    type: 'get',
                                    url: URL.SiteUrl + '/index.php?m=Api&c=User&a=getCouponList',
                                    data: {
                                        user_id: user_id,
                                        token: token,
                                        type: id,
                                        p:page2,
                                    },
                                    dataType: 'json',
                                    success: function (data) {

                                        //console.log(data);
                                        $.each(data.result, function (index, obj) {
                                            obj.use_end_time = formatDate(obj.use_end_time);
                                            obj.money = obj.money.split(".")[0];
                                        });

                                        var html = template("offercard_item", data);
                                        $($currentPanel).append(html);
                                        $($currentPanel).children().addClass("offercard_"+$id+"");
                                        tag = false;
                                        that.showNull();
                                    }
                                })

                            }
                        }, 1000);
                    }
                });




            },
            beforeSend:function(){
                $("#lodding").css("display","block");
            },error:function () {
                $("#lodding").css("display","none");
                mui.toast(data.msg, {duration: 'long', type: 'div'});
            }
        });

       /* var html = template("offercard_item", datas);
        $currentPanel.append(html);

        $currentPanel.children().addClass("offercard_" + $target.attr("id"));
        $(".content_none").css({"display": "none"});*/

    });

    function formatDate(ns) {
        var d = new Date(ns * 1000);
        var dformat = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');
        return dformat;
    }
})();