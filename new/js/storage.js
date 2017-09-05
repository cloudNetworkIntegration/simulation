$(function(){
    var canvas = $(".water-wave");
    var ctx = canvas[0].getContext('2d');
    var startTime = Date.now();
    var time = 2000;
    var clockwise = 1;
    var cp1x, cp1y, cp2x, cp2y;

    requestAnimationFrame(function waveDraw() {
        var t = Math.min(1.0, (Date.now() - startTime) / time);

        if(clockwise) {
            cp1x = 121 + (74 * t);
            cp1y = 28 + (72 * t);
            cp2x = 123 - (69 * t);
            cp2y = 179 - (79 * t);
        } else {
            cp1x = 195 - (74 * t);
            cp1y = 100 - (72 * t);
            cp2x = 54 + (69 * t);
            cp2y = 100 + (79 * t);
        }

        ctx.clearRect(0, 0, 270, 200);
        ctx.beginPath();
        ctx.moveTo(0, 100);
        // 绘制三次贝塞尔曲线
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, 270, 100);
        // 绘制矩形
        ctx.rect(0, 100, 270,200);
        ctx.fillStyle = '#bae3f9';
        ctx.fill();
        ctx.save();

        if( t == 1 ) {
            startTime = Date.now();
            clockwise = !clockwise;
        }
        requestAnimationFrame(waveDraw);
    });

    function ajaxInfo() {
        $.ajax({
            type:'get',
            url:'http://180.153.45.27:8081/CloudNetPlatform/getUsedData',
            datatype: 'jsonp',
            jsonp:'jsonpCallback',
            success:function (data) {
                $('#read_speed').innerHTML=data.read;
                $('#write_speed').innerHTML=data.write;
                $('#proportion').innerHTML=data.used;
            }
        })

    }

    setInterval(ajaxInfo,10000);
    ajaxInfo();
});