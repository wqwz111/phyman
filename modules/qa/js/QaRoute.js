angular.module('phyman.qa')
.config(['$stateProvider','$urlRouterProvider',
    function($stateProvider,$urlRouterProvider) {
    $stateProvider
    .state('qa',{
        url: '/qa',
        template: '<div ui-view></div>',
        abstract: true,
        resolve: {
            qa: ['QaService',function(QaService) {
               return QaService.getList();
            }]
        },
        controller: 'QaCtrl'
    })
    .state('qa.list',{
        url: '/list',
        templateUrl:'./Background/Home/phyman-1/modules/qa/views/qa_list.html'
    })
   /* .state('qa.detail',{
        url: '/detail/{id}',
        templateUrl: './Background/Home/phyman-1/modules/noti/views/noti_view.html',
        controller: 'NotiViewCtrl'
     })*/
    /*.state('qa.edit',{
        url: '/edit',
        templateUrl: './Background/Home/phyman-1/modules/noti/views/noti_edit.html',
        controller: 'NotiEditorCtrl'
    })*/
    .state('qa.newQ',{
        url: '/newQ',
        templateUrl: './Background/Home/phyman-1/modules/qa/views/qa_question.html',
        controller: 'QuestionCtrl'
    })
    .state('qa.newA',{
        url: '/newA/{id}',
        templateUrl: './Background/Home/phyman-1/modules/qa/views/qa_answer.html',
        controller: 'AnswerCtrl'
    })
 }]);
