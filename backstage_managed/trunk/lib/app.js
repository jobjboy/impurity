/**
 * Created by Liangyong on 2017/4/17 0017.
 */
// 当前资源URL目录
var baseUrl = (function () {
    var scripts = document.scripts, src = scripts[scripts.length - 1].src;
    //console.log(scripts.length);
    return src.substring(0, src.lastIndexOf("/") + 1);
})();
//console.log(baseUrl);
baseUrl = baseUrl.replace('/js', '');
/**
 * 时间格式化：
 * 使用方法： "http://{0}/{1}".format("a.com", "index.html")
 * @returns {String}
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

/**
 * 下拉默认选中
 */
var sel = function(select_id,value_id){
    $.each($(select_id).find('option'),function(index,obj){
        if ($(obj).val() * 1 == $(value_id).val() * 1) {
            $(this).attr('selected', true);
        }
    })
}

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
        'jquery': ['//cdn.bootcss.com/jquery/1.12.4/jquery.min', './plugs/jquery/jquery.min'],
        'jquery.cookies': ['//cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie', './plugs/jquery/jquery.cookie'],

        'echarts': ['./plugs/echarts/echarts'],

        'range': ['./plugs/jquery/jquery.range'],

        //==========================control .js===============================

        'app.plugs': ['./plugs'],

        'URL': ['./URL'],

        'listen': ['./listen'],

        'paging': ['./paging'],

        'base64': ['./plugs/jquery/jquery.base64'],

        'layui': ['./plugs/layui/layui'],

        'laypage': ['./plugs/layui/lay/modules/laypage'],

        'layer': ['./plugs/layui/lay/modules/layer'],

        'laydate': ['./plugs/layui/lay/modules/laydate'],

        'banner': ['../js/banner'],

        'md5': ['./plugs/md5/md5'],

        'x.admin': ['../js/x-admin'],


    },
    shim: {
        'base64': {deps: ['jquery']},
        'layui': {deps: ['jquery']},
        'app.plugs': {deps: ['jquery', 'layui']},
        'paging': {deps: ['jquery', 'layui']},
        'range': {deps: ['jquery']},
        'banner': {deps: ['jquery']},
        'x.admin': {deps: ['jquery', 'layui']},
    },
    deps: ['css!//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css'],

    // 开启debug模式，不缓存资源
    urlArgs: "t=" + (new Date()).getTime()
});

//window.LAYDATE_PATH = baseUrl + './plugs/layui/laydate/';


// UI框架初始化
require(['jquery', 'layui', 'URL', 'app.plugs'], function () {

    layui.config({dir: baseUrl + './plugs/layui/'}).extend({
        paging: './lib/plugs/layui/paging',

    });

    layui.use(['layer', 'form', 'laytpl', 'layedit', 'laydate','element'], function () {
        window.layer = layui.layer;
        window.form = layui.form;
        window.laytpl = layui.laytpl;
         window.laydate = layui.laydate;




        plugs = requirejs('app.plugs');


        //window.localStorage.setItem('token','7a1221f5-3b28-4f3d-9deb-086f36804667');
         /*plugs.checkToken('sh004', '49BA59ABBE56E057', function () {

         });


         /*if (plugs.getToken()) {


         }*/
    });
});


