define(['app'], function(appPris) {
    /**
     * toggle class
     */
    appPris.register.directive('ngToggleClass', [
        function() {
            return function(scope, element, attrs, ctrl) {
                // click to add and remove class 'selected'
                element.bind('click', function() {
                    if (element.hasClass('selected')) {
                        element.removeClass('selected');
                        element.siblings().removeClass('selected');
                    } else {
                        element.addClass('selected');
                        element.siblings().addClass('selected');
                    }
                });

                // double click to remove siblings' classs 'selected'
                element.bind('dblclick', function() {
                    element.parent().siblings().children().removeClass('selected');
                });
            }
        }
    ]);
});
