$(function() {

    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "200G",
            value: 57
            
        }, {
            label: "200G",
            value: 43
        }],
        colors:['#3cf','#aaa'],
        formatter:function (y, data) { return y + '%' },
        resize: true
    });
});
