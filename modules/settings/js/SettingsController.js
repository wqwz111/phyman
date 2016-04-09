angular.module('phyman.settings',['ngMaterial'])
  .controller('SettingsCtrl',['$rootScope','$scope','$http','$mdToast','$state','AuthService',
    function($rootScope,$scope,$http,$mdToast,$state,AuthService) {
    $scope.onResetPasswdClick = function () {
      AuthService.resetPassword($scope.password)
        .then(function(response) {
          $mdToast.show(
            $mdToast.simple()
              .textContent('密码修改成功')
              .hideDelay(1500)
          );
          $state.go('settings');
        },function(error) {

        });
    };
    $scope.onUpdateEmailClick = function() {
      $http.post($rootScope.API_HOST + '/update_email',{
        email: $scope.email
      })
      .then(function(response) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Email修改成功')
            .hideDelay(1500)
        );
        $state.go('settings');
      },function(error) {});
    }
  }])