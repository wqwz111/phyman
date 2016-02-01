angular.module('phyman.user', ['ngMessages', 'angular-jwt', 'ui.router'])
    .controller('RegisterCtrl', ['$scope', '$rootScope', 'AuthService', 'AuthDialog',
        function($scope, $rootScope, AuthService, AuthDialog){
        $scope.cancel = function() {
            AuthDialog.cancel();
        };
    }])
    .controller('LoginCtrl', ['$scope', '$rootScope', 'AuthService', 'AuthDialog',
        function($scope, $rootScope, AuthService, AuthDialog){
        $scope.cancel = function() {
            AuthDialog.cancel();
        };
    }])
    .controller('ResetPasswordCtrl', ['$scope', '$rootScope', 'AuthService',
        function($scope, $rootScope, AuthService){
        
    }])
    .controller('ForgetPasswordCtrl', ['$scope', '$rootScope', 'AuthService',
        function($scope, $rootScope, AuthService){
        
    }]);
