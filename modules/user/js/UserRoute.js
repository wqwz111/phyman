angular.module('phyman.user')
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('forget_password',{
                url: '/forget_password',
                templateUrl: 'views/forget_password.html',
                controller: 'ForgetPasswordCtrl',
                data: {
                    permissions: {
                        except: ['anonymous'],
                        redirectTo: 'error'
                    }
                }
            })
            .state('reset_password',{
                url: '/reset_password',
                templateUrl: 'views/reset_password.html',
                controller: 'ResetPasswordCtrl',
                data: {
                    permissions: {
                        except: ['anonymous'],
                        redirectTo: 'error'
                    }
                }
            });
            
    }]);