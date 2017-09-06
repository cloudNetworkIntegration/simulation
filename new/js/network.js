function getTime(delay) {
    var myDate = new Date();
    var t = {
        year: myDate.getFullYear(),
        month: myDate.getMonth() + 1,
        date: myDate.getDate(),
        h: myDate.getHours(),
        m: myDate.getMinutes(),
        s: myDate.getSeconds()
    };
    var now = t.year + '-' + formateTime(t.month) + '-' + formateTime(t.date) + ' ' + formateTime(t.h) + ':' + formateTime(t.m) + ':' + formateTime(t.s);
    var result = previousDate(now, delay);
    var pre = result.year + '-' + formateTime(result.month) + '-' + formateTime(result.date) + 'T' + formateTime(result.h) + ':' + formateTime(result.m) + ':' + formateTime(result.s);
    now = now.replace(' ', 'T');
    return time = {
        now: now,
        pre: pre
    }
}

$(function () {
    /**
     * 云网融合数据获取以及echarts的配置
     * */
    var data1Time = [];
    var data1Value = [];
    var data2Time = [];
    var data2Value = [];
    var time = getTime(3600000);
    getFlow();
    var chartBox = document.getElementById('networkChart');
    var networkContent = document.getElementById('networkContent');

    function getFlow() {
        $.ajax({
            url: 'data/stateData.php',
            dataType: 'json',
            data: {
                StartTime: time.pre,
                EndTime: time.now
            },
            success: function (response) {
                response[0].data.forEach(function (t) {
                    t[0] = t[0].replace(/[-Z]/g, '');
                    t[0] = t[0].replace(/[T]/g, '-');
                    t[0] = t[0].substring(4, t[0].length);
                    data1Time.push(t[0]);
                    data1Value.push(t[1]);
                });
                response[1].data.forEach(function (t) {
                    t[0] = t[0].replace(/[Z]/g, '');
                    data2Time.push(t[0]);
                    data2Value.push(t[1]);
                });
            },
            error: function () {
                console.error('流量获取异常');
            }
        });
    }

    setInterval(function () {
        time = getTime(60000);
        console.log(time);
        getFlow();
    }, 60000);


    function setChartSize() {
        chartBox.style.width = networkContent.clientWidth + 'px';
        chartBox.style.height = networkContent.clientHeight + 'px';
    }

    $('#pageSelect').find('li:eq(-1)').click(function () {
        setChartSize();
        myChart.resize();
    });
    var myChart = echarts.init(chartBox);
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            width: chartBox.style.width,
            height: chartBox.style.height
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            name: '时间/s',
            nameGap: 25,
            nameLocation: 'middle',
            nameTextStyle: {
                fontSize: 18
            },
            boundaryGap: false,
            data: data1Time,
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            /*min: 0,
            max: 1000,*/
            name: '流量/带宽(Mbps)',
            boundaryGap: [0, '100%'],
            nameTextStyle: {
                fontSize: 18
            },
            splitLine: {
                show: false
            }
        },
        dataZoom: [{
            type: 'inside',
            /*start: 0,
            end: 100,
            minValueSpan:8,*/
            maxValueSpan: 10,
            startValue: 0,
            endValue: 9
        }],
        series: [
            {
                name: '上行',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                lineStyle: {
                    normal: {
                        color: '#288fcf'
                    }
                },
                label: {
                    normal: {
                        color: '#288fcf',
                        show: true,
                        position: 'top'
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#288fcf'
                    }
                },
                areaStyle: {
                    normal: {
                        color: '#288fcf',
                        opacity: '0.5'
                    }
                },
                data: data1Value
            },
            {
                name: '下行',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                lineStyle: {
                    normal: {
                        color: '#449FAD'
                    }
                },
                label: {
                    normal: {
                        color: '#449FAD',
                        show: true,
                        position: 'top'
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#449FAD'
                    }
                },
                areaStyle: {
                    normal: {
                        color: '#449FAD',
                        opacity: '0.5'
                    }
                },
                data: data2Value
            }
        ]
    };
    setInterval(function () {
        if (option.dataZoom[0].endValue === data1Time.length - 1) {
            option.dataZoom[0].startValue = 0;
            option.dataZoom[0].endValue = 9;
        } else {
            option.dataZoom[0].startValue++;
            option.dataZoom[0].endValue++;
        }
        myChart.setOption(option);
    }, 2000);
    myChart.setOption(option);
    window.onresize = function () {
        //重置容器高宽
        setChartSize();
        myChart.resize();
    };

    /**
     * 状态切换
     * */
    function changeCondition(condition) {
        $.ajax({
            url: 'data/changeCondition.php',
            dataType: 'text',
            data: {
                adjust: condition
            },
            success: function (response) {
                if (response === 'success') {
                    console.log('切换' + condition + '成功');
                    if (condition === 'night') {
                        $('#modeButton').html('切换至日间模式').toggleClass('day');
                        $('#modeTitle').html('当前：夜间模式');
                    } else if (condition === 'day') {
                        $('#modeButton').html('切换至夜间模式').toggleClass('day');
                        $('#modeTitle').html('当前：日间模式');
                    }
                } else {
                    console.error('切换' + condition + '失败');
                    alert("切换" + condition + "错误，请检查服务器！");
                }
            },
            error: function () {
                console.error("状态切换失败");
                alert("失败");
            }
        });
    }

    $('#modeButton').click(function () {
        if ($(this).hasClass('day')) {
            changeCondition('night');
        } else {
            changeCondition('day')
        }

    });
});