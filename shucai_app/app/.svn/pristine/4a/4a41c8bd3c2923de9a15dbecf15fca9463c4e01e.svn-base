/**
 * Created by lenovo on 2017/3/30.
 */
(function () {
    var addressIdUrl = location.href
    var addressId = addressIdUrl.split("?")[1]
    addressId = addressId.split("#")[0];

//传递的参数
    var token, user_id, consignee, province, city, district, address, mobile
    token = localStorage.getItem("token");
    user_id = localStorage.getItem("user_id");


    var urls = {
        url1: URL.SiteUrl + "/index.php?m=Api&c=User&a=addAddress",
        url2: URL.SiteUrl + "/index.php?m=Api&c=User&a=getAddressOne",
        url3: URL.SiteUrl + "/index.php?m=Api&c=User&a=setDefaultAddress",
        url4: URL.SiteUrl + "/index.php?m=Api&c=User&a=del_address"
    }
//  ajax 函数
    $(function () {

        function getUrlParam(name) {
            var r = window.location.search
            r = r.split("=")[1]
            return r;
        }

        var tag = getUrlParam("tag");
        var tgs = location.hash;
        var tg = String(tgs.split("=")[3]);


        function resdata(url, mdata, successCall) {
            $.ajax({
                type: "post",
                url: url,
                data: mdata,
                dataType: "json",
                error: function (data) {
                    mui.toast('网络请求失败!');
                },
                success: successCall,
            })
        }

        var info = {
            token: token,
            user_id: user_id,
            address_id: addressId
        }

        var edit_data = null;


        /**
         * 初始化
         */
        var init = function (data) {
            if (data) {

                edit_data = data;

                $("#consignee").val(data.consignee);

                //之前有设置过地区，就不用再选择地区了，直接定位到 街道下面的详细区域
                city_name = data.province_name + data.city_name + data.district_name;

                //赋值省市区
                $("#address_edit").attr("data-p", data.province);
                $("#address_edit").attr("data-c", data.city);
                $("#address_edit").attr("data-d", data.district);
                document.getElementById('cityResult3').innerText = city_name;


                //地图定位到当前街道
                //console.log(city_name + data.streetName + data.streetNumName);

                searchByStationName(city_name + data.streetName + data.streetNumName, 16);


                //加载区下面的街道
                flag = true;
                loadStreet(data.district, function () {

                    var d = JSON.parse(data.full_address);

                    $("#street_" + d.street).addClass('current');
                    strret_model.html(data.streetName + '&nbsp;' + data.streetNumName);



                    //详细地址
                    $("#need_").hide();
                    $("#address_detail").val(data.address).attr('readonly', false);
                    $("#mobile").val(data.mobile);

                    street = {
                        id: d.street,
                        name: data.streetName
                    };

                    streetNum = {
                        id: d.streetNum,
                        name: data.streetNumName
                    };
                });
            }
        }


        // 页面加载数据
        resdata(urls.url2, info, function (data) {

            if (data.status == -1) {
                alert(data.msg);
            } else if (data.status == -102 || data.status == -101) {
                alert(data.msg);
                location.href = "login.html"
            }

            init(data.result);
        });


            $(".address-button").on("click", function () {

                consignee = $("#consignee").val(); //收件人
                if (!$.trim(consignee)) {
                    mui.toast('请填写收货人信息!', {duration: 'long', type: 'div'});
                    return;
                }

                address = $("#address_detail").val(); //详细地址
                if (!$.trim(address)) {
                    mui.toast('请填写收货人详细地址!', {duration: 'long', type: 'div'});
                    return;
                }

                mobile = $("#mobile").val();
                if (!$.trim(mobile)) {
                    mui.toast('请填写收货人手机号码!', {duration: 'long', type: 'div'});
                    return;
                }

                province = $("#address_edit").attr("data-p");
                city = $("#address_edit").attr("data-c");
                district = $("#address_edit").attr("data-d");

                var data1 = {
                    token: token,
                    uesr_id: user_id,
                    consignee: consignee,
                    province: province,
                    city: city,
                    district: district,
                    street: street.id,//街道ID
                    streetNum: streetNum.id, //区域ID
                    address: address,
                    mobile: mobile,
                    address_id: edit_data.address_id
                }

                /* console.log(data1);
                 console.log(urls.url1);
                 return;*/

                resdata(urls.url1, data1, function (data) {

                    if (data.status == -2) {

                        mui.toast(data.msg, {duration: 'long', type: 'div'});

                    } else if (data.status == -102) {

                        mui.alert(data.msg, '温馨提示', function () {
                            location.href = "login.html";
                        });

                    } else if (data.status == 1) {

                        /* mui.alert(data.msg, '温馨提示', function () {

                         /!*if (tag == "car") {
                         location.href = "order.html";
                         }
                         else if (tag == 2) {
                         location.href = "address_list.html?tag=2";
                         } else if (tg == 3) {
                         location.href = "address_list.html?" + tgs + "";
                         } else if (tg == 5) {
                         location.href = "address_list.html?tag=5";
                         }
                         else if (tgs.indexOf("rentoutOrder") !== -1) {
                         window.location.href = "address_list.html" + tgs + "";
                         }
                         else {
                         location.href = "address_list.html";
                         }*!/
                         // mui.toast(data.msg, {duration: 'long', type: 'div'});

                         });*/
                        mui.toast(data.msg, {duration: 'long', type: 'div'});
                        lhhflag=false;
                    } else {
                        mui.toast(data.msg, {duration: 'long', type: 'div'});
                    }
                })
            })

        //点击设置默认地址
        $(".address-my").on("click", function () {

            //   保存传递的参数
            var info1 = {
                token: token,
                user_id: user_id,
                address_id: addressId
            }
            resdata(urls.url3, info1, function (data) {

                if (data.status == -102 || data.status == -101) {

                    mui.alert(data.msg, '温馨提示', function () {
                        location.href = "login.html"
                    });
                } else if (data.status == 1) {
                    mui.toast("设为默认地址成功");

                } else {
                    mui.alert(data.msg, '温馨提示', function () {
                    });
                }
            })

        })

        //点击删除地址
        $(".address-sc").on("click", function () {
            //   保存传递的参数
            var info2 = {
                token: token,
                user_id: user_id,
                id: addressId
            }
            resdata(urls.url4, info2, function (data) {

                if (data.status == 1) {
                    if (tag == "car") {
                        location.href = "address_list.html?tag=car";
                    } else if (tg == "3") {
                        location.href = "address_list.html?" + tgs + "";
                    } else if (tg == 5) {
                        location.href = "address_list.html?tag=5";
                    }
                    else if (tag == "2") {
                        location.href = "address_list.html?tag=2";
                    } else if (tgs.indexOf("rentoutOrder") !== -1) {

                        location.href = "address_list.html" + tgs + "";
                    }
                    else {
                        mui.alert("删除成功", '温馨提示', function () {
                        });
                    }

                } else if (data.status == -102 || data.status == -101) {

                    mui.alert(data.msg, '温馨提示', function () {
                        location.href = "login.html"
                    });
                }
            })

        })

    })
})()
