$(function () {
    $('#pageSelect').tabify({num: 0});

    /*********************************profile模块******************************/
        //显示的文字
    var Info = [{
            title:'数据采集端',
            message:'- 采用数字摄像头获取得到的视频流数据，将进行实时切片和内容分析。<br/>\n' +
            '- 警用WiFi探针将提供大功率电子身份标识采集能力，无缝捕捉环境中的电子身份标识。<br/>'
        },{
            title:'蓝存',
            message:'- 蓝存是北京研究院第一款完全依靠自有力量，借助开源社区+自主研发上线的云产品；通过近四年的持续研发，目前已具备完善的功能和运营体系。<br/>'+
            '- 以开源分布式对象存储技术Ceph为核心，利用x86存储设备集群协同工作，共同对外提供多种类型和量级的数据存储、备份、共享等服务，支持对象存储(S3)、文件(NFS)以及块存储(iSCSI)接口和协议 。<br/>'+
            '- 蓝存已在浙江电信、集团企信、广西电信等地进行落地部署。<br/>'
        },{
            title:'云网融合',
            message:'-建设私有云、公有云两级存储，实现轻量热数据的OLAP级查询展现，以及海量温冷数据的长期备份存储。<br>'+
            '-借助随选网络能力，实现夜间业务低峰期的视频数据备份传输，并支持离线的历史视频数据查询任务。<br/>'
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
        var hrefArr = ['collection','storage','network']
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
            $('.characteristic-more').click(function(){
                $('#pageSelect').tabify({num:index+1});
            })
            if($(window).width()<=1900){
                if(index!=1){
                    $('.main-characteristic').height('180px');
                }
                else{
                    $('.main-characteristic').height('220px');
                }
            }else{
                if(index!=1){
                    $('.main-characteristic').height('25%');
                }
                else{
                    $('.main-characteristic').height('34%');
                }
            }
        });
    });
});