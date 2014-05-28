require.config({
    baseUrl: "../js/scripts",
    paths: {
        // libraries path
        'angular': './angular/angular',
        'angular-route': './angular/angular.route',
        // 'ngGrid': './angular/ng.grid',
        'angularAMD': './requirejs/angularAMD',
        // 'ngload': './requirejs/ngload',
        // controller path
        'ctrlTable': './appCommon/ctrlTable.js?stamp=' + prisAdmGCfg.stamp,
        'ctrlStaffSelect': './appCommon/ctrlStaffSelect.js?stamp=' + prisAdmGCfg.stamp,
        // directive path
        'direValidator': './appCommon/direValidator',
        'direToggleClass': './appCommon/direToggleClass',
        'direDatepicker': './appCommon/direDatepicker',
        'direMonthpicker': './appCommon/direMonthpicker',
        'direPop': './appCommon/direPop',
        // filter path
        'filterPage': './appCommon/filterPage',
        'filterMulti': './appCommon/filterMulti',
        // plugin path
        'jQueryUI': './jQuery/plugins/jquery-ui/jquery.ui',
        'jQueryMonthpicker': './jQuery/plugins/jquery.mtz.monthpicker/jquery.mtz.monthpicker',
        'backendDev': './jQuery/backend/backendDev'
    },
    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular']
    },
    // kick start application
    deps: ['app']
});
