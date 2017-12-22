(function () {

    var ttt;
    var PAGESIZE = 20;
    var CURRENT_PAGE = 0;

    var api_url = URL.ApiUrl + '' + URL.goodsSearch;

    var last_url = keword = last_keword = null;
    var flag = true;
    var is_filter = false;
    var is_end = false;

    var filter_url = {
        newest: 'desc',
        sales: 'desc',
        price: 'desc'
    }

    var D = function (id, event, fun) {
        getId(id).addEventListener(event, fun);
    }
    var getId = function (id) {
        return document.getElementById(id);
    };

    /**
     * 搜素事件
     */
    D('saarch_inpt', 'keydown', function (e) {
        if (13 == e.keyCode) {
            if (ttt) {
                ttt.isLockDown = false;
            }
            CURRENT_PAGE = 0;
            keword = this.value;
            if (!keword) return;
            if (last_keword == null) {
                last_keword = keword;
            }
            if (last_keword != keword) {
                flag = false;
            }
            $('#goods_list').html('');

            pullupRefresh();

            /*mui.init({
             pullRefresh: {
             container: '#pullrefresh',
             down: {
             callback: pulldownRefresh
             },
             up: {
             contentrefresh: '正在加载...',
             contentover: "释放立即刷新",
             contentrefresh: "正在刷新...",
             callback: pullupRefresh,
             height: 84,
             }
             }
             });
             last_keword = keword;
             mui('#pullrefresh').pullRefresh().pullupLoading();*/
        }
    });

    ttt = refresh({
        content: "#goods_list",
        down: ".pre_lodding",
        up: ".up_lodding",
        null: ".null"
    }, {
        upCallback: function (e) {
            var that = this;
            setTimeout(function () {
                that.back.call();
                that.hideUp();
                if (CURRENT_PAGE == 0) {
                    $(".null").text('未找到相关商品!').show();
                }
            }, 2000);
        },
        downCallback: function (sort, type) {

            var that = this;

            setTimeout(function () {
                that.back.call();
                if ((sort && type) || is_end) {
                    page = CURRENT_PAGE;
                } else {
                    page = ++CURRENT_PAGE;
                }
                var url = api_url.format(keword, PAGESIZE, page); //url动态替换

                if (sort && type)
                    url += '&sort=' + sort + '&sort_asc=' + type;

                handler(url, 'up', function (list, html) {
                    last_url = url;
                    that.hideDown();
                    // console.log(html);
                    $('#goods_list').append(html);
                });
            }, 2000);
        }
    });

    /**
     * 最新排序
     */
    D('news_sort', 'tap', function (e) {
        //  flag = false;
        is_filter = true;
        CURRENT_PAGE = 0;
        pullupRefresh('is_new', filter_url.newest == 'asc' ? 'desc' : 'asc');
    });

    /**
     * 价格排序
     */
    D('price_sort', 'tap', function (e) {
        //  flag = false;
        is_filter = true;
        CURRENT_PAGE = 0;
        sort = filter_url.price == 'asc' ? 'desc' : 'asc';
        pullupRefresh('shop_price', sort);
        $("#price_sort").removeClass(filter_url.price).addClass(sort);
    });

    /**
     * 价格排序
     */
    D('sales_sort', 'tap', function (e) {
        //  flag = false;
        is_filter = true;
        CURRENT_PAGE = 0;
        sort = filter_url.sales == 'asc' ? 'desc' : 'asc';
        pullupRefresh('sales_sum', sort);
        $("#sales_sort").removeClass(filter_url.price).addClass(sort);
    });


    /**
     * 下拉刷新具体业务实现
     */
    function pulldownRefresh() {
        setTimeout(function () {
            setTimeout(function () {
                if (CURRENT_PAGE == 0) {
                    $("#null").text('未找到相关商品!').show();
                }
                // mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
            }, 200);

        }, 0.1);
    }

    /**
     * 上拉加载具体业务实现
     * @param sort
     * @param type
     */
    function pullupRefresh(sort, type) {
        setTimeout(function () {

            // mui('#pullrefresh').pullRefresh().endPullupToRefresh((false));

            if ((sort && type) || is_end) {
                page = CURRENT_PAGE;
            } else {
                page = ++CURRENT_PAGE;
            }
            var url = api_url.format(keword, PAGESIZE, page); //url动态替换

            if (sort && type)
                url += '&sort=' + sort + '&sort_asc=' + type;

            handler(url, 'up', function (list, html) {
                last_url = url;
                $('#goods_list').append(html);
            });
        }, 0.1);
    }


    /**
     * 上拉加载处理
     * @param url
     * @param action
     * @param call_back
     */
    var handler = function (url, action, call_back) {

        //关键词改变，分页置为0
        if (!flag) {
            $('#goods_list').html('');
            flag = true;
            CURRENT_PAGE = 0;
            url = api_url.format(keword, PAGESIZE, ++CURRENT_PAGE); //重写URL
        }
        if (is_filter) {
            $('#goods_list').html('');
        }
        $("#null").hide();
        $.ajax({
            type: 'get',
            url: url,
            cache: false,
            dataType: 'json',
            success: function (data) {
                console.log(data);  
                $("#pre_lodding").hide();
                is_end = false;

                if (!data || data.status != 1) {
                    $("#null").text('网络请求失败!').show();
                    return;
                }
                var $goods_list = data.result.goods_list;

                if (!$goods_list || !$goods_list.length) {
                    is_end = true;
                    $(".null").hide();
                    // mui('#pullrefresh').pullRefresh().endPullupToRefresh((true));
                    if (CURRENT_PAGE == 1 || !flag) {
                        $(".null").text('未找到相关商品!').show();
                    } else {
                        $(".null").text('别扯了，已经到底啦...').show();
                        $(".pre_lodding").hide();
                        ttt.showNull();
                    }
                    return;
                }
                filter_url.newest = filter_url.newest == 'asc' ? 'desc' : 'asc';
                filter_url.price = filter_url.price == 'asc' ? 'desc' : 'asc';
                filter_url.sales = filter_url.sales == 'asc' ? 'desc' : 'asc'

                $(".null").hide();
                var html = template('goods_item', data.result);
                call_back(data.result.goods_list, html);


            },
            beforeSend: function () {
                // $(".pre_lodding").show();
            }, error: function (data) {
                $(".pre_lodding").hide();
                mui.toast(data.msg, {duration: 'long', type: 'div'});
            }
        });
    }
})();