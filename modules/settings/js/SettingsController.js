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
            $state.go('index');
            
          },function(error) {

          });
    };
  }])