$(function () {
    $('#pageSelect').tabify({num: 1});
    $('#Map .hov').each(function (item) {
        //鼠标放上，显示图片
        $(this).mouseover(function () {
            $('.bghover').each(function () {
                $(this).removeClass('hover');
            });
            $('.bghover' + ':eq(' + item + ')').addClass('hover');
        });
    });


    $.ajax({//获取WIFI探针数据
        url: 'data/data.json',
        dataType: 'json',
        success: function (result) {
            console.log(result);
            var data = result.WIFI;
            var footData = data.slice(0, 3);//截取WIFI前3项data
            var headData = data.slice(-2);//截取WIFI最后2项data
            for (var i = headData.length - 1; i >= 0; i--) {//将headData倒序添加到data列表头部
                data.unshift(headData[i]);
            }
            footData.forEach(function (t) {//将footData顺序添加到data列表底部
                data.push(t);
            });
            for (i = 0; i < data.length; i++) {//将data每一项的内容添加到列表中
                $("#wifi-data").append("<li><a href='#'>" + data[i].data + "</a></li>");
            }
            $("#wifi-data").fontScroll({time: 2000});//给列表添加滚动事件，并设置滚动间隔
        }
    });

});

$.fn.fontScroll = function (options) {//WIFI探针滚动方法
    var init = {time: 3000, big: '_active', small: "_small", tiny: "_tiny", num: 2};
    $.extend(init, options);
    var express = $("#wifi-data");
    var li = express.children().eq(0);
    var height = li.height();//单次滚动高度
    var time = init.time;//滚动间隔
    var styleBig = init.big;
    var styleSmall = init.small;
    var styleTiny = init.tiny;
    var num = init.num; //中间项序号
    var _li = express.find("li");
    var _num = _li.length; //总数量

    setStyle();//给初始位置设置类
    var timeID = setInterval(moveUp, time);//按滚动间隔设置向上滚动方法
    express.hover(function () {//鼠标放置在探针可视区域时停止滚动
        clearInterval(timeID)
    }, function () {//离开可视区域后继续滚动
        timeID = setInterval(moveUp, time)
    });

    function setStyle() {  //给中间项设置_active类，给前后一个设置_small类，给再前后一个设置_tiny类
        _li.eq(num - 2).addClass(styleTiny);
        _li.eq(num - 1).addClass(styleSmall);
        _li.eq(num).addClass(styleBig);
        _li.eq(num + 2).addClass(styleTiny);
        _li.eq(num + 1).addClass(styleSmall);
        $("li._active").find("a").animate({ //给_active类子项的a标签动画属性：字号26，颜色橙色
            fontSize: 26,
            color: "#f6ab02"
        });
        $("li._small").find("a").animate({ //给_small类子项的a标签动画属性：字号20，颜色黑色
            fontSize: 20,
            color: "#999"
        });
        $("li._tiny").find("a").animate({  //给_tiny类子项的a标签动画属性：字号16，颜色黑色
            fontSize: 16,
            color: "#666"
        });
    }

    function styleInit() { //在一个循环结束后，给li最前面五个兄弟设置属性
        express.children().eq(0).find("a").css({
            fontSize: 16,
            color: "#666"
        });
        express.children().eq(1).find("a").css({
            fontSize: 20,
            color: "#999"
        });
        express.children().eq(2).find("a").css({
            fontSize: 27,
            color: "#f6ab02"
        });
        express.children().eq(3).find("a").css({
            fontSize: 20,
            color: "#999"
        });
        express.children().eq(4).find("a").css({
            fontSize: 16,
            color: "#666"
        });
    }

    function removeStyle() {//移除类
        _li.removeClass(styleBig);
        _li.removeClass(styleSmall);
        _li.removeClass(styleTiny);
    }

    function moveUp() {//列表向上滚动
        express.animate({
                top: '-=' + height //滚动一个li的高度
            }, function () {//滚动结束后判断当前是否在下一次循环的开头
                if (express.css("top") === -(_num - 2 * init.num - 1) * height + "px") {
                    styleInit();//在循环切换的时候为了避免由于top值回调造成的“原地缩放回滚”，给列表的前五项设置属性。
                    express.css("top", 0);
                    num = init.num;//中间项序号恢复初始化
                    removeStyle();//移除所有列表的类
                }
            }
        );
        num++;//中间项序号加1
        removeStyle();//移除所有列表的类
        setStyle();//给当前中间项以及前后2项设置类
    }
};