define(['angularAMD', 'angular-route'], function(angularAMD) {

    var appPris = angular.module('appPris', ['ngRoute']);
    /**
     * views route
     * @param  {object} $routeProvider
     */
    appPris.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/', angularAMD.route({
                templateUrl: '../template/staff-list.html?stamp=' + prisAdmGCfg.stamp,
                controller: 'ctrlTable'
            })).
            when('/staff-list', angularAMD.route({
                templateUrl: '../template/staff-list.html?stamp=' + prisAdmGCfg.stamp,
                controller: 'ctrlTable'
            })).
            when('/changed-list', angularAMD.route({
                templateUrl: '../template/cc-changed-list.html?stamp=' + prisAdmGCfg.stamp,
                controller: 'ctrlTable'
            })).
            when('/manager-changed-list', angularAMD.route({
                templateUrl: '../template/manager-changed-list.html?stamp=' + prisAdmGCfg.stamp,
                controller: 'ctrlTable'
            })).
            when('/status-changed-list', angularAMD.route({
                templateUrl: '../template/status-changed-list.html?stamp=' + prisAdmGCfg.stamp,
                controller: 'ctrlTable'
            })).
            when('/import-staff', angularAMD.route({
                templateUrl: '../template/import-staff.html?stamp=' + prisAdmGCfg.stamp
            })).
            when('/add-new-staff', angularAMD.route({
                templateUrl: '../template/add-new-staff.html?stamp=' + prisAdmGCfg.stamp,
                controller: 'ctrlTable'
            })).
            when('/change-staff-status', angularAMD.route({
                templateUrl: '../template/change-staff-status.html?stamp=' + prisAdmGCfg.stamp,
                controller: 'ctrlTable'
            })).
            when('/cost-center', angularAMD.route({
                templateUrl: '../template/cost-center-manage.html?stamp=' + prisAdmGCfg.stamp,
                controller: 'ctrlTable'
            })).
            when('/team', angularAMD.route({
                templateUrl: '../template/team-manage.html?stamp=' + prisAdmGCfg.stamp,
                controller: 'ctrlTable'
            })).
            when('/category', angularAMD.route({
                templateUrl: '../template/category-item.html?stamp=' + prisAdmGCfg.stamp,
                controller: 'ctrlTable'
            })).
            when('/meeting-room', angularAMD.route({
                templateUrl: '../template/meeting-room-manage.html?stamp=' + prisAdmGCfg.stamp,
                controller: 'ctrlTable'
            })).
            when('/menu', angularAMD.route({
                templateUrl: '../template/menu-staff-slct.html?stamp=' + prisAdmGCfg.stamp,
                controller: 'ctrlStaffSelect'
            })).
            when('/menu/:nodeId', angularAMD.route({
                templateUrl: '../template/menu-staff-slct.html?stamp=' + prisAdmGCfg.stamp,
                controller: 'ctrlStaffSelect'
            })).
            when('/role', angularAMD.route({
                templateUrl: '../template/role-staff-slct.html?stamp=' + prisAdmGCfg.stamp,
                controller: 'ctrlStaffSelect'
            })).
            when('/role/:nodeId', angularAMD.route({
                templateUrl: '../template/role-staff-slct.html?stamp=' + prisAdmGCfg.stamp,
                controller: 'ctrlStaffSelect'
            }))
            .when('/activity', angularAMD.route({
                templateUrl: '../template/activity-staff-slct.html?stamp=' + prisAdmGCfg.stamp,
                controller: 'ctrlStaffSelect'
            }))
            .when('/activity/:nodeId', angularAMD.route({
                templateUrl: '../template/activity-staff-slct.html?stamp=' + prisAdmGCfg.stamp,
                controller: 'ctrlStaffSelect'
            }));
        }
    ]);

    // important: start app when DOM is ready
    angularAMD.bootstrap(appPris);

    return appPris;
});
