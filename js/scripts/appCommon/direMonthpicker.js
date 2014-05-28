/**
 * jquery ui datepicker
 */
define(['app', 'jQueryMonthpicker'], function(appPris) {
    appPris.register.directive('monthpicker', [
        function() {
            return {
                require: 'ngModel',
                link: function(scope, el, attr, ngModel) {
                    var options = {
                        pattern: 'yyyy-mm'
                    };
                    $(el).monthpicker(options);
                }
            };
        }
    ]);
});
