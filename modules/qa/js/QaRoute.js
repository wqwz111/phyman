angular.module('phyman.qa')
.config(['$stateProvider','$urlRouterProvider',
    function($stateProvider,$urlRouterProvider) {
    $stateProvider
    .state('qa',{
        url: '/qa',
        template: '<div ui-view></div>',
        abstract: true,
        data: {
            permissions: {
                except: ['anonymous'],
                redirectTo: 'error'
            }
        }
        
    })
    .state('qa.list',{
        url: '/list',
        templateUrl:'views/qa_list.html',
        resolve: {
            qa: ['QaService',function(QaService) {
               return QaService.getList();
            }]
        },
        controller: 'QaCtrl'
    })

    .state('qa.newQ',{
        url: '/newQ',
        templateUrl: 'views/qa_question.html',
        controller: 'QuestionCtrl'
    })
    .state('qa.newA',{
        url: '/newA/{id}',
        templateUrl: 'views/qa_answer.html',
        controller: 'AnswerCtrl',
         data: {
            permissions: {
                except: ['anonymous','user'],
                redirectTo: 'error'
            }
        }
    })
 }]);
