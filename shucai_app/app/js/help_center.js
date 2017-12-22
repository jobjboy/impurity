/**
 * Created by Administrator on 2017/4/28 0028.
 */
(function(){
    $.ajax({
        type: "post",
        url: URL.SiteUrl + "/index.php?m=Api&c=User&a=helplist",
        data: {user_id:"",enterprise_id:""},
        dataType: 'json',
        success: function (data) {
            if(data.status == 1){
                var html = template("help_items",data.result);
                console.log(data.result);
                $("#help_list").append(html);
                $("#help_list").delegate("li","click",function(event){
                    window.location.href = $(event.currentTarget).attr("data-href");
                });
            }
        },
        error: function (data) {
            mui.toast(data.msg, {duration: 'long', type: 'div'})
        }
    });
})();