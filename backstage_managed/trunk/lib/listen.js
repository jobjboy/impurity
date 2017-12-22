/**
 * Created by Administrator on 2017/9/19 0019.
 */

define(['jquery', 'URL', 'layui', 'app.plugs'], function ($, URL) {
    /*! 定义当前body对象 */
    this.$body = $('body');


    var act = getUrlParam('act');

    /**
     * 获取编辑页=>item项数据
     */

    switch (act) {
        case  'edit':
            edit();
            break;

        case  'add':
            add();
            break;

    }


    /**
     * 添加
     */
    function add() {

        plugs = requirejs('app.plugs');

        var tpl_item = document.getElementById('tpl_item').innerHTML;

        layui.use(['laytpl', 'laypage', 'form', 'paging'], function () {

            var tpl_item = document.getElementById('tpl_item').innerHTML;

                laytpl= layui.laytpl;

                var index = layer.load(0, {shade: [0.1, '#313131']});

                laytpl(tpl_item).render({}, function (render) {

                    document.getElementById('form_item_model').innerHTML = render;
                   // layui.form().render();
                    edit_verification_form();
                    layer.close(index);

                });
        });
    }


    /**
     * 编辑
     */
    function edit() {

        plugs = requirejs('app.plugs');
        var u = getUrlParam('u');
        plugs.ajax(URL.API_URL + u, {}, function (data) {

            if (data.code == 1) {

                var tpl_item = document.getElementById('tpl_item').innerHTML;

                var index = layer.load(0, {shade: [0.1, '#313131']});

                layui.use(['laytpl', 'form'], function () {

                    laytpl= layui.laytpl;

                    laytpl(tpl_item).render(data.data, function (render) {
                        document.getElementById('form_item_model').innerHTML = render;
                        //layui.form().render();
                        edit_verification_form();
                        layer.close(index);

                    });
                });

            } else {

            }
        }, function () {

        }, 'GET');
    }


    /**
     * 修改 状态
     */
    this.$body.on('click', '[data-status]', function () {

    });

    /**
     * 删除数据
     */
    this.$body.on('click', '[data-delete]', function () {

        var _this = $(this);
        var id = _this.data('delete');

        url = _this.data('url') + '?id=' + id;

        plugs.ajax(url, {}, function (data) {

            if (data.code == 1) {
                layer.msg('删除成功');
                p = _this.parent().parent();
                p.remove();

                if (!$("#page_body").find('tr').length) {
                    window.location.reload();
                }

            } else {

            }
        }, function () {

        }, 'DELETE');
    });


});