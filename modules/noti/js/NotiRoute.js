angular.module('phyman.noti')
.config(['$stateProvider','$urlRouterProvider',
    function($stateProvider,$urlRouterProvider) {
    $stateProvider
    .state('noti',{
        url: '/noti',
        template: '<div ui-view></div>',
        abstract: true,
        data: {
            permissions: {
                except: ['anonymous'],
                redirectTo: 'error'
            }
        }
    })
    .state('noti.list',{
        url: '/list',
        templateUrl:'modules/noti/views/list.html',
        resolve: {
            noti_list: ['NotiService',function(NotiService) {
               return NotiService.getList();
            }]
        },
        controller: 'NotiCtrl'
    })
    .state('noti.detail',{
        url: '/detail/:id',
        templateUrl: '/modules/noti/views/view.html',
        resolve: {
            noti: ['NotiService','$stateParams',function(NotiService,$stateParams) {
                return NotiService.getDetail($stateParams.id);
            }]
        },
        controller: 'NotiViewCtrl'
     })
    .state('noti.edit',{
        url: '/edit',
        templateUrl: '/modules/noti/views/edit.html',
        controller: 'NotiEditorCtrl',
        data: {
            permissions: {
                only: ['admin'],
                redirectTo: 'error'
            }
        }
    })
    .state('noti.new',{
        url: '/new',
        templateUrl: '/modules/noti/views/edit.html',
        'controller': 'NotiEditorCtrl',
        data: {
            permissions: {
                only: ['admin'],
                redirectTo: 'error'
            }
        }
    })
 }]);