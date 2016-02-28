angular.module('phyman.noti')
.config(['$stateProvider','$urlRouterProvider',
    function($stateProvider,$urlRouterProvider) {
    $stateProvider
    .state('noti',{
        url: '/noti',
        template: '<div ui-view></div>',
        abstract: true,
        resolve: {
            noti: ['NotiService',function(NotiService) {
               return NotiService.getList();
            }]
        },
        controller: 'NotiCtrl'
    })
    .state('noti.list',{
        url: '/list',
        templateUrl:'modules/noti/views/list.html'
    })
    .state('noti.detail',{
        url: '/detail',
        templateUrl: '/modules/noti/views/view.html',
        controller: 'NotiViewCtrl'
     })
    .state('noti.edit',{
        url: '/edit',
        templateUrl: '/modules/noti/views/edit.html',
        controller: 'NotiEditorCtrl'
    })
    .state('noti.new',{
        url: '/new',
        templateUrl: '/modules/noti/views/edit.html',
        'controller': 'NotiEditorCtrl'
    })
 }]);