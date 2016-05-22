angular.module('phyman.admin')
.config(['$stateProvider','$urlRouterProvider',
    function($stateProvider,$urlRouterProvider) {
    $stateProvider
    .state('admin',{
        url: '/admin',
        template: '<div ui-view></div>',
        abstract: true,
        /* data: {
            permissions: {
                except: ['anonymous'],
                redirectTo: 'error'
            }
        },*/
        resolve: {
            noti: ['AdminService',function(AdminService) {
               return AdminService.getList();
            }]
        },
       
    })
    .state('admin.adduser',{
        url: '/adduser',
        templateUrl:'views/admin_adduser.html',
        controller: 'AddUserCtrl',
         data: {
            permissions: {
                except: ['anonymous','user'],
                redirectTo: 'permissionerro'
            }
        }
    })
//    .state('noti.detail',{
//        url: '/detail/{id}',
//        templateUrl: './Background/Home/phyman-1/modules/noti/views/noti_view.html',
//        controller: 'NotiViewCtrl'
//     })
//    .state('noti.edit',{
//        url: '/edit',
//        templateUrl: './Background/Home/phyman-1/modules/noti/views/noti_edit.html',
//        controller: 'NotiEditorCtrl'
//    })
//    .state('noti.new',{
//        url: '/new',
//        templateUrl: './Background/Home/phyman-1/modules/noti/views/noti_edit.html',
//        'controller': 'NotiEditorCtrl'
//    })
 }]);
