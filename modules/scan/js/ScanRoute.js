angular.module('phyman.scan')
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('scan',{
        url: '/scan',
        template: '<div ui-view></div>',
        abstract: true,
        data: {
            permissions: {
                except: ['anonymous'],
                redirectTo: 'error'
            }
        }
        
    })
       
    .state('scan.update',{
        url: '/update',
        templateUrl:'views/scan_update.html',
        controller: 'updateCtrl'
    
    })
    .state('scan.detail',{
        url: '/scan/detail',
        templateUrl: 'views/scan_detail.html',
        controller: 'ScanCtrl'
     })
    
 }]);
