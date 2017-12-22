/**
 * Created by Liangyong on 2017/4/17 0017.
 */
// 当前资源URL目录
var baseUrl = (function () {
    var scripts = document.scripts, src = scripts[scripts.length - 1].src;
    return src.substring(0, src.lastIndexOf("/") + 1);
})();
//console.log(baseUrl);
baseUrl = baseUrl.replace('/js', '');


/**
 * 占位符替换：
 * 使用方法： "http://{0}/{1}".format("a.com", "index.html")
 * @returns {String}
 */
String.prototype.format = function () {
    if (arguments.length == 0) return this;
    for (var s = this, i = 0; i < arguments.length; i++)
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    return s;
};

/*
 * 格式化日期
 */
Date.prototype.pattern=function(fmt) {
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    var week = {
        "0" : "/u65e5",
        "1" : "/u4e00",
        "2" : "/u4e8c",
        "3" : "/u4e09",
        "4" : "/u56db",
        "5" : "/u4e94",
        "6" : "/u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}	
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


// RequireJs 配置参数
require.config({
    baseUrl: baseUrl,
    waitSeconds: 0,
    map: {'*': {css: './plugs/require/require.css'}},

    paths: {
        // 开源插件 CDN
        'jquery': ['https://cdn.bootcss.com/jquery/1.12.4/jquery.min', './plugs/jquery/jquery.min'],
        'jquery.cookies': ['https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie', './plugs/jquery/jquery.cookie'],

        'echarts': ['./plugs/echarts/echarts'],

        'range': ['./plugs/jquery/jquery.range'],

        'mui': ['./plugs/mui/mui'],

        //==========================control .js===============================

        'core': ['./core'],

        'URL': ['./URL'],

        'base64': ['./plugs/jquery/jquery.base64'],

        'banner': ['../js/banner'],

        'md5': ['./plugs/md5/md5'],

        'tpl': ['./plugs/arttempale/arttmpl'],
    },
    shim: {
        'base64': {deps: ['jquery']},
        'range': {deps: ['jquery']}
    },
    deps: ['css!https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css'],

    // 开启debug模式，不缓存资源
    urlArgs: "t=" + (new Date()).getTime()
});


//框架初始化
require(['jquery', 'jquery.cookies', 'mui', 'URL', 'core'], function ($, cookie, mui, URL, core) {
	
    url = window.location.pathname;
    arr = url.split('/');
    
	var token = window.localStorage.getItem('aut_token');
//  console.log('val='+core.getToken());
	
	// 扩展API加载完毕后调用onPlusReady回调函数 
	document.addEventListener('plusready', onPlusReady, false);
	// 扩展API加载完毕，现在可以正常调用扩展API
	function onPlusReady(){
		plus.geolocation.getCurrentPosition(function(p){
				//console.log('Geolocation\nLatitude:' + p.coords.latitude + '\nLongitude:' + p.coords.longitude + '\nAltitude:' + p.coords.altitude);
					console.log('当前位置'+p.coords.longitude+'=>'+p.coords.latitude);
					var lngX = p.coords.longitude;
					var latY = p.coords.latitude; 	
					var url = URL.upload_coordinate.format(token,latY,lngX);
					
					core.ajax(url, {}, function (data) {
						if (data.status == 1) {
							console.log('ok');
						} else if(data.status == 400){
							console.log('error')
							window.location.href = './login.html';
						}else{
							mui.toast(data.msg, {duration: 'long', type: 'div'});
						}
						}, function () {
						}, 'GET');	
			setTimeout(onPlusReady,10000);			
		}, function(e){
			console.log('Geolocation error: ' + e.message);
		} ); 
	}
	var g_wakelock = null;
	//允许程序后台运行，以持续获取GPS位置
	function wakeLock() {
	    //Android
	    debugger
	    var main = plus.android.runtimeMainActivity();
	    var Context = plus.android.importClass("android.content.Context");
	    var PowerManager = plus.android.importClass("android.os.PowerManager");
	    var pm = main.getSystemService(Context.POWER_SERVICE);
	    g_wakelock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "ANY_NAME");
	    g_wakelock.acquire();
	}
	
	//结束程序后台运行
	function releaseWakeLock () {
	    if(g_wakelock != null && g_wakelock.isHeld()) {
	        g_wakelock.release();
	        g_wakelock = null;
	    }
	}

    if (!core.getToken() && (arr[arr.length - 1] != 'login.html')) {
        location.href = './login.html';
    }

});
