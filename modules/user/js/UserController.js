angular.module('phyman.user',['ngMessages','angular-jwt','ui.router','ngMaterial'])
    .controller('RegisterCtrl',['$scope','$rootScope','AuthService','AuthDialog',
        function($scope,$rootScope,AuthService,AuthDialog){
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
            AuthService.register($scope.user)
              .then(function(response) {
                $scope.isRegistering = true;
                AuthDialog.hide();
            },function(error) {
                $scope.isRegistering = false;
                //TODO: handle error
            });
        };
    }])
    .controller('LoginCtrl',['$scope','$rootScope','AuthService','AuthDialog',
        function($scope,$rootScope,AuthService,AuthDialog){
        $scope.isLoggingIn = false;
        $scope.cancel = function() {
            AuthDialog.cancel();
        };
        $scope.onLoginClick = function() {
            $scope.isLoggingIn = true;
            AuthService.login($scope.user)
              .then(function(response) {
                $scope.isLoggingIn = true;
                AuthDialog.hide();
            },function(error) {
                $scope.isLoggingIn = false;
                //TODO: handle error
            });
        };
    }])
    .controller('ResetPasswordCtrl',['$scope','$rootScope','AuthService',
        function($scope,$rootScope,AuthService){
        
    }])
    .controller('ForgetPasswordCtrl',['$scope','$rootScope','AuthService',
        function($scope,$rootScope,AuthService){
    
    }]);
