/********************采集端页面js，wifi探针的轮播************************/
$(function () {
    var $elements = $("#wifi-data");
    $.fn.fontChange = function () {
        $elements.find('._small').animate({
            fontSize: 16,
            color: "#666"
        }, function () {
            $(this).removeClass('_small');
        });
        $elements.find('.active').animate({
            fontSize: 20,
            color: "#999"
        }, function () {
            $(this).removeClass('active');
            $(this).addClass('_small');
        });
        $elements.find('.small').animate({
            fontSize: 26,
            color: "#f6ab02"
        }, function () {
            $(this).removeClass('small');
            $(this).addClass('active');
        });
        $elements.find('.small').next().animate({
            fontSize: 20,
            color: "#999"
        }, function () {
            $(this).addClass('small');
        });
    };

    function moveUp() {
        if ($elements.find('.stop').hasClass('_small')) {
            $elements.css('top', 0 + 'px');
            styleInit();
        }
        $elements.animate({
            top: '-=' + lineHeight + 'px'
        });
        $('div').fontChange();
    }

    function styleInit() {
        var types = ['_small', 'active', 'small'];
        $elements.find('li:eq(1)').addClass(types[0]);
        $elements.find('li:eq(2)').addClass(types[1]);
        $elements.find('li:eq(3)').addClass(types[2]);
    }

    $.ajax({//获取WIFI探针数据
        url: 'data/wifiData.php',
        dataType: 'json',
        data: {
            mac: "62:68:75:AA:11:05",
            startTime: "20170728110000",
            endTime: "20170728120000"
        },
        success: function (result) {
            var data = result.WIFI;
            var num = result.number;
            var footData = data.slice(0, 3);//截取WIFI前3项data
            var headData = data.slice(-2);//截取WIFI最后2项data
            for (var i = headData.length - 1; i >= 0; i--) {//将headData倒序添加到data列表头部
                data.unshift(headData[i]);
            }
            footData.forEach(function (t) {//将footData顺序添加到data列表底部
                data.push(t);
            });
            for (i = 0; i < data.length; i++) {//将data每一项的内容添加到列表中
                $("#wifi-data").append("<li>" + data[i].data + "</li>");
            }
            startScroll();
            $('.wifi-content-title').find('p').eq(-1).html("U-ID DETECTTED：" + num);
        }
    });

    function startScroll() {
        $elements.children().eq(-4).addClass('stop');//设置停止标记
        styleInit();
        lineHeight = $elements.children().eq(0).height();
        var time = setInterval(moveUp, 2000);
        $elements.hover(function () {//鼠标移至探针数据上停止轮播
            clearInterval(time);
        }, function () {//鼠标移开继续轮播
            clearInterval(time);
            time = setInterval(moveUp, 2000);
        });
        window.onblur = function () {//页面切出去时停止轮播
            clearInterval(time);
        };
        window.onfocus = function () {//页面切换回来继续轮播
            clearInterval(time);
            time = setInterval(moveUp, 2000);
        };
    }
});