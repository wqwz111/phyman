angular.module('phyman.user')
    .factory('AuthDialog', ['$mdDialog', function($mdDialog){
        return {
            cancel: function() {
                $mdDialog.hide();
            },
            showLoginDialog: function() {
                $mdDialog.hide();
                $mdDialog.show({
                    controller: 'LoginCtrl',
                    templateUrl: 'modules/user/views/login.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: false
                });
            },
            showRegisterDialog: function() {
                $mdDialog.hide();
                $mdDialog.show({
                    controller: 'RegisterCtrl',
                    templateUrl: 'modules/user/views/register.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: false
                });
            }
        };
    }])