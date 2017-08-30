$(function () {
    $('#pageSelect').tabify({num: 0});

    /*********************************profile模块******************************/
        //显示的文字
    var Info = [{
            title:'蓝存',
            message:'- 采用数字摄像头获取得到的视频流数据，将进行实时切片和内容分析。<br/>\n' +
            '- 警用WiFi探针将提供大功率电子身份标识采集能力，无缝捕捉环境中的电子身份标识。<br/>'
        },{
            title:'数据采集端',
            message:'- 采用数字摄像头获取得到的视频流数据，将进行实时切片和内容分析。<br/>\n' +
            '- 警用WiFi探针将提供大功率电子身份标识采集能力，无缝捕捉环境中的电子身份标识。<br/>',
        },{
            title:'云网融合',
            message:'- 采用数字摄像头获取得到的视频流数据，将进行实时切片和内容分析。<br/>\n' +
            '- 警用WiFi探针将提供大功率电子身份标识采集能力，无缝捕捉环境中的电子身份标识。<br/>'
        }]

    //窗口大小发生改变
    $(window).resize(function(){
        var doc_width = document.body.clientWidth;
        if(doc_width>1900){
            $('.bgtu').attr('usemap','#MapLarge');
            $('.bghover').each(function(){$(this).attr('usemap','#MapLarge');})
        }
        else{
            $('.bgtu').attr('usemap','#MapSmall')
            $('.bghover').each(function(){$(this).attr('usemap','#MapSmall');})
        }
    });

    $('.hov').each(function(item){
        var index = item%3;
        //鼠标放上，显示图片
        $(this).mouseover(function(){
            $('.bghover').each(function(){
                $(this).removeClass('hover');
            });
            $('.bghover'+':eq('+index+')').addClass('hover');
        });

        //鼠标点击，更换右侧文字
        $(this).click(function(){
            $('.main-characteristic-content h3').html(Info[index].title);
            $('.main-characteristic-content p').html(Info[index].message);
        });
    });

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
        success: function (result) {
            var data = result.WIFI;
            var num=result.number;
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
            $('.wifi-content-title').find('p').eq(-1).html("U-ID DETECTTED："+num);
        }
    });

    function startScroll() {
        $elements.children().eq(-4).addClass('stop');
        styleInit();
        lineHeight = $elements.children().eq(0).height();
        var time = setInterval(moveUp, 2000);
        $elements.hover(function () {
            clearInterval(time);
        }, function () {
            clearInterval(time);
            time = setInterval(moveUp, 2000);
        });
        window.onblur = function () {
            clearInterval(time);
        };
        window.onfocus = function () {
            clearInterval(time);
            time = setInterval(moveUp, 2000);
        };
    }
});