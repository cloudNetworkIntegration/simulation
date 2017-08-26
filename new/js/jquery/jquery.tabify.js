$.fn.extend({
    // Usage:
    // jQuery(selector).tabify();
    tabify: function (options) {
        var num=options.num;
        return $(this).each(function () {
            var $element, $tabs, $pages;
            //ul
            $element = $(this);
            //ul>li
            $tabs = $element.children();
            //sections
            $pages = $('.main');
            // Functions
            var activateTab = function (id) {
                $tabs.filter('.active').removeClass('active');
                $pages.filter('.active').removeClass('active');
                $tabs.has('a[href="' + id + '"]').addClass('active');
                $pages.filter(id).addClass('active');
            };
            // Setup events
            $tabs.on('click', function (e) {
                activateTab($(this).find('a').attr('href'));
                e.preventDefault();
            });
            // Activate first tab
            activateTab($tabs.eq(num).find('a').attr('href'));
        });
    }
});