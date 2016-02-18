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
    .controller('navCtrl', ['$state', '$scope', '$mdSidenav',
        function($state, $scope, $mdSidenav) {
        $scope.menuItems = [{
            title: 'Notifications',
            state: 'notifications',
            img: '/assets/images/ic_new_releases_48px.svg'
        },{
            title: 'Votes',
            state: 'votes',
            img: '/assets/images/ic_check_48px.svg'
        },{
            title: 'Comments',
            state: 'comments',
            img: '/assets/images/ic_chat_48px.svg'
        },{
            title: 'Marked',
            state: 'marked',
            img: '/assets/images/ic_bookmark_48px.svg'
        },{
            title: 'Deleted',
            state: 'deleted',
            img: '/assets/images/ic_close_48px.svg'
        },{
            title: 'Settings',
            state: 'settings',
            img: '/assets/images/ic_settings_48px.svg'
        }];

        $scope.clickMenuItem = function(state) {
            $state.go(state);
        };
        $scope.toggleList = function() {
            $mdSidenav('left').toggle();
        };
    }])
    .controller('toolbarCtrl', ['$state', '$scope', '$mdSidenav', 'AuthDialog',
        function($state, $scope, $mdSidenav, AuthDialog) {
        $scope.toggleList = function() {
            $mdSidenav('left').toggle();
        };
        $scope.showLoginDlg = function() {
            AuthDialog.showLoginDialog();
        };
        $scope.showRegisterDlg = function() {
            AuthDialog.showRegisterDialog();
        };
    }]);