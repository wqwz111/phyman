angular.module('phyman.user')
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('forget_password',{
                url: '/forget_password',
                templateUrl: 'views/forget_password.html',
            });
            
}]);