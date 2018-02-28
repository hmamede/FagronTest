function layout(appModule) {

    /* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
    appModule.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            cssFilesInsertBefore: 'ng_load_plugins_before' // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        });
    }]);

    //AngularJS v1.3.x workaround for old style controller declarition in HTML
    appModule.config(['$controllerProvider', function ($controllerProvider) {
        // this option might be handy for migrating old apps, but please don't use it
        // in new ones!
        $controllerProvider.allowGlobals();
    }]);

    /********************************************
     END: BREAKING CHANGE in AngularJS v1.3.x:
    *********************************************/

    /* Setup global settings */
    appModule.factory('settings', ['$rootScope', function ($rootScope) {

        // supported languages
        var settings = {
            layout: {
                pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
            },
            layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
            layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
        };

        $rootScope.settings = settings;

        return settings;
    }]);

    /* Setup App Main Controller */
    appModule.controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        var vm = this;
        $rootScope.cgBusyPromises = [];
        $scope.$on('$viewContentLoaded', function () {
            Metronic.initComponents(); // init core components
            //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
        });

        //Configura��o para o loading...
        vm.delay = 0;
        vm.minDuration = 0;
        vm.message = 'Aguarde...';
        vm.backdrop = true;
        vm.loading = null;
        vm.resultado = null;
    }]);

    /* Setup Layout Part - Header */
    appModule.controller('HeaderController', ['$scope', '$filter', function ($scope, $filter) {
        var vm = this;
        $scope.$on('$includeContentLoaded', function () {
            Layout.initHeader(); // init header
        });
    }]);

    /* Setup Layout Part - Sidebar */
    appModule.controller('PageHeadController', ['$scope', '$filter', function ($scope, $filter) {
        $scope.$on('$includeContentLoaded', function () {
            Demo.init(); // init theme panel
        });
    }]);

    /* Setup Layout Part - Footer */
    appModule.controller('FooterController', ['$scope', function ($scope) {
        $scope.$on('$includeContentLoaded', function () {
            Layout.initFooter(); // init footer
        });
    }]);


    /* Init global settings and run the app */
    appModule.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
        $rootScope.$state = $state; // state to be accessed from view
    }]);

};


var configuration = {
    config: layout
};

export default configuration;