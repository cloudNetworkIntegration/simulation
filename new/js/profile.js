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
});