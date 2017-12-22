(function(){
	
    var token = localStorage.getItem("token");
    
    var goodsList=JSON.parse(window.localStorage.getItem("goodsList"));
        console.log(goodsList);
    if(goodsList){
        var html=template('goods_template',goodsList);
        document.getElementById('goods').innerHTML=html;
    }



    //搜索跳转
    $("#search_bar2").on("focus", function () {
        location.href = "search.html?1";
    });

    $(function(){
    	
    	var user_id = localStorage.getItem("user_id");
        var unique_id = localStorage.getItem("unique_id");
	    //底部选项卡
	    $(".footNav").html(footerNav.str);
	    addFooterNavListener(2);	    
	    
        $.ajax({
            type: 'post',
            url: URL.SiteUrl + '/index.php?m=Api&c=Index&a=get_laster_cartnum',
            dataType: 'json',
            data: {unique_id: unique_id, user_id: user_id},

            success: function (data) {
                if (data.status == 1) {
                    if (data.result !== 0) {
                        if(!token){
                            $(".car_count").hide();
                        }else {
                            $(".car_count").text(data.result);
                            $(".car_count").show();
                        }
                    }
                }
                
            }
        });

        $.ajax({
            type: 'post',//用post方法获取
            //获取数据
            url: 'http://192.168.0.116/api/goods/goodsCategoryList',
            //指定传入的数据格式为json
        dataType: 'json',
            //成功后执行函数,获得一个返回数据对象data
            success: function (data) {
            	console.log(data.result);
                    if(data.status == 1){
                        //模拟渲染
                        var ad={ad:data.result};
                        var html=template('goods_template',ad);
                        document.getElementById('goods').innerHTML=html;
                        window.localStorage.setItem('goodsList',JSON.stringify(ad));
                    }else {
                        mui.toast(data.msg, {duration: 'long', type: 'div'});
                    }
            },error:function (data) {
                console.log(data.msg);
            }
        });

    });
})();
