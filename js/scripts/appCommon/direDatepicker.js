/**
 * jquery ui datepicker
 */
define(['app', 'jQueryUI'], function(appPris) {
    appPris.register.directive('datepicker', [function() {
            return {
                require: 'ngModel',
                link: function(scope, el, attr, ngModel) {
                    $(el).datepicker({
                        changeMonth: true,
                        changeYear: true,
                        maxDate: '0',
                        dateFormat: 'yy-mm-dd',
                        onSelect: function(dateText) {
                            scope.$apply(function() {
                                ngModel.$setViewValue(dateText);
                            });
                        }
                    });
                }
            };
        }
    ]);
});

