define(['app'], function(appPris) {
    /**
     * filter pagination
     */
    appPris.register.filter('startFrom', [
        function() {
            return function(input, start) {
                start = parseInt(start, 10);
                return input.slice(start);
            }
        }
    ]);
});
