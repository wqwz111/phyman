angular.module('phyman.user')
    .factory('AuthDialog',['$mdDialog',function($mdDialog){
        return {
            cancel: function() {
                $mdDialog.cancel();
            },
            hide: function() {
                $mdDialog.hide();
            },
            showLoginDialog: function(ev) {
                $mdDialog.show({
                    controller: 'LoginCtrl',
                    templateUrl: 'views/login.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false
                });
            },
            showRegisterDialog: function(ev) {
                $mdDialog.show({
                    controller: 'RegisterCtrl',
                    templateUrl: 'views/register.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false
                });
            }
        };
    }]);