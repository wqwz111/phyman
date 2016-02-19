angular.module('phyman.user', ['ngMessages', 'angular-jwt', 'ui.router'])
    .controller('RegisterCtrl', ['$scope', '$rootScope', 'AuthService', 'AuthDialog', '$log',
        function($scope, $rootScope, AuthService, AuthDialog, $log){
        $scope.showPassword = false;
        $scope.isRegistering = false;
        $scope.toggleShowPassword = function() {
            $scope.showPassword = !$scope.showPassword;
        };
        $scope.cancel = function() {
            AuthDialog.cancel();
        };
        $scope.onRegisterClick = function() {
            $scope.isRegistering = true;
            var promise = AuthService.register($scope.user);
            promise.then(function(response) {
                $log.log("Hello, register success.");
                $scope.isRegistering = false;
                AuthDialog.hide();
            }, function(error) {
                $log.log($scope.isRegistering);
                $scope.isRegistering = false;
            });
        };
    }])
    .controller('LoginCtrl', ['$scope', '$rootScope', 'AuthService', 'AuthDialog',
        function($scope, $rootScope, AuthService, AuthDialog){
        $scope.isLoggingIn = false;
        $scope.cancel = function() {
            AuthDialog.cancel();
        };
        $scope.onLoginClick = function() {
            $scope.isLoggingIn = true;
            var promise = AuthService.login($scope.user);
            promise.then(function(response) {
                $scope.isLoggingIn = false;
                AuthDialog.hide();
            }, function(response) {
                $scope.isLoggingIn = false;
            });
        };
    }])
    .controller('ResetPasswordCtrl', ['$scope', '$rootScope', 'AuthService',
        function($scope, $rootScope, AuthService){
        
    }])
    .controller('ForgetPasswordCtrl', ['$scope', '$rootScope', 'AuthService',
        function($scope, $rootScope, AuthService){
        
    }]);
