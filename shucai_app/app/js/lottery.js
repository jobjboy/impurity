/**
 * Created by loy on 2017/4/2 0002.
 */

var turnplate = {
    restaraunts: [],				//大转盘奖品名称
    colors: [],					//大转盘奖品区块对应背景颜色
    outsideRadius: 192,			//大转盘外圆的半径
    textRadius: 160,				//大转盘奖品位置距离圆心的距离
    insideRadius: 68,			//大转盘内圆的半径
    startAngle: 0,				//开始角度
    bRotate: false,				//false:停止;ture:旋转
    img_obj: []
};

$(document).ready(function () {

    var token = localStorage.getItem("token");
    var user_id = localStorage.getItem("user_id");
    if (!token || !user_id) {
        location.href = "login.html";
    }
    var audioEle = $("#app_music")[0];

    var lottery_list = null;
    var count = 0;

    var lottery_config = {
        participation: {
            text: '亲,感谢您的参与~',
            thumb: './images/lottery/xxcy.png',
            img: './images/lottery/xiexiecanyu.png'
        },
        encourage: {
            text: '亲,再接再厉哦~',
            thumb: './images/lottery/zjzl.png',
            img: './images/lottery/zaijiezaili.png'
        },
        dialColor: {
            odd: '#FAECD2',
            even: '#FFFFFF'
        }
    };

    function setimg(img) {

        $.each(img, function (index, item) {

            var ele = $("#" + index);
            if (ele.length > 0) {
                type = ele.attr('data-type') || 'img';
                if (type == 'img') {
                    ele.attr('src', URL.SiteUrl + item);

                } else {
                    switch (index) {
                        case  'app_turnplate' :

                            ele.css({
                                "background-image": "url(" + (URL.SiteUrl + item) + ")",
                                "background-size": "100% 100%"
                            });
                            break;

                        case  'app_music':
                            ele.attr('src', URL.SiteUrl + item);
                            break;

                        case   'app_winners_bg':

                            ele.css({
                                "background": "url(" + (URL.SiteUrl + item) + ")  top center no-repeat",
                                "background-size": "90%"
                            });
                            break;
                    }
                }
            }
        });
    }

    //页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
    window.onload = function () {

        //获取奖品列表
        $.post(URL.ApiUrl + URL.lotteryList, function (data) {
            console.log(data);
            setimg(data.result.img);
            $("#lodding").hide();
            $("#lottery_model").show();

            var html = template("pop_tpl", data.result)
            $("#popTpl").html(html);
            console.log(data);
            if (data && data.status == 1) {

                //中奖规则
                if (data.result.rule && (data.result.rule).indexOf('\r\n')) {
                    data.result.rule = JSON.parse(JSON.stringify((data.result.rule).split('\r\n')));
                    $("#rule_ul").append(template('rule_tpl', data.result));
                }
                //中奖列表
                if (data.result.poolList) {

                    //增加谢谢参与 和下次再来
                    data.result.poolList.push(
                        {
                            "id": "19",
                            "goods_id": "161",
                            "goods_num": "20",
                            "goods_name": lottery_config.participation.text,
                            "spec_key": "",
                            "spec_key_name": "",
                            "expir_unit": "100",
                            "cat_id": "862",
                            "original_img": lottery_config.participation.thumb
                        }
                    );

                    data.result.poolList.push(
                        {
                            "id": "20",
                            "goods_id": "-1",
                            "goods_num": "10",
                            "goods_name": lottery_config.encourage.text,
                            "spec_key": "",
                            "spec_key_name": "",
                            "expir_unit": "100",
                            "cat_id": "0",
                            "original_img": lottery_config.encourage.thumb,
                        }
                    );

                    $.each(data.result.poolList, function (index, item) {

                        //颜色
                        if (turnplate.colors.length == 0) {
                            turnplate.colors.push("#FAECD2");
                        } else {
                            if (turnplate.colors[turnplate.colors.length - 1] == '#FAECD2') {
                                turnplate.colors.push(data.result.img.app_odd_color);
                            } else {
                                turnplate.colors.push(data.result.img.app_even_color);  //FAECD2
                            }
                        }

                        turnplate.restaraunts.push(item);

                        var img = new Image();
                        img.src = item.original_img;
                        img.onload = function () {

                            turnplate.img_obj.push(img);

                            count = data.result.count;

                            if (turnplate.img_obj.length == data.result.count + 2) {

                                lottery_list = JSON.stringify(data.result.poolList);  //记录奖池奖品

                                setTimeout(function () {
                                    drawRouletteWheel();
                                    lottery();
                                }, 300);
                            }
                        }
                    });
                }
            }

        }, 'json');
    };
    drawRouletteWheel();

    //旋转转盘 item:奖品位置; txt：提示语;
    var rotateFn = function (item, data) {


        var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));
        if (angles < 270) {
            angles = 270 - angles;
        } else {
            angles = 360 - angles + 270;
        }
        $('#wheelcanvas').stopRotate();
        $('#wheelcanvas').rotate({
            angle: 0,
            animateTo: angles + 1800,
            duration: 2000,
            callback: function () {


                var btnArray = ['否', '是'];
                if (data.result) {
                    title = '恭喜您!';
                    con = data.msg;
                    lottery_img = data.result.original_img;

                } else {
                    if (data.item == 3) {
                        title = '很抱歉!';
                        con = lottery_config.encourage.text;
                        lottery_img = lottery_config.encourage.img;
                    } else {
                        title = '很抱歉!';
                        con = lottery_config.participation.text;
                        lottery_img = lottery_config.participation.img;
                    }

                }
                showmask({
                    "headerTheme": {
                        "font-weight": "600",
                        "font-size": "18px",
                        "color": "red"
                    },
                    "contentTheme": {},
                    "footerTheme": {}
                }, {
                    "title": title,
                    "content": con,
                    "contentImage": lottery_img,
                    "shop_price": data.result.shop_price,
                    "enterButton": "确定",
                    "cancelButton": ""
                }, {
                    "enterCb": function () {
                        $(".background").remove();
                        if (data.result) {
                            window.location.href = "prizeCenter.html";
                        }
                    }
                }).show();
                turnplate.bRotate = !turnplate.bRotate;
                $('.box').height();
            }
        });
    };

    String.prototype.format = function () {
        if (arguments.length == 0) return this;
        for (var s = this, i = 0; i < arguments.length; i++)
            s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
        return s;
    };

    var lottery = function () {

        $('.pointer').click(function () {

            if (turnplate.bRotate)return;
            turnplate.bRotate = !turnplate.bRotate;

            var url = (URL.ApiUrl + URL.lotteryProbability).format(localStorage.getItem('token'));

            $.post(url, {
                'token': localStorage.getItem('token'),
                'lottery_list': lottery_list

            }, function (data) {
                console.log(data);

                //重新登录
                if (data.status == -99) {
                    mui.alert(data.msg, '温馨提示', function () {
                        window.location.href = 'login.html';
                        return;
                    });
                }
                if (data.status == -8 || data.status == -2) {
                    mui.alert(data.msg, '温馨提示', function () {
                    });
                    return;
                }
                var item = data.item;
                audioEle.play();
                rotateFn(item, data);
            }, 'json');
        });

    }
});

function rnd(n, m) {
    var random = Math.floor(Math.random() * (m - n + 1) + n);
    return random;

}
var get_canvas = function (img) {

    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    return canvas;
}


function drawRouletteWheel() {

    var canvas = document.getElementById("wheelcanvas");
    if (canvas.getContext) {

        //根据奖品个数计算圆周角度
        var arc = Math.PI / (turnplate.restaraunts.length / 2);
        var ctx = canvas.getContext("2d");
        //在给定矩形内清空一个矩形
        ctx.clearRect(0, 0, 480, 480);
        //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
        ctx.strokeStyle = "#FFBE04";
        //font 属性设置或返回画布上文本内容的当前字体属性
        ctx.font = '14px Microsoft YaHei';

        for (var i = 0; i < turnplate.restaraunts.length; i++) {

            var angle = turnplate.startAngle + i * arc;
            ctx.fillStyle = turnplate.colors[i];
            ctx.beginPath();
            //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
            ctx.arc(241, 241, turnplate.outsideRadius, angle, angle + arc, false);
            ctx.arc(241, 241, turnplate.insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();
            //锁画布(为了保存之前的画布状态)
            ctx.save();

            //----绘制奖品开始----
            ctx.fillStyle = "#7B6348";

            var goods = turnplate.restaraunts[i];
            var text = (goods.goods_name);

            if (text) {
                text = (text).substring(0, 8);
                ctx.translate(241 + Math.cos(angle + arc / 2) * turnplate.textRadius, 241 + Math.sin(angle + arc / 2) * turnplate.textRadius);

                ctx.rotate(angle + arc / 2 + Math.PI / 2);

                ctx.fillText(text, -ctx.measureText(text).width / 2, 0);

                //  img = turnplate.img_obj[i];

                img = goods.original_img;

                var img2 = new Image();
                img2.src = img;

                img2 = get_canvas(img2);

                ctx.drawImage(img2, -20, 15);
                ctx.restore();
            }
            ctx.restore();

        }


    }
}

