define(['app'], function(appPris) {
    /**
     * form validation
     */
    appPris.register.directive('ngValidator', [
        function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ctrl) {
                    ctrl.$error = false;
                    element.bind('keyup', function() {
                        checkEror(element);
                    }).bind('blur', function() {
                        checkEror(element);
                    });
                    /**
                     * check each input is blank or not
                     * @param  {object} id
                     */
                    var checkEror = function(id) {
                        var $this = $(id),
                            thisVal = $this.val();

                        scope.$apply(function() {
                            if (thisVal === '' || thisVal === null || thisVal === undefined) {
                                $(element).addClass('ipt_eror');
                                ctrl.$error = true;
                            } else {
                                $(element).removeClass('ipt_eror');
                                ctrl.$error = false;
                            }
                        });
                    }
                    /**
                     * check each input before submit
                     */
                    $(document).on('submit', 'form', function() {
                        for (var i = 0; i < element.length; i++) {
                            checkEror(element[i]);
                        }
                    });
                }
            }
        }
    ]);
});
