angular.module('phyman', ['phyman.user','ui.router', 'ngAnimate', 'ngMaterial'])
    .run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('index', {
            url: '/',
            template: '<p>Hello world</p>'
        })

    }])
    .controller('navCtrl', ['$state', '$scope', '$mdSidenav', 'AuthDialog',
        function($state, $scope, $mdSidenav, AuthDialog) {
        $scope.menuItems = [{
            title: 'Notifications',
            state: 'notifications'
        },{
            title: 'Votes',
            state: 'votes'
        },{
            title: 'Login',
            state: 'login'
        }];

        $scope.clickMenuItem = function(state) {
            $state.go(state);
        };
        $scope.toggleList = function() {
            $mdSidenav('left').toggle();
        };
        $scope.showLoginDialog = function() {
            AuthDialog.showLoginDialog();
        };
        $scope.showRegisterDialog = function() {
            AuthDialog.showRegisterDialog();
        };
    }])
    .controller('toolbarCtrl', ['$state', '$scope', '$mdSidenav',
        function($state, $scope, $mdSidenav) {
        $scope.toggleList = function() {
            $mdSidenav('left').toggle();
        };
    }]);