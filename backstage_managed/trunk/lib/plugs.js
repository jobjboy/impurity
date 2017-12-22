/**
 * 前台通用的公共 插件
 */
define(['jquery', 'layui', 'base64'], function ($, lay, base64) {

    var laytpl = laypage = form = null;

    var URL = requirejs('URL');

    console.log('Basic ' + base64.btoa(localStorage.getItem('account') + ":" + localStorage.getItem('token')));


    return {

        /**
         * 列表分页
         * @param url
         */
        page: function (url, pageSize, callback, type, parentModel, jsTplModel, is_verify) {  //,model,type,params,js_tpl,

            layui.use(['laytpl', 'laypage', 'form', 'paging'], function () {

                laytpl = layui.laytpl;
                laypage = layui.laypage;
                form = layui.form;

                var $ = layui.jquery, paging = layui.paging();

                pageSize = pageSize || 20;


                var account = localStorage.getItem('account');
                if (account) {
                    var token = 'Basic ' + base64.btoa(localStorage.getItem('account') + ":" + localStorage.getItem('token'));
                }
                var t = getUrlParam('t');
                if (t) {
                    var token = t;
                }

                paging.init({
                    openWait: true,
                    url: url,
                    elem: parentModel || "#page_body", //内容容器
                    type: type || 'post',

                    params: { //发送到服务端的参数
                        pSize: pageSize,
                        pIndex: is_verify ? 1 : 0
                    },
                    type: 'GET',
                    tempElem: jsTplModel || '#tpl_page', //js模板ID

                    is_verify: is_verify,

                    pageConfig: { //分页参数配置
                        elem: '#page', //分页容器
                        pageSize: pageSize, //分页大小
                    },

                    Authorization: token,
                    //Authorization: 'Basic YWRtaW5hcGk6NWVhYzFiMjUtOGRmOS00ZDI2LWI3NzItZmY4ZWYwZmMxMzNk',

                    success: function (res) { //渲染成功的回调
                        callback ? callback() : '';
                    },
                    fail: function (msg) { //获取数据失败的回调

                    },
                    complate: function (res) { //完成的回调

                    },
                });
            });
        },

        /**
         * 获取token
         */
        checkToken: function (account, password, callbak) {

            var url = URL.API_URL + URL.GET_TOKEN;
            url = url.format(account, password);
            this.ajax(url, {}, function (data) {


                if (data.code == 1) {
                    localStorage.setItem("account", account);
                    localStorage.setItem("token", data.data);

                    var timestamp = Date.parse(new Date());
                    timestamp = timestamp / 1000;
                    localStorage.setItem("token_time", timestamp);  //记录登录时间


                    callbak();
                } else {

                    layer.msg(data.msg);
                }
            }, function () {
            }, 'get');
        },

        getToken: function () {

            var token = localStorage.getItem('token');
            var time = localStorage.getItem("token_time");

            if (!token || !time) return false;

            //token有效期2小时
            var timestamp = Date.parse(new Date());
            timestamp = timestamp / 1000;
            if (timestamp - time >= 0) {
                return false;
            }
            return token;
        },

        /**
         * 基于ajax的再次封装
         * @param url
         * @param data
         * @param success
         * @param cache
         * @param alone
         * @param async
         * @param type
         * @param dataType
         * @param error
         * @returns {boolean}
         */
        ajax: function (url, data, success, error, type, cache, alone, async, dataType) {
            var type = type || 'post';//请求类型
            var dataType = dataType || 'json';//接收数据类型
            var async = async || true;//异步请求
            var alone = alone || false;//独立提交（一次有效的提交）
            var cache = cache || false;//浏览器历史缓存
            var success = success || function (data) {

                    /*console.log('请求成功');*/

                    setTimeout(function () {
                        layer.msg(data.msg);//通过layer插件来进行提示信息
                    }, 500);
                    if (data.status) {//服务器处理成功
                        setTimeout(function () {
                            if (data.url) {
                                location.replace(data.url);
                            } else {
                                location.reload(true);
                            }
                        }, 1500);
                    } else {//服务器处理失败
                        if (alone) {//改变ajax提交状态
                            ajaxStatus = true;
                        }
                    }
                };
            var error = error || function (data) {

                    setTimeout(function () {
                        if (data.status == 404) {

                            layer.msg('请求失败，请求未找到');

                        } else if (data.status == 503) {


                            layer.msg('请求失败，服务器内部错误');

                        } else {


                            layer.msg('网络连接超时');
                        }
                        ajaxStatus = true;
                    }, 500);
                };

            var ajaxStatus = true;

            /*判断是否可以发送请求*/
            if (!ajaxStatus) {
                return false;
            }
            var ajaxStatus = false;//禁用ajax请求

            if (!alone) {
                setTimeout(function () {
                    ajaxStatus = true;
                }, 1000);
            }

            var account = localStorage.getItem('account');
            if (account) {
                var token = 'Basic ' + base64.btoa(localStorage.getItem('account') + ":" + localStorage.getItem('token'));
            }
            var t = getUrlParam('t');
            if (t) {
                var token = t;
            }

            console.log(data);

            $.ajax({
                'url': url,
                'data': data,
                'type': type,
                'dataType': dataType,

                //共用参数
                contentType: "application/json; charset=utf-8",
                headers: {

                    "Access-Control-Allow-Headers": "Authorization",
                    "Authorization": token
                    // Authorization: 'Basic YWRtaW5hcGk6NWVhYzFiMjUtOGRmOS00ZDI2LWI3NzItZmY4ZWYwZmMxMzNk',
                },
                'async': async,
                'success': success,
                'error': error,
                'jsonpCallback': 'jsonp' + (new Date()).valueOf().toString().substr(-4),
                'beforeSend': function () {

                },
            });

        },

        /**
         * submitAjax(post方式提交)
         * @param form
         * @param success
         * @param cache
         * @param alone
         */
        submitAjax: function (form, success, cache, alone) {
            cache = cache || true;
            var form = $(form);
            var url = form.attr('action');
            var data = form.serialize();
            this.ajax(url, data, success, cache, alone, false, 'post', 'json');
        },

        /**
         * 执行设备控制指令
         * @param url
         * @param args
         * @param cllback
         */
        executeCmd: function (args, success, error) {

            var url = URL.executecontrolcmd.action;

            this.ajax(url, args, function (data) {

                if (data.code == 1) {
                    success();
                } else {
                    layer.msg('执行设备指令失败');
                }
            }, error, 'POST');
        }

    }

})