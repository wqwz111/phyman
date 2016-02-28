angular.module('phyman',['phyman.user','phyman.noti','ui.router','ngAnimate','ngMaterial'])
    .run(['$rootScope','AuthService',function($rootScope,AuthService) {
        $rootScope.API_HOST = 'http://localhost:8081/api';
        $rootScope.isLoggedIn = AuthService.checkLoggedIn();
        $rootScope.$on('$stateChangeStart',
          function(event,toState,toParams,fromState,fromParams,options) {
            $rootScope.showLoadProgress = true;
        });
        $rootScope.$on('$stateChangeSuccess',
          function(event,toState,toParams,fromState,fromParams,options) {
            $rootScope.showLoadProgress = false;
        });
    }])
    .config(['$logProvider','$mdThemingProvider',function($logProvider,$mdThemingProvider) {
        //Set the flag to 'false' in production environment.
        $logProvider.debugEnabled(true);

        $mdThemingProvider.theme('default')
          .backgroundPalette('grey',{'default': '100'});
    }])
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('index',{
            url: '/',
            template: '<p>Main content here.</p>'
        })

    }])
    .controller('navCtrl',['$state','$scope','$rootScope','$mdSidenav',
        function($state,$scope,$rootScope,$mdSidenav) {
        $scope.menuItems = [{
            title: '通知',
            state: 'noti.list',
            img: '/assets/images/ic_new_releases_48px.svg'
        },{
            title: '投票',
            state: 'votes',
            img: '/assets/images/ic_check_48px.svg'
        },{
            title: '提问',
            state: 'comments',
            img: '/assets/images/ic_chat_48px.svg'
        },{
            title: '已标记',
            state: 'marked',
            img: '/assets/images/ic_bookmark_48px.svg'
        },{
            title: '已删除',
            state: 'deleted',
            img: '/assets/images/ic_close_48px.svg'
        },{
            title: '设置',
            state: 'settings',
            img: '/assets/images/ic_settings_48px.svg'
        }];

        $scope.clickMenuItem = function(state) {
            $state.go(state);
            $mdSidenav('left').close();
        };
        $scope.toggleList = function() {
            $mdSidenav('left').toggle();
        };
    }])
    .controller('toolbarCtrl',['$scope','$rootScope','$mdSidenav','AuthDialog','AuthService',
        function($scope,$rootScope,$mdSidenav,AuthDialog,AuthService) {
        $scope.toggleList = function() {
            $mdSidenav('left').toggle();
        };
        $scope.showLoginDlg = function(ev) {
            AuthDialog.showLoginDialog(ev);
        };
        $scope.showRegisterDlg = function(ev) {
            AuthDialog.showRegisterDialog(ev);
        };
        $scope.logout = function() {
            AuthService.logout();
            $rootScope.isLoggedIn = false;
        };
    }]);