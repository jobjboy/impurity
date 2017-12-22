/**
 * Created by lenovo on 2017/3/30.
 */
(function () {
    //传递的参数
    var token = localStorage.getItem("token");
    var user_id = localStorage.getItem("user_id");
    var urls = {
        order_info_url: URL.ApiUrl + URL.orderInfo,            //订单详情
    };

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

    // ajax 获取数据
    function resdata(url, successCall) {
        $.ajax({
            type: "get",
            url: url,
            dataType: "json",
            error: function (data) {
                mui.toast(data.msg, {duration: 'long', type: 'div'})
            },
            success: successCall,
        })
    }

    $(function () {
        //获取url中的order_id参数
        var order_id = getUrlParam('order_id');
        // console.log(order_id);
        if (order_id == null || order_id.length == 0) {
            mui.alert('参数错误', '温馨提示', function () {
                location.href = "index.html";
            });
        }

        //获取订单详情
        resdata(urls.order_info_url + '&id=' + order_id + '&user_id=' + user_id + '&token=' + token, function (data) {

            switch (data.status) {
                case -1:
                    mui.alert(data.msg, '温馨提示', function () {
                        location.href = "index.html";
                    });
                    break;
                case 1:
                    $("#info").text("订单号：" + data.result.order_sn);
                    $("#need_pay").text("支付金额：" + data.result.order_amount + "元");
                    break;
                default:
                    break;
            }

        })

    })
})()

//**

