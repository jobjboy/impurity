/**
 * Created by lenovo on 2017/5/18.
 */

document.addEventListener("plusready", function () {
    plus.runtime.setBadgeNumber(0);
    document.addEventListener("netchange", onNetChange, false);
    function onNetChange() {

        if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
            mui.toast("网络异常，请检查网络设置！", {duration: 'long', type: 'div'});
            // console.log(413);

        } else {
            // console.log(123);
        }
    }
    if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
        mui.toast("网络异常，请检查网络设置！", {duration: 'long', type: 'div'});
        // console.log(789);

    } else {
        // console.log(456);
    }
    /*if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
        mui.toast("网络异常，请检查网络设置！", {duration: 'long', type: 'div'});

    } else {
//		history.go(0);
    }*/
    // 监听点击消息事件
    plus.push.addEventListener("click", function (msg) {
        // 判断是从本地创建还是离线推送的消息
        /* switch( msg.payload ) {
         case "LocalMSG":
         outSet( "点击本地创建消息启动：" );
         break;
         default:
         outSet( "点击离线推送消息启动：");
         break;
         }*/
        // 提示点击的内容
//            plus.ui.alert( msg.payload );
        // 处理其它数据
//            logoutPushMsg( msg );
        var data = JSON.parse(msg.payload);
        var id = data.goods_id;
        plus.push.clear();
        plus.runtime.setBadgeNumber(0);
        location.href = "pro_detail.html?" + id + "";

    }, false);
    // 监听在线消息事件
    plus.push.addEventListener("receive", function (msg) {
        /*if ( msg.aps ) {  // Apple APNS message
         outSet( "接收到在线APNS消息：" );
         } else {
         outSet( "接收到在线透传消息：" );
         //                plus.push.createMessage( msg.content, msg.payload||'', msg );
         }*/
        var data = JSON.parse(msg.payload);
        var id = data.goods_id;
//            alert(msg.payload);
//            alert(data);
//            alert(typeof msg.payload);
        plus.push.clear();
        plus.runtime.setBadgeNumber(0);
        location.href = "pro_detail.html?" + id + "";
    }, false);
}, false);



