/**
 * Created by Administrator on 2017/4/13 0013.
 */
(function () {
    //http://192.168.0.116/index.php?m=Api&c=Goods&a=getGoodsComment&p=1&goods_id=155
    var pageP = 1, str = "";
    //获取url中的goodId参数
    try {
       var goodId = getUrlParam('goods_id');
    } catch (e) {
        mui.alert('参数错误', '温馨提示');
    }
    // goodId = 156;
    // 获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        } else {
            return null;
        }
    }

    function add0(m){return m<10?'0'+m:m }
    function format(shijianchuo) {
//shijianchuo是整数，否则要parseInt转换
        var time = new Date(shijianchuo* 1000);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
    }

    $.ajax({
        type: "post",
        url: URL.SiteUrl + "/index.php?m=Api&c=Goods&a=getGoodsComment",
        data: {p: pageP, goods_id: goodId},
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var html = template("customer_item", data);
            if(!html){
                $(".null_text").css({"display":"block"});
            }
            $("#customer_content").append(html);

           /* format()
            $(data.result).each(function (i,v) {
                $(".addtime").each(function () {
                    $(this).text(format(v.add_time));
                })
            })*/
            eventListener(".describe-tb");
            $(".graded").each(function (index, element) {
                $.each(data.result[index].img, function (index, img_url) {
                    str += '<li><img src="' + img_url + '"/></li>'
                });
                $(".comment_imglist").eq(index).append(str);
                str = "";
                $(this).find(".describe-tb").each(function (i, obj) {
                    $(this).trigger("myEvent", $(this).attr("data-name"));
                    $(this).find("input").val($(this).attr("data-name"));
                    $(this).find("span").html($(this).attr("data-name") + "星");
                });
            });

            $(".comment_imglist li").on("click",function () {
                var id = $(this).parent().data("id");
                var indexs = $(this).parent().data("index");
                // console.log(indexs);
                // console.log(132);
                location.href="show_imagepl.html?good_id="+id+"&index="+indexs+"";
            })

        },
        error: function (data) {
            mui.toast(data.msg, {duration: 'long', type: 'div'})
        }
    });

    function eventListener(obj) {
        $(obj).bind("myEvent", function (ev, count) {
            // $(this).find("li").removeClass("checkall-ys");
            $(this).find("img").addClass("filter");
            for (var i = 0; i < count; i++) {
                // $(this).find("li").eq(i).addClass("checkall-ys");
                $(this).find("img").eq(i).removeClass("filter");
            }
        });
    }



    refresh({
        content: "#customer_content",
        down: ".pre_lodding",
        up: ".up_lodding",
        null:".null"
    }, {
        upCallback: function (e) {
            var that = this;
            setTimeout(function () {
                that.back.call();
                that.hideUp();
            }, 2000);
        },
        downCallback: function (e) {
            var that = this;
            setTimeout(function () {
                that.back.call();
                pageP++;
                $.ajax({
                    type: "post",
                    url: URL.SiteUrl + "/index.php?m=Api&c=Goods&a=getGoodsComment",
                    data: {p: pageP, goods_id: goodId},
                    dataType: 'json',
                    success: function (data) {
                       that.hideDown();
                        if (data.result.length <= 0) {
                            that.showNull();
                        } else {
                            var prevCount = $("div.graded").length;
                            var html = template('customer_item', data);
                            //console.log(data);
                            $("#customer_content").append(html);
                            eventListener(".describe-tb");

                            for (var i = prevCount; i < $("div.graded").length; i++) {
                                var imgs = data.result[i - prevCount].img;
                                for (var j = 0; j < imgs.length; j++) {
                                    str += '<li><img class="aaaa" src="' + imgs[i] + '"/></li>'
                                }
                                $(".comment_imglist").eq(i).append(str);
                                str = "";
                                $("div.graded").eq(i).find(".describe-tb").each(function (i, obj) {
                                    $(this).trigger("myEvent", $(this).attr("data-name"));
                                    $(this).find("input").val($(this).attr("data-name"));
                                    $(this).find("span").html($(this).attr("data-name") + "星");
                                });
                            }

                        }
                    },
                    error: function (data) {
                        mui.toast(data.msg, {duration: 'long', type: 'div'})
                    }
                })
            }, 2000);
        }
    });
})();