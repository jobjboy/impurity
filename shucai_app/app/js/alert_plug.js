/**
 * Created by Administrator on 2017/4/27 0027.
 */
/**
 *
 * @param themeColor
 * @param textConfig{
      *                          title:"标题",
      *                          content:"内容",
      *                          contentImage:""url,
      *                          enterButton:"确定"，
      *                          cancelButton:"取消"
     * },
 * @param eventCallback{
     *                     enterCb:function(){0
     *                     },
     *                     cancelCb:function(){
     *                     }
     * }
 */

function showmask(theme, textConfig, eventCallback) {
    var background = $('<div class="background"></div>');
    var box = $('<div class="box"></div>');
    var box_center = $('<div class="box_center"></div>');
    var box_footer = $('<div class="box_footer"></div>');
    var fn = {
        windowDes: function () {
            return {
                width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            }
        }
    }
    background.css({
        "display": "none",
        "position": "fixed",
        "background": "rgba(0, 0, 0, 0.4)",
        "height": "100%",
        "width": "100%",
        "top": "0",
        "z-index": "1000"
    });
    box.css({
        "width": "80%",
        "background": "#fff",
        "border-radius": "13px",
        "position": "absolute",
        "top": "50%",
        "left": "50%",
        "transform": "translate(-50%,-50%)",
        "text-align": "center"
    });
    box_center.css({
        "padding": "10px 30px",
        "padding-bottom": "5px",
    });
    box_footer.css({
        "padding": "10px 0",
        "border-top": "1px solid #e3e3e3"
    });
    if (textConfig.title) {
        var box_header = $('<div class="box_header">' + textConfig.title + '</div>');
        box_header.css({
            "border-bottom": "1px solid #e3e3e3",
            "padding": "10px 0"
        });
        if (theme.headerTheme) {
            box_header.css(theme.headerTheme);
        }
        box.append(box_header);
    }
    if (textConfig.content) {
        var contentP = $('<p>' + textConfig.content + '</p>');
        box_center.append(contentP);
        if (textConfig.contentImage && box_center) {
            var img = $("<p><img src='" + textConfig.contentImage + "'/></p>");
            img.css({
                "margin-top": "20px"
            });
            img.children().css("width", "40%");
            box_center.append(img);
        }
        box.append(box_center);

        if (textConfig.shop_price && box_center) {
            var price = $("<p>总价值为¥&nbsp;" + textConfig.shop_price + "</p>");
            box.append(price);
        }
    }
    if (textConfig.enterButton == undefined) {
        textConfig.enterButton = "确认";
    }
    if (textConfig.enterButton) {
        var enter = $("<span>" + textConfig.enterButton + "</span>");
        var buttonUI = {
            "background": "#F3981E",
            "padding": "5px 20px",
            "border-radius": "30px",
            "color": "#ffffff",
            "font-weight": "600",
            "font-size": "14px",
            "font-family" : 'Microsoft YaHei'
        };
        enter.css(buttonUI);
        enter.on("click", eventCallback.enterCb);
        box_footer.append(enter);
        if (textConfig.cancelButton) {
            var cancel = $("<span>" + textConfig.cancelButton + "</span>");
            cancel.css(buttonUI);
            cancel.css("margin-left", "6px");
            cancel.on("click", eventCallback.cancelCb);
            box_footer.append(cancel);
        }
        box.append(box_footer);
    }


    background.append(box);
    background.insertBefore("body>script:first");
    return {
        show: function () {
            background.css("display", "block");
            box.animate({
                width: "90%",
                height: box.height(box.height() + 200)
            }, 100).animate({
                width: "80%",
                height: box.height(box.height() + 5)
            }, 100);
        }
    };
}