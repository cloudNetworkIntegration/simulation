/********************采集端页面js，wifi探针的轮播************************/
function formateTime(s) {
    return s < 10 ? '0' + s : s;
}

function previousDate(now, time) {//dateStr格式为yyyy-mm-dd hh:mm:ss
    var dt = new Date(now.replace(/-/, "/"));//将传入的日期格式的字符串转换为date对象 兼容ie
    var ndt = new Date(dt.getTime() - time);//将转换之后的时间减去时间
    var result = {
        year: parseInt(ndt.getFullYear()),
        month: parseInt(ndt.getMonth() + 1),
        date: parseInt(ndt.getDate()),
        h: parseInt(ndt.getHours()),
        m: parseInt(ndt.getMinutes()),
        s: parseInt(ndt.getSeconds())
    };
    return result;
}

function getNowFormatDate() {
    var myDate = new Date();
    var t = {
        year: myDate.getFullYear(),
        month: myDate.getMonth() + 1,
        date: myDate.getDate(),
        h: myDate.getHours(),
        m: myDate.getMinutes() - 10,
        s: myDate.getSeconds()
    };
    var now = t.year + '-' + formateTime(t.month) + '-' + formateTime(t.date) + ' ' + formateTime(t.h) + ':' + formateTime(t.m) + ':' + formateTime(t.s);
    var result = previousDate(now, 10000);
    now = now.replace(/[-: ]/g, '');
    var pre = result.year + formateTime(result.month) + formateTime(result.date) + formateTime(result.h) + formateTime(result.m) + formateTime(result.s);
    var time = {
        now: now,
        pre: pre
    };
    return time;
}

$(function () {
    var $elements = $("#wifi-data");
    var flag = false;
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

    var index = 10;

    function moveUp() {
        $elements.animate({
            top: '-=' + lineHeight + 'px'
        }, function () {
            $elements.children().eq(0).remove();
            $elements.append('<li>' + wifiData[index] + '</li>');
            $elements.css('top', '0px');
            index++;
        });
        $('div').fontChange();
    }

    function styleInit() {
        var types = ['_small', 'active', 'small'];
        $elements.find('li:eq(1)').addClass(types[0]);
        $elements.find('li:eq(2)').addClass(types[1]);
        $elements.find('li:eq(3)').addClass(types[2]);
    }

    function startScroll() {
        flag = true;
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

    var wifiData = [];
    setInterval(function () {
        var time = getNowFormatDate();
        var pre = time.pre;
        var now = time.now;
        $.ajax({//获取WIFI探针数据
            //url: 'data/wifiData.php',
            url: 'http://124.127.117.39:80/simulation/data/wifiData.php',
            dataType: 'json',
            data: {
                mac: "62:68:75:AA:11:05",
                startTime: pre,
                endTime: now
            },
            success: function (result) {
                var data = result.WIFI;
                var num = result.number;
                for (var i = 0; i < data.length; i++) {//将data每一项的内容添加到列表中
                    wifiData.push(data[i].data);
                }
                $('.wifi-content-title').find('p').eq(-1).html("U-ID DETECTTED：" + num);
                if (!flag) {
                    for (i = 0; i < Math.min(wifiData.length, 10); i++) {
                        $elements.append('<li>' + wifiData[i] + '</li>');
                    }
                    styleInit();
                    startScroll();
                }
            },
            error: function () {
                var data = 'No data';
                $elements.empty();
                for (var i = 0; i < 5; i++) {//将data每一项的内容添加到列表中
                    $elements.append("<li>" + data + "</li>");
                }
                $('.wifi-content-title').find('p').eq(-1).html("U-ID DETECTTED：NULL");
                styleInit();
            }
        });
    }, 5000);
    setInterval(function () {
        //得到现在的时间
        var today = new Date();
        //得到今天零点的时间
        var date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        //得到今天零点的毫秒
        var zero = date.getTime();
        //得到现在时间的毫秒
        var now = today.getTime();
        //得到零点到现在的秒数
        var seconds = parseInt((now - zero) / 1000);
        $('.monitor-content-title').find('p').eq(-1).html("FRAME PROCESSD：" + seconds * 25)
    }, 1000);
});