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
        templateUrl:'./Background/Home/phyman-1/modules/noti/views/noti_list.html'
    })
    .state('noti.detail',{
        url: '/detail/{id}',
        templateUrl: './Background/Home/phyman-1/modules/noti/views/noti_view.html',
        controller: 'NotiViewCtrl'
     })
    .state('noti.edit',{
        url: '/edit',
        templateUrl: './Background/Home/phyman-1/modules/noti/views/noti_edit.html',
        controller: 'NotiEditorCtrl'
    })
    .state('noti.new',{
        url: '/new',
        templateUrl: './Background/Home/phyman-1/modules/noti/views/noti_edit.html',
        'controller': 'NotiEditorCtrl'
    })
 }]);
