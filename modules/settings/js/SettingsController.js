angular.module('phyman.settings',['ngMaterial'])
  .controller('SettingsCtrl',['$rootScope','$scope','$mdToast','$state','AuthService',
    function($rootScope,$scope,$mdToast,$state,AuthService) {
    $scope.onResetPasswdClick = function () {
        AuthService.resetPassword($scope.password)
          .then(function(response) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('密码修改成功,请重新登录')
                  .hideDelay(2000)
            );
            AuthService.logout();
            $rootScope.isLoggedIn = false;
            $state.go('index',null,{reload:true});
            
          },function(error) {

          });

    };
    $scope.onUpdateEmailClick = function () {
      AuthService.resetEmail($scope.email)
          .then(function(response) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('邮箱修改成功')
                  .hideDelay(2000)
            );
            
            $state.go('index',null,{reload:true});
            
          },function(error) {

          });

    };

  }])