define(['app', 'direValidator', 'direDatepicker', 'direMonthpicker', 'filterPage'], function(appPris) {
    /**
     * controller of get table data
     * @type {controller}
     * @param {object} $scope
     */
    appPris.register.controller('ctrlTable', ['$scope', '$http', '$routeParams',
        function($scope, $http, $routeParams) {
            var apiPrefix = $('#api_prefix').val(),
                dataSource = $('#angularWrap').attr('data-source'),
                dataPrefix = $('#angularWrap').attr('data-prefix'),
                ccUrl = apiPrefix + 'SetCCManagement/GetCostCenter',
                resoCateUrl = apiPrefix + 'SetUserRole/GetResourceCategory',
                itUnitUrl = apiPrefix + 'SetBusinessUnitManagement/GetBusinessUnit',
                itemCateUrl = apiPrefix + 'DataItem/GetDataItemCategoryList',
                finalUrl = apiPrefix + dataSource;

            // hightlight current nav tab 
            // $('.' + _hash).addClass('on').siblings().removeClass('on');

            $scope.items = [];
            // if submit one new item, set it to true; if just update one item, set it to false
            $scope.isNewItem = true;

            /**
             * get data and render table
             */
            if (dataSource !== undefined) {
                $http({
                    method: 'GET',
                    url: finalUrl
                }).success(function(data, status, headers, config) {
                    $('.tip_loading').hide();
                    $scope.items = data;
                    $scope.numLimit = 10;
                    // go to first page after filter
                    $scope.currentPage = 0;
                });
            }


            /**
             * get cost center data
             */
            $scope.costCenters = [];
            if ($('#cccode').length > 0) {
                $http({
                    method: 'GET',
                    url: ccUrl
                }).success(function(data, status, headers, config) {
                    var i = 0,
                        len = data.length;

                    // only get cost center which have names
                    for (i = 0; i < len; i++) {
                        var ccName = data[i].costCenterName;
                        if (ccName === null) {
                            ccName = '';
                        }
                        if (ccName.replace(/\s/, '') !== '') {
                            $scope.costCenters.push(data[i]);
                        }
                    }
                });
            }
            /**
             * get resource category data
             */
            $scope.resoCates = [];
            if ($('#resourceCategory').length > 0) {
                $http({
                    method: 'GET',
                    url: resoCateUrl
                }).success(function(data, status, headers, config) {
                    $scope.resoCates = data;
                });
            }
            /**
             * get business unit (or it unit) data
             */
            $scope.itUnits = [];
            if ($('#iTUnitId').length > 0) {
                $http({
                    method: 'GET',
                    url: itUnitUrl
                }).success(function(data, status, headers, config) {
                    $scope.itUnits = data;
                });
            }
            /**
             * get category of category item
             */
            $scope.itemCates = [];
            if ($('#itemCate').length > 0) {
                $http({
                    method: 'GET',
                    url: itemCateUrl
                }).success(function(data, status, headers, config) {
                    $scope.itemCates = data;
                });
            }


            /**
             * pop up window and mask show hide status. True is show, false is hide.
             * @type {Boolean}
             */
            $scope.popUpStatus = true;
            $scope.maskStatus = false;
            $scope.showMaskFun = function() {
                fedPris.ngShowPop('#pop_win_edit');
                $scope.isNewItem = true;
                $scope.newItem = null;
                $scope.popUpStatus = true;
                $scope.maskStatus = true;
            }


            /**
             * add new item
             * @param  {Boolean} isValid
             * @param  {object}  item
             */
            $scope.submitForm = function(isValid, item, flag) {
                var postUrl;

                // check to make sure the form is completely valid
                if (isValid) {
                    fedPris.ngShowLoading();

                    switch (flag) {
                        case 'costCenter':
                            item.createTime = new Date().format('yyyy-MM-dd HH:mm:ss');

                            if ($scope.isNewItem) {
                                if (!item.usedForBudget) {
                                    item.usedForBudget = false;
                                }

                                item.iTUnit = null;
                                item.description = null;

                                postUrl = apiPrefix + 'SetCCManagement/AddCostCenter';
                            } else {
                                postUrl = apiPrefix + 'SetCCManagement/UpdateCostCenter';
                            }
                            break;

                        case 'team':
                            item.createTime = new Date().format('yyyy-MM-dd HH:mm:ss');

                            if ($scope.isNewItem) {
                                postUrl = apiPrefix + 'SetTeamManagement/AddTeam';
                                item.teamId = 0;
                                item.manager = null;
                                item.status = Number(item.status);
                                item.iTUnitId = Number(item.iTUnitId);
                                item.iTUnit = null;
                            } else {
                                postUrl = apiPrefix + 'SetTeamManagement/UpdateTeam';
                            }
                            break;

                        case 'mtRoom':
                            if ($scope.isNewItem) {
                                postUrl = apiPrefix + 'MeetingRoomManagement/AddMeetingRoom';
                            }else{
                                postUrl = apiPrefix + 'MeetingRoomManagement/UpdateMeetingRoom';
                            }
                            break;

                        case 'category':
                            item.itemCode = Number(item.itemCode);
                            item.categoryId = Number(item.categoryId);

                            if ($scope.isNewItem) {
                                item.category = null;
                                postUrl = apiPrefix + 'DataItem/AddDataItem';
                            } else {
                                postUrl = apiPrefix + 'DataItem/UpdateDataItem';
                            }
                            break;

                        default:
                            // default do nothing
                    }

                    // console.log(item);
                    // console.log($scope.isNewItem);

                    $http({
                        method: 'POST',
                        url: postUrl,
                        data: item
                    }).success(function(data, status, headers, config) {
                        fedPris.closeAllPop();

                        // get return data and update it to new item object
                        if ($scope.isNewItem) {
                            switch (flag) {
                                case 'mtRoom':
                                    item.meetingRoomId = data.id;
                                    break;

                                case 'category':
                                    item.itemCode = data.itemCode;
                                    break;

                                default:
                                    // default do nothing
                            }

                            $scope.items.push(item);
                            $scope.newItem = null;
                        }

                        $scope.popUpStatus = false;
                        $scope.maskStatus = false;
                    }).error(function(data, status, headers, config) {
                        fedPris.closeAllPop();
                        alert('Error, please try again later.')
                    });
                }
            }


            /**
             * remove item
             * @param  {item} item
             * @param  {flag} flag to get which template
             */
            $scope.removeItem = function(item, flag) {
                var postUrl,
                    deleteId;

                fedPris.ngShowPop('#pop_dialog');

                $scope.removeNow = function() {
                    switch (flag) {
                        case 'mtRoom':
                            deleteId = item.meetingRoomId;
                            postUrl = apiPrefix + 'MeetingRoomManagement/MeetingRoomDelete?meetingroomid=' + deleteId;
                            break;

                        case 'costCenter':
                            deleteId = item.costCenter;
                            postUrl = apiPrefix + 'SetCCManagement/DeCostCenter?costCenter=' + deleteId;
                            break;

                        case 'team':
                            deleteId = item.teamId;
                            postUrl = apiPrefix + 'SetTeamManagement/DeTeam?teamid=' + deleteId;
                            break;

                        case 'category':
                            deleteId = item.itemCode;
                            postUrl = apiPrefix + 'DataItem/DeDataItem?itemCode=' + deleteId;
                            break;

                        default:
                            // default do nothing
                    }

                    fedPris.ngShowLoading();

                    $http({
                        method: 'POST',
                        url: postUrl
                    }).success(function(data, status, headers, config) {
                        fedPris.closeAllPop();
                        $scope.items.splice(($.inArray(item, $scope.items)), 1);
                    }).error(function(data, status, headers, config) {
                        fedPris.closeAllPop();
                        alert('Error, please try again later.')
                    });
                }
            }
            /**
             * edit item
             * @param  {item} item
             * @param  {flag} flag to get which template
             */
            $scope.editItem = function(item, flag) {
                fedPris.ngShowPop('#pop_win_edit');
                $scope.isNewItem = false;
                $scope.popUpStatus = true;
                $scope.maskStatus = true;
                $scope.newItem = item;
            }


            /**
             * pagination
             */
            $scope.currentPage = 0;
            $scope.pageSize = 10;
            // get number of all pages
            $scope.numberOfPages = function() {
                return Math.ceil($scope.items.length / $scope.pageSize);
            }
            // click prev
            $scope.prevPage = function() {
                if ($scope.currentPage > 0) {
                    $scope.currentPage--;
                }
            }
            // click next
            $scope.nextPage = function() {
                if ($scope.currentPage < $scope.numberOfPages() - 1) {
                    $scope.currentPage++;
                }
            }


            /**
             * search item for 'Staff List in PRIS'
             * @param  {object or string} searchObj
             */
            $scope.itemSearch = function(searchObj) {
                var newSearchObj = searchObj;
                fedPris.ngShowLoading();

                $http.get(apiPrefix + dataPrefix, {
                    params: newSearchObj
                }).success(function(data, status, headers, config) {
                    fedPris.closeAllPop();
                    $scope.items = data;
                    $scope.numLimit = 10;
                    // go to current page
                    $scope.currentPage = $scope.currentPage;
                });
            }
            /**
             * search item for 'add new staff' and 'change staff status'
             * @param  {object or string} searchObj
             */
            $scope.multiSearch = function(searchObj) {
                if (searchObj !== undefined) {
                    fedPris.ngShowLoading();

                    var searchTextSplit = searchObj.split('\n'),
                        dataPrefix = $('#angularWrap').attr('data-prefix'),
                        i,
                        len = searchTextSplit.length,
                        params,
                        aray = [],
                        newUrl;

                    for (i = 0; i < len; i++) {
                        // replace whitespace 
                        aray.push(searchTextSplit[i].replace(/[a-zA-Z]|(^\s*)|(\s*$)/g, ''));
                    }

                    params = aray.join(',');
                    newUrl = apiPrefix + dataPrefix;

                    $http({
                        method: 'POST',
                        url: newUrl,
                        data: aray
                    }).success(function(data, status, headers, config) {
                        fedPris.closeAllPop();
                        $scope.items = data;
                        $scope.numLimit = 10;
                        // go to current page
                        $scope.currentPage = $scope.currentPage;
                    }).error(function(data, status, headers, config) {
                        fedPris.closeAllPop();
                        alert('Error, please try again later.')
                    });
                }
            }


            /**
             * check function for checkbox
             */
            $scope.checkAll = function() {
                if ($scope.selectedAll) {
                    $scope.selectedAll = false;
                } else {
                    $scope.selectedAll = true;
                }
                angular.forEach($scope.items, function(item) {
                    item.selected = $scope.selectedAll;
                });
            };


            /**
             * add new staff to mis
             * change staff status
             * @param  {string} flag - flag is using to detect which action to use
             */
            $scope.staffSbmt = function(flag) {
                var postUrl,
                    selection = [],
                    i,
                    len = $scope.items.length;

                if (flag === 'mis') {
                    postUrl = apiPrefix + 'SystemMenuWebAPIJSon/AddStaff';
                } else {
                    postUrl = apiPrefix + 'SystemMenuWebAPIJSon/AddStaffActivityStatus';
                }

                for (i = 0; i < len; i++) {
                    var selectedObj = {};

                    if ($scope.items[i].selected) {

                        if (flag === 'normal') {
                            selectedObj.lanId = $scope.items[i].lanId;
                            selectedObj.staffStatus = true;
                        } else if (flag === 'resigned') {
                            selectedObj.lanId = $scope.items[i].lanId;
                            selectedObj.staffStatus = false;
                        } else if (flag === 'mis') {
                            selectedObj = $scope.items[i];
                        }

                        selection.push(selectedObj);
                    }
                }

                if (selection.length > 0) {
                    fedPris.ngShowLoading();

                    $http({
                        method: 'POST',
                        url: postUrl,
                        data: selection
                    }).success(function(data, status, headers, config) {
                        fedPris.closeAllPop();
                    }).error(function(data, status, headers, config) {
                        fedPris.closeAllPop();
                        alert('Error, please try again later.')
                    });
                }
            }


            /**
             * watch item changes and submit changes
             */
            // var itemChanges = [];
            // $scope.setStatus = function(item) {
            //     itemChanges.push(item);
            // }
            // $scope.sbmtChange = function() {
            //     var postUrl = apiPrefix + 'MeetingRoomManagement/MeetingRoomBulkUpdate',
            //         postData = $.unique(itemChanges);

            //     if (itemChanges.length > 0) {
            //         fedPris.ngShowLoading();

            //         $http({
            //             method: 'POST',
            //             url: postUrl,
            //             data: postData
            //         }).success(function(data, status, headers, config) {
            //             fedPris.closeAllPop();
            //             itemChanges = [];
            //         }).error(function(data, status, headers, config) {
            //             fedPris.closeAllPop();
            //             alert('Error, please try again later.')
            //         });
            //     }
            // }
        }
    ]);
});
