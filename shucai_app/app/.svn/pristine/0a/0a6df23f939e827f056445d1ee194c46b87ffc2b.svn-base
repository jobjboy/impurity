/**
 * Created by Administrator on 2017/5/11 0011.
 */
(function () {
    function communication(user_id,showReceiveMessage) {
        var chat;
        $(function () {
            $.connection.hub.url = "http://chat.xionggouba.com:8066/signalr";
            chat = $.connection.chatHub;
            chat.client.receiveMessage = function (userId, result) {

                $(".layim-chat-main").animate({scrollTop: 10000}, 100);


              //  var scrollTop = $(".layim-chat-main")[0].scrollHeight;
                //$(".layim-chat-main").scrollTop(scrollTop);

                if(result.data_type == -1)
                    kefuAutoReplyMsg=result.data;
                else
                    showReceiveMessage(userId, result);
            };
            chat.client.showMessage = function(result){

                if(result.msg == "您已离线，请重新登录"){
                    setTimeout(function(){
                        window.location.href = "login.html";
                    },1000)
                }
                if(result.msg == "对方不在线，信息已保存至数据库"){
                    result.msg = "亲,当前客服不在线哦";
                }
                show_toast(result.msg);
            }
            $.connection.hub.start().done(function () {
                chat.server.initUserInfo(user_id);
            });
        });
        return {
            sendMessage: function (toUserId, message,type) {
                chat.server.sendMessage(parseInt(toUserId), message,type);
            }
        }
    }
    window.communication = communication;
})();