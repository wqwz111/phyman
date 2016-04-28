angular.module('phyman.vote')
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('vote',{
        url: '/vote',
        template: '<div ui-view></div>',
        abstract: true,
        data: {
            permissions: {
                except: ['anonymous'],
                redirectTo: 'error'
            }
        }
    })
       
    .state('vote.list',{
        url: '/list',
        templateUrl:'views/vote_list.html',
        controller: 'VoteCtrl'
    
    })
    .state('vote.detail',{
        url: '/detail/{id}',
        templateUrl: 'views/vote_view.html',
        controller: 'VoteViewCtrl'
     })
    .state('vote.result',{
    	url:'/result/{id}',
    	templateUrl:'views/vote_result.html',
    	controller:'VoteResultCtrl'
    })
    /*.state('vote.edit',{
        url: '/edit',
        templateUrl: 'views/vote_edit.html',
        controller: 'VoteEditorCtrl'
    })*/
    .state('vote.new',{
        url: '/new',
        templateUrl: 'views/vote_edit.html',
        'controller': 'VoteEditorCtrl',
         data: {
            permissions: {
                except: ['anonymous','user'],
                redirectTo: 'error'
            }
        }
    })
 }]);
