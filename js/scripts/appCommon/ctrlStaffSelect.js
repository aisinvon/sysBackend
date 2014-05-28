define(['app', 'direToggleClass', 'direValidator'], function(appPris) {
    /**
     * controller of get all staff data
     * @type {controller}
     * @param {object} $scope
     */
    appPris.register.controller('ctrlStaffSelect', ['$scope', '$http', '$routeParams',
        function($scope, $http, $routeParams) {
            var routePara,
                apiPrefix = $('#api_prefix').val(),
                urlPara = apiPrefix + $('#dataSource_staff').val(),
                dataSource,
                _hash = window.location.hash,
                postObj = {},
                postUrl;

            // show loading tips
            $scope.tipLoadingStatus = true;

            // get menu id from url
            if ($routeParams.nodeId !== undefined) {
                routePara = $routeParams.nodeId.replace(/:/g, '');
            }

            // load different data based on menu id in url
            if (_hash.indexOf('role') > 0) {
                $scope.menuInfoIptStatus = false;
                $scope.roleInfoIptStatus = true;
                if (routePara === undefined) {
                    // used for debug
                    routePara = '';
                    // routePara = '1';
                }
            } else {
                $scope.menuInfoIptStatus = true;
                $scope.roleInfoIptStatus = false;
                if (routePara === undefined) {
                    // used for debug
                    routePara = '';
                    // routePara = '3';
                }
            }

            dataSource = urlPara + routePara.toLowerCase().replace(/:/g, '');

            // declare data in staff list
            $scope.items = [];
            // declare data in selected list
            $scope.slcteds = [];
            // declare data in basic menu information
            $scope.newItem = {};

            /**
             * remove one value from an Array
             * @param  {object} val: array value
             */
            Array.prototype.remove = function(val) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == val) {
                        this.splice(i, 1);
                        break;
                    }
                }
            }

            // get data of table
            if (dataSource !== undefined) {
                $http({
                    method: 'GET',
                    url: dataSource
                }).success(function(data, status, headers, config) {
                    // hide loading tips
                    $scope.tipLoadingStatus = false;

                    var i,
                        len = data[0].infoStaff.length,
                        // selected array list
                        arayNormal = [],
                        // not selected array list
                        araySlcted = [];

                    // render staff
                    for (i = 0; i < len; i++) {
                        if (data[0].infoStaff[i].checked) {
                            araySlcted.push(data[0].infoStaff[i]);
                        } else {
                            arayNormal.push(data[0].infoStaff[i]);
                        }
                    }

                    // render basic info
                    if ($scope.menuInfoIptStatus) {
                        $scope.newItem = data[0].infoMenu;
                    }else if($scope.roleInfoIptStatus){
                        $scope.newItem = data[0].infoRole;
                    }

                    $scope.items = arayNormal;
                    $scope.numLimit = 50;
                    $scope.slcteds = araySlcted;
                    // $scope.myData  = arayNormal;
                    // $scope.gridOptions = { data: myData  };
                });
            }

            // declare two array to store default staff and selected staff
            var leftValueAray = [],
                rightValueAray = [],
                changedValueAray = [];

            /**
             * move selected staff to right when double click
             * @param  {object} value selected item in array
             * @param  {string} orientation move item to left or right
             */
            $scope.dbClickItem = function(value, orientation) {
                if (orientation === 'toR') {
                    $scope.slcteds.push(value);
                    $scope.items.remove(value);

                    // push selected value to array changedValueAray
                    value.checked = true;
                    changedValueAray.push(value);

                    // reset array
                    leftValueAray.length = 0;
                } else {
                    $scope.items.push(value);
                    $scope.slcteds.remove(value);

                    // push un-selected value to array changedValueAray
                    value.checked = false;
                    changedValueAray.push(value);

                    /// reset array
                    rightValueAray.length = 0;
                }

                // set each item's status to undefined when moved items
                cleanItemStatus();
            }

            /**
             * select serveral staff when single click on each staff
             * @param  {object} value selected item in array
             * @param  {string} orientation move item to left or right
             */
            $scope.clickItem = function(value, orientation) {
                if (value.highlighted === undefined) {
                    value.highlighted = true;
                    // this.isSlcted = true;

                    if (orientation === 'toR') {
                        leftValueAray.push(value);

                        // push selected value to array changedValueAray
                        value.checked = true;
                        changedValueAray.push(value);
                    } else {
                        rightValueAray.push(value);

                        // push un-selected value to array changedValueAray
                        value.checked = false;
                        changedValueAray.push(value);
                    }
                } else {
                    value.highlighted = undefined;
                    // this.isSlcted = false;

                    if (orientation === 'toR') {
                        leftValueAray.remove(value);

                        // push selected value to array changedValueAray
                        value.checked = true;
                        changedValueAray.push(value);
                    } else {
                        rightValueAray.remove(value);

                        // push un-selected value to array changedValueAray
                        value.checked = false;
                        changedValueAray.push(value);
                    }
                }
            }

            /**
             * move selected staff to right when click arrow button
             * @param  {string} orientation move item to left or right
             */
            $scope.moveItem = function(orientation) {
                if (orientation === 'toR') {
                    // add selected staff to right
                    for (var i = 0, len = leftValueAray.length; i < len; i++) {
                        $scope.slcteds.push(leftValueAray[i]);
                        $scope.items.remove(leftValueAray[i]);

                        // push un-selected value to array changedValueAray
                        leftValueAray[i].checked = true;
                        changedValueAray.push(leftValueAray[i]);
                    }
                    // reset array
                    leftValueAray.length = 0;
                } else {
                    // add selected staff to right
                    for (var i = 0, len = rightValueAray.length; i < len; i++) {
                        $scope.items.push(rightValueAray[i]);
                        $scope.slcteds.remove(rightValueAray[i]);

                        // push un-selected value to array changedValueAray
                        rightValueAray[i].checked = false;
                        changedValueAray.push(rightValueAray[i]);
                    }
                    // reset array
                    rightValueAray.length = 0;
                }

                // set each item's status to undefined when moved items
                cleanItemStatus();
            }

            /**
             * set each item's status to undefined when moved items
             */
            var cleanItemStatus = function() {
                var i,
                    j = $scope.items.length,
                    k = $scope.slcteds.length;

                // reset all staff's highlighted status in left
                for (i = 0; i < j; i++) {
                    delete $scope.items[i].highlighted;
                }
                // reset all staff's highlighted status in left
                for (i = 0; i < k; i++) {
                    delete $scope.slcteds[i].highlighted;
                }
            }

            // submit selected staff
            $scope.staffSlct = function(isValid) {
                if (isValid) {
                    fedPris.ngShowLoading();
                }
            }
            $scope.staffSubmit = function(isValid, item) {
                if (isValid) {
                    $scope.maskStatus = true;
                    $scope.popUpStatus = true;

                    if ($scope.menuInfoIptStatus) {
                        if (item.menuCheck === undefined) {
                            item.menuCheck = false;
                        }

                        postUrl = apiPrefix + $('#post_sbmtMenu').val();
                        postObj.infoMenu = item;
                        postObj.infoMenu.id = Number(routePara);
                    } else if($scope.roleInfoIptStatus){
                        postUrl = apiPrefix + $('#post_sbmtUserRole').val();
                        postObj.infoRole = item;
                        postObj.infoRole.id = Number(routePara);
                    }
                    
                    postObj.infoStaff = $.unique(changedValueAray);

                    $http({
                        method: 'POST',
                        url: postUrl,
                        data: postObj
                    }).success(function(data, status, headers, config) {
                        // $('#pop_win_mask, #pop_loading').hide();
                        fedPris.closeAllPop();
                    }).error(function(data, status, headers, config) {
                        fedPris.closeAllPop();
                        alert('Error, please try again later.')
                    });
                }
            }
        }
    ]);
});
