/**
 */
(function () {
    function refresh(uis, callbackManager) {
        var dynamicParams = {
            start: 0,
            end: 0,
            isTouchPad: (/hp-tablet/gi).test(navigator.appVersion),
            hasTouch: 'ontouchstart' in window && !this.isTouchPad,
            obj: $(uis.content),
            windowDes: function () {
                return {
                    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
                }
            }
            ,
            scrollDes: function () {
                return {
                    top: window.pageY || document.documentElement.scrollTop || document.body.scrollTop || 0,
                    left: window.pageX || document.documentElement.scrollLeft || document.body.scrollLeft || 0
                }
            }
        };
        var contentOffsetTop = dynamicParams.obj.offset().top;

        var plugInConfig = {
            currentElement: dynamicParams.obj,
            isLockDown: false,//锁住上拉刷新
            isLockUp: false,//锁住下拉刷新
            isLock: false,
            isCanDo: false,
            translate: function (diff) {
                dynamicParams.obj.css({
                    "-webkit-transform": "translate(0," + diff + "px)",
                    "transform": "translate(0," + diff + "px)"
                });
            },
            setTranslition: function (time) {
                dynamicParams.obj.css({
                    "-webkit-transition": "all " + time + "s",
                    "transition": "all " + time + "s"
                });
            },
            back: function () {
                plugInConfig.translate(0);
                plugInConfig.isLock = false;
            },
            addEventListener: function (element, elementType, elementFun) {
                element.on(elementType, elementFun);
            },
            showUp: function () {
                if (uis.up) {
                    $(uis.up).css({'display': 'block'});
                }
            },
            hideUp: function () {
                if (uis.up) {
                    $(uis.up).css({'display': 'none'});
                }
            },
            showDown: function () {
                if (uis.down) {
                    $(uis.down).css({'display': 'block'});
                }
            },
            hideDown: function () {
                if (uis.down) {
                    $(uis.down).css({'display': 'none'});
                }
            },
            showNull: function () {
                if (uis.null) {
                    $(uis.null).css({'display': 'block'});
                    this.isLockDown = true;
                }
            },
            hideNull: function () {
                if (uis.null) {
                    $(uis.null).css({'display': 'none'});
                    this.isLockDown = false;
                }
            }
        }


        function touchStart(e) {
            if (!plugInConfig.isLock) {
                var even = typeof event == "undefined" ? e : event;

                plugInConfig.isLock = true;
                plugInConfig.isCanDo = true;

                dynamicParams.start = dynamicParams.hasTouch ? even.touches[0].pageY : even.pageY;
                plugInConfig.setTranslition(0);
            }
        }

        function touchMove(e) {

            var $contentHeight = dynamicParams.obj.height();
            var realHeight = dynamicParams.windowDes().height + dynamicParams.scrollDes().top - contentOffsetTop;

            var even = typeof event == "undefined" ? e : event;
            dynamicParams.end = dynamicParams.hasTouch ? even.touches[0].pageY : even.pageY;
            // //上拉
            if (uis.down && !plugInConfig.isLockDown) {

                if (realHeight >= $contentHeight && plugInConfig.isCanDo) {
                    console.log('..34346666');
                    if (dynamicParams.start > dynamicParams.end && dynamicParams.start - dynamicParams.end < 30) {
                        even.preventDefault();
                        plugInConfig.setTranslition(0);
                        plugInConfig.translate(dynamicParams.end - dynamicParams.start);
                        plugInConfig.showDown();
                    }
                }
            }

            if (uis.up && !plugInConfig.isLockUp) {

                var bol = (uis.dif ? uis.dif() : true);
                if (dynamicParams.scrollDes().top == 0 && plugInConfig.isCanDo && bol) {
                    console.log('..3434');
                    if (dynamicParams.start < dynamicParams.end && dynamicParams.end - dynamicParams.start < 85) {
                        even.preventDefault();
                        plugInConfig.setTranslition(0);
                        plugInConfig.translate(dynamicParams.end - dynamicParams.start);
                        plugInConfig.showUp();
                    }
                }
            }
            //下拉
        }

        function touchEnd(e) {
            if (plugInConfig.isCanDo) {
                plugInConfig.isCanDo = false;

                if (uis.down) {
                    if ($(uis.down).css('display') == 'block') {
                        plugInConfig.setTranslition(0.5);
                        plugInConfig.translate(0);
                        if (typeof callbackManager.downCallback == 'function') {
                            callbackManager.downCallback.call(plugInConfig, e);
                        }
                    } else {
                        plugInConfig.back();
                    }
                } else {
                    plugInConfig.isLock = false;
                }


                if (uis.up) {
                    if ($(uis.up).length > 1) {
                        $(uis.up).eq(1).remove();
                    }
                    var bol = (uis.dif ? uis.dif() : true);
                    plugInConfig.translate(0);
                    if (dynamicParams.end - dynamicParams.start > 80 && bol) {


                        if (dynamicParams.end - dynamicParams.start >= 0 && ($(uis.up).css('display') == 'block')) {
                            if (typeof callbackManager.upCallback == "function") {
                                callbackManager.upCallback.call(plugInConfig, e);
                            }
                        }
                        if (($(uis.up).css('display') == 'block')) {
                            plugInConfig.isLock = true;
                        }
                    }

                }
            }

        }

        plugInConfig.addEventListener(dynamicParams.obj, "touchstart", touchStart);
        plugInConfig.addEventListener(dynamicParams.obj, "touchmove", touchMove);
        plugInConfig.addEventListener(dynamicParams.obj, "touchend", touchEnd);

        return plugInConfig;
    }

    window.refresh = refresh;
})();