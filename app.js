angular.module('phyman',['permission','ui.router','ngAnimate','ngMaterial',
    'phyman.user','phyman.noti','phyman.settings','phyman.message'])
    .run(['$rootScope','$mdToast','AuthService','MsgService','PermissionStore',
      function($rootScope,$mdToast,AuthService,MsgService,PermissionStore) { 
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
        $rootScope.$on('loginSuccess',function(event,user) {
            $rootScope.user = user;
            $rootScope.isLoggedIn = true;
            MsgService.emit('login',{id:user.id,viewlevel:user.viewlevel});
        });
        $rootScope.$on('loginFail',function(event) {
            $rootScope.isLoggedIn = false;
        });
        $rootScope.$on('logoutSuccess',function(event) {
            MsgService.emit('disconnect');
        });
        $rootScope.$on('toastError',function(event,message) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent(message)
                  .hideDelay(1500)
            );
        });
    }])
    .factory('ApiInterceptor', ['$rootScope','$q', function($rootScope,$q){
        return {
            request: function(config) {
                $rootScope.showLoadProgress = true;
                return config;
            },
            requestError: function(err) {
                $rootScope.showLoadProgress = false;
                return $q.reject(err);
            },
            response: function(res) {
                $rootScope.showLoadProgress = false;
                return res;
            },
            responseError: function(err) {
                $rootScope.showLoadProgress = false;
                var msg;
                switch(err.status) {
                    case -1:
                        msg = "无法连接到服务器，请稍后重试";
                        break;
                    case 404:
                        msg = "没有相应资源";
                        break;
                    default:
                        msg = "系统出现了问题，请稍后重试";
                }
                $rootScope.$emit('toastError',msg);
                return $q.reject(err);
            }
        };
    }])
    .config(['$httpProvider',function($httpProvider) {
        $httpProvider.interceptors.push('ApiInterceptor');
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