angular.module('phyman',['permission','ui.router','ngAnimate','ngMaterial',
    'phyman.user','phyman.noti','phyman.settings','phyman.message'])
    .run(['$rootScope','AuthService','PermissionStore',
      function($rootScope,AuthService,PermissionStore) { 
        $rootScope.API_HOST = 'http://localhost:8081/api';
        $rootScope.isLoggedIn = AuthService.checkLoggedIn();
        if(AuthService.checkLoggedIn()) {
            $rootScope.user = AuthService.getUser();
        }

        // Define admin permission
        PermissionStore.definePermission('admin',function(stateParams) {
            if(AuthService.checkLoggedIn()) {
                var user = AuthService.getUser();
                return user.permission === 'admin' ? true : false;
            }
            return false;
        });
        // Define user permission
        PermissionStore.definePermission('user',function(stateParams) {
            if(AuthService.checkLoggedIn()) {
                var user = AuthService.getUser();
                return user.permission === 'user' ? true : false;
            }
            return false;
        });
        // Define anonymous permission
        PermissionStore.definePermission('anonymous',function(stateParams) {
            return !AuthService.checkLoggedIn();
        });

        // Add events listener
        $rootScope.$on('$stateChangeStart',
          function(event,toState,toParams,fromState,fromParams,options) {
            $rootScope.showLoadProgress = true;
        });
        $rootScope.$on('$stateChangeSuccess',
          function(event,toState,toParams,fromState,fromParams,options) {
            // Handle $stateChangeSuccess events except those emitted by angular-permission.
            if(toState) {
                $rootScope.showLoadProgress = false;
            }
        });
    }])
    .config(['$mdThemingProvider',function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
          .backgroundPalette('grey',{'default': '100'});
    }])
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
        // Do not change this code segment to $urlRouterProvider.otherwise('/somestate')
        // as a known issue of angular-permission.
        $urlRouterProvider.otherwise( function($injector) {
            var $state = $injector.get("$state");
            $state.go('index');
        });
        $stateProvider.state('index',{
            url: '/',
            template: '<p>Main content here.</p>'
        })
        .state('error',{
            url: '/error',
            template: '<p>Something goes wrong.</p>'
        });

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
    .controller('toolbarCtrl',['$scope','$state','$rootScope','$mdSidenav','AuthDialog','AuthService',
        function($scope,$state,$rootScope,$mdSidenav,AuthDialog,AuthService) {
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
            $state.go('index',null,{reload:true});
        };
    }]);