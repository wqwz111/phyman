angular.module('phyman.user', ['ngMessages', 'angular-jwt', 'ui.router', 'ngGrid'])
    .controller('RegisterCtrl', ['$scope', '$rootScope', 'AuthService', 'AuthDialog',
        function($scope, $rootScope, AuthService, AuthDialog){
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
                $scope.isRegistering = false;
                AuthDialog.hide();
            }, function(error) {
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
                if(response.data.log==0){
                //alert("Login成功");
                $state.go("NotiList",null,{
                    reload:true
                });
                //alert("NotiList成功");
                /* var promise1 =AuthService.getlist();
                 promise.then(function(response) {
                     alert("NotiList成功");
                     alert($scope.user.list);
                     $state.go("NotiList");
                 },function(response){
                     alert("NotiList fail");
                     $state.go("login");
                 });*/
              } else
                $state.go("login",null,{
                    reload:true
                });
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
    
    }])
    .controller('dataCtrl',['$scope', '$rootScope','AuthService',
        function($scope,$rootScope,AuthService){
            $scope.user=AuthService.getUser().data;
            
    }])
    .controller('getdataCtrl',['$scope', '$rootScope', 'AuthService',
        function($scope,$rootScope,AuthService){
        $scope.jsonData=AuthService.getjson;
        
    }]);
