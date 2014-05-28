define(['app'], function(appPris) {
    /**
     * custom filter by multiple same values: these values is splited by \n
     */
    appPris.register.filter('filterByMulti', [
        function() {
            return function(input, searchText) {
                var returnArray = [];

                // if (searchText === undefined || searchText === '') {
                //     returnArray = input;
                // } else {}

                if (searchText !== undefined) {
                    var newAray = [],
                        searchTextSplit = searchText.split('\n');

                    for (var x = 0; x < input.length; x++) {
                        for (var y = 0; y < searchTextSplit.length; y++) {
                            if (searchTextSplit[y].length > 5 && input[x].lanId.indexOf(searchTextSplit[y]) !== -1) {
                                newAray.push(input[x]);
                            }
                        }
                    }
                    returnArray = newAray;
                }

                return returnArray;
            }
        }
    ]);
});
