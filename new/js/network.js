$(function () {
    var chartBox = document.getElementById('networkChart');
    var networkContent = document.getElementById('networkContent');
    var setChartSize = function () {
        chartBox.style.width = networkContent.clientWidth + 'px';
        chartBox.style.height = networkContent.clientHeight + 'px';
    };
    setChartSize();
    var myChart = echarts.init(chartBox);
    option = {
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
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '带宽',
                type: 'line',
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
                data: [150, 220, 200, 160, 190, 330, 410]
            }
        ]
    };
    myChart.setOption(option);
    window.onresize = function () {
        //重置容器高宽
        setChartSize();
        myChart.resize();
    };
});